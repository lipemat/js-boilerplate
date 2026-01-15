import {readFileSync} from 'fs';
import path, {resolve} from 'path';
import {jest} from '@jest/globals';

// @ts-ignore
import wpBrowsers from '@wordpress/browserslist-config';

import babelPresetDefault, {type BabelConfig} from '../../../config/babel.config.js';
import {importFresh} from '../../helpers/imports';
import type {BabelFileResult, TransformOptions} from '@babel/core';

type Result = BabelFileResult & {
	options: TransformOptions
}


async function translate( config: BabelConfig ) {
	return ( await runThroughBabel( config, 'production', resolve( './jest/tests/core/transform.test.ts' ) ) )?.code;
}

async function runThroughBabel( config: BabelConfig, mode: 'production' | 'development' = 'production', filename: string ): Promise<Result | null> {
	const input = readFileSync( filename );
	delete config.cacheDirectory;
	jest.resetModules();

	const {transform} = await import( '@babel/core' );
	return transform( input.toString(), {
		filename: path.basename( filename ),
		configFile: false,
		envName: mode,
		presets: [ config ],
	} ) as Result | null;
}


describe( 'babel.config.test.ts', () => {
	test( 'Browserslist config', async () => {
		let config = await importFresh<BabelConfig>( './config/babel.config.js' );

		const expectedBrowsers = [ ...wpBrowsers ];
		expect( config.presets?.[ 0 ][ 1 ].targets.browsers ).toEqual( expectedBrowsers );

		jest.resetModules();
		config = await importFresh( './config/babel.config.js' );
		expect( config.presets?.[ 0 ][ 1 ].targets ).toEqual( {
			browsers: expectedBrowsers,
		} );


		jest.resetModules();
		process.env.BROWSERSLIST = 'chrome 68, firefox 60';
		config = await importFresh( './config/babel.config.js' );
		delete process.env.BROWSERSLIST;
		expect( config.presets?.[ 0 ][ 1 ].targets ).toEqual( {
			browsers: [
				'chrome 68',
				'firefox 60',
			],
		} );
	} );


	test( 'Transforming works properly', async () => {
		const defaultBrowsers = await translate( babelPresetDefault );
		expect( defaultBrowsers ).toMatchSnapshot( 'Default browsers' );

		if ( ! babelPresetDefault.presets ) {
			fail( 'babelPresetDefault.presets is null' );
		}

		// @ts-ignore
		babelPresetDefault.presets[ 0 ][ 1 ].targets.browsers = [ 'chrome 50' ];
		const chrome50 = await translate( babelPresetDefault );
		expect( chrome50 ).toMatchSnapshot( 'Chrome 50' );
		expect( chrome50 ).not.toEqual( defaultBrowsers );

		// @ts-ignore
		babelPresetDefault.presets[ 0 ][ 1 ].targets.browsers = [ 'ie 11' ];
		const ie11 = await translate( babelPresetDefault );
		expect( ie11 ).toMatchSnapshot( 'IE 11' );
		expect( ie11 ).not.toEqual( defaultBrowsers );
		expect( ie11 ).not.toEqual( chrome50 );

		// @ts-ignore
		babelPresetDefault.presets[ 0 ][ 1 ].targets.browsers = [ 'chrome 130' ];
		const chrome130 = await translate( babelPresetDefault );
		expect( chrome130 ).toMatchSnapshot( 'Chrome 130' );
		expect( chrome130 ).not.toEqual( chrome50 );
	} );


	test( 'Included plugins', async () => {
		const rootDir = path.resolve( '../' ).replace( /\\/g, '\\\\' );
		const fileName = resolve( './jest/fixtures/react-component/share.tsx' );

		process.env.NODE_ENV = 'production';
		const distConfig = await importFresh<BabelConfig>( './config/babel.config.js' );
		const distResult = await runThroughBabel( distConfig, 'production', fileName ) as Result;

		expect( distResult.code?.replace( rootDir, '' ) ).toMatchSnapshot();
		expect( distResult.options.parserOpts?.plugins ).toMatchSnapshot();
		expect( distResult.options.parserOpts?.plugins ).toContain( 'dynamicImport' );

		process.env.NODE_ENV = 'development';
		const developConfig = await importFresh<BabelConfig>( './config/babel.config.js' );
		const devResult = await runThroughBabel( developConfig, 'development', fileName ) as Result;
		expect( devResult.code?.replace( rootDir, '' ) ).toMatchSnapshot();
		expect( devResult.options.parserOpts?.plugins ).toMatchSnapshot();
		//expect( devResult.options.parserOpts.plugins ).toContain( 'transformReactSource' );
		expect( distResult.options.parserOpts?.plugins ).toContain( 'dynamicImport' );

		expect( distResult.options.parserOpts?.plugins ).toStrictEqual( devResult.options.parserOpts?.plugins );
		expect( distResult.code ).not.toBe( devResult.code );
	} );


	test( 'Build files', async () => {
		const TS = await importFresh<BabelConfig>( './config/babel.config.ts' );
		const JS = await importFresh<BabelConfig>( './config/babel.config.js' );
		expect( TS ).toStrictEqual( JS );
	} );
} );
