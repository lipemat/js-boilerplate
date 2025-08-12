import {readFileSync} from 'fs';
import path from 'path';

import babelPresetDefault, {type BabelConfig} from '../../../config/babel.config';


function translate( config: BabelConfig ) {
	const filename = path.join( __dirname, '../core/transform.test.ts' );
	const input = readFileSync( filename );
	delete config.cacheDirectory;
	jest.resetModules();

	delete require.cache[ require.resolve( '@babel/core' ) ];
	const output = require( '@babel/core' ).transform( input.toString(), {
		filename: Date.now().toString(),
		configFile: false,
		envName: 'production',
		presets: [ config ],
	} );
	return output?.code;
}

describe( 'babel.config.test.ts', () => {
	test( 'Browserslist config', () => {
		let config = require( '../../../config/babel.config' );
		const wpBrowsers = require( '@wordpress/browserslist-config' );
		const expectedBrowsers = [ ...wpBrowsers ];
		expect( config.presets[ 0 ][ 1 ].targets.browsers ).toEqual( expectedBrowsers );

		jest.resetModules();
		config = require( '../../../config/babel.config' );
		expect( config.presets[ 0 ][ 1 ].targets ).toEqual( {
			browsers: expectedBrowsers,
		} );


		jest.resetModules();
		process.env.BROWSERSLIST = 'chrome 68, firefox 60';
		config = require( '../../../config/babel.config' );
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

		babelPresetDefault.presets[ 0 ][ 1 ].targets.browsers = [ 'chrome 50' ];
		const chrome50 = translate( babelPresetDefault );
		expect( chrome50 ).toMatchSnapshot( 'Chrome 50' );
		expect( chrome50 ).not.toEqual( defaultBrowsers );

		babelPresetDefault.presets[ 0 ][ 1 ].targets.browsers = [ 'ie 11' ];
		const ie11 = translate( babelPresetDefault );
		expect( ie11 ).toMatchSnapshot( 'IE 11' );
		expect( ie11 ).not.toEqual( defaultBrowsers );
		expect( ie11 ).not.toEqual( chrome50 );

		babelPresetDefault.presets[ 0 ][ 1 ].targets.browsers = [ 'chrome 130' ];
		const chrome130 = translate( babelPresetDefault );
		expect( chrome130 ).toMatchSnapshot( 'Chrome 130' );
		expect( chrome130 ).not.toEqual( chrome50 );
	} );


	test( 'Included plugins', () => {
		const config = require( '../../../config/babel.config' );
		const babel = require( '@babel/core' );

		const result = babel.transform( '', {
			presets: config.presets,
			plugins: config.plugins,
			filename: Date.now().toString(),
			configFile: false,
			envName: 'production',
			code: false,
			ast: false,
		} );

		expect( result.options.parserOpts.plugins ).toMatchSnapshot();
		expect( result.options.parserOpts.plugins ).toContain( 'dynamicImport' );
	} );


	test( 'Build files', () => {
		const TS = require( '../../../config/babel.config.ts' );
		const JS = require( '../../../config/babel.config.js' );
		expect( TS ).toStrictEqual( JS );
	} );
} );
