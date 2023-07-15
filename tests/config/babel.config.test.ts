import * as fs from 'fs';

afterAll( () => {
	fs.unlinkSync( './.browserslistrc' );
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
	} );
} );
