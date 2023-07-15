import * as fs from 'fs';
import {readFileSync} from 'fs';
import path from 'path';

import babelPresetDefault from '../../config/babel.config';


function translate( config ) {
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

afterEach( () => {
	delete process.env.BROWSERSLIST;
} );

describe( 'babel.config.test.ts', () => {
	test( 'Browserslist config', () => {
		let config = require( '../../config/babel.config' );
		const wpBrowsers = require( '@wordpress/browserslist-config' );
		expect( config.presets[ 0 ][ 1 ].targets.browsers ).toEqual( wpBrowsers );

		jest.resetModules();
		config = require( '../../config/babel.config' );
		expect( config.presets[ 0 ][ 1 ].targets ).toEqual( {
			browsers: wpBrowsers,
		} );


		jest.resetModules();
		fs.writeFileSync( './.browserslistrc', 'chrome 68' + '\n' + 'firefox 60' );
		config = require( '../../config/babel.config' );
		expect( config.presets[ 0 ][ 1 ].targets ).toEqual( {
			browsers: [
				'chrome 68',
				'firefox 60',
			],
		} );
		fs.unlinkSync( './.browserslistrc' );
	} );

	test( 'Transforming works properly', () => {
		const defaultBrowsers = translate( babelPresetDefault );
		expect( defaultBrowsers ).toMatchSnapshot( 'Default browsers' );

		babelPresetDefault.presets[ 0 ][ 1 ].targets.browsers = [ 'chrome 50' ];
		const chrome50 = translate( babelPresetDefault );
		expect( chrome50 ).toMatchSnapshot( 'Chrome 50' );
		expect( chrome50 ).not.toEqual( defaultBrowsers );

		babelPresetDefault.presets[ 0 ][ 1 ].targets.browsers = [ 'ie 11' ];
		const ie11 = translate( babelPresetDefault );
		expect( ie11 ).toMatchSnapshot( 'IE 11' );
		expect( ie11 ).not.toEqual( defaultBrowsers );
		expect( ie11 ).not.toEqual( chrome50 );
	} );
} );
