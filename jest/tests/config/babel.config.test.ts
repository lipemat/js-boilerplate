import {readFileSync} from 'fs';
import path from 'path';

import babelPresetDefault, {type BabelConfig} from '../../../config/babel.config';


function translate( config: BabelConfig ) {
	return runThroughBabel( config, 'production', path.join( __dirname, '../core/transform.test.ts' ) )?.code;
}

function runThroughBabel( config: BabelConfig, mode: 'production' | 'development' = 'production', filename: string ) {
	const input = readFileSync( filename );
	delete config.cacheDirectory;
	jest.resetModules();

	delete require.cache[ require.resolve( '@babel/core' ) ];
	return require( '@babel/core' ).transform( input.toString(), {
		filename: path.basename( filename ),
		configFile: false,
		envName: mode,
		presets: [ config ],
	} );
}

describe( 'babel.config.test.ts', () => {
	test( 'Browserslist config', () => {
		let config = require( '../../../config/babel.config' ).default;
		const wpBrowsers = require( '@wordpress/browserslist-config' );
		const expectedBrowsers = [ ...wpBrowsers ];
		expect( config.presets[ 0 ][ 1 ].targets.browsers ).toEqual( expectedBrowsers );

		jest.resetModules();
		config = require( '../../../config/babel.config' ).default;
		expect( config.presets[ 0 ][ 1 ].targets ).toEqual( {
			browsers: expectedBrowsers,
		} );


		jest.resetModules();
		process.env.BROWSERSLIST = 'chrome 68, firefox 60';
		config = require( '../../../config/babel.config' ).default;
		delete process.env.BROWSERSLIST;
		expect( config.presets[ 0 ][ 1 ].targets ).toEqual( {
			browsers: [
				'chrome 68',
				'firefox 60',
			],
		} );
	} );


	test( 'Transforming works properly', () => {
		const defaultBrowsers = translate( babelPresetDefault );
		expect( defaultBrowsers ).toMatchSnapshot( 'Default browsers' );

		if ( ! babelPresetDefault.presets ) {
			fail( 'babelPresetDefault.presets is null' );
		}

		// @ts-ignore
		babelPresetDefault.presets[ 0 ][ 1 ].targets.browsers = [ 'chrome 50' ];
		const chrome50 = translate( babelPresetDefault );
		expect( chrome50 ).toMatchSnapshot( 'Chrome 50' );
		expect( chrome50 ).not.toEqual( defaultBrowsers );

		// @ts-ignore
		babelPresetDefault.presets[ 0 ][ 1 ].targets.browsers = [ 'ie 11' ];
		const ie11 = translate( babelPresetDefault );
		expect( ie11 ).toMatchSnapshot( 'IE 11' );
		expect( ie11 ).not.toEqual( defaultBrowsers );
		expect( ie11 ).not.toEqual( chrome50 );

		// @ts-ignore
		babelPresetDefault.presets[ 0 ][ 1 ].targets.browsers = [ 'chrome 130' ];
		const chrome130 = translate( babelPresetDefault );
		expect( chrome130 ).toMatchSnapshot( 'Chrome 130' );
		expect( chrome130 ).not.toEqual( chrome50 );
	} );


	test( 'Included plugins', () => {
		const rootDir = path.resolve( '../' ).replace( /\\/g, '\\\\' );
		const fileName = path.join( __dirname, '../../fixtures/react-component/share.tsx' );

		process.env.NODE_ENV = 'production';
		const distConfig = require( '../../../config/babel.config' ).default;
		const distResult = runThroughBabel( distConfig, 'production', fileName );

		expect( distResult.code.replace( rootDir, '' ) ).toMatchSnapshot();
		expect( distResult.options.parserOpts.plugins ).toMatchSnapshot();
		expect( distResult.options.parserOpts.plugins ).toContain( 'dynamicImport' );

		process.env.NODE_ENV = 'development';
		const developConfig = require( '../../../config/babel.config' ).default;
		const devResult = runThroughBabel( developConfig, 'development', fileName )
		expect( devResult.code.replace( rootDir, '' ) ).toMatchSnapshot();
		expect( devResult.options.parserOpts.plugins ).toMatchSnapshot();
		//expect( devResult.options.parserOpts.plugins ).toContain( 'transformReactSource' );
		expect( distResult.options.parserOpts.plugins ).toContain( 'dynamicImport' );

		expect( distResult.options.parserOpts.plugins ).toStrictEqual( devResult.options.parserOpts.plugins );
		expect( distResult.code ).not.toBe( devResult.code );
	} );


	test( 'Build files', () => {
		const TS = require( '../../../config/babel.config.ts' ).default;
		const JS = require( '../../../config/babel.config.js' ).default;
		expect( TS ).toStrictEqual( JS );
	} );
} );
