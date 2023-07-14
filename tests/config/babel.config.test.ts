import * as fs from 'fs';

afterAll( () => {
	fs.unlinkSync( './.browserslistrc' );
} );

describe( 'babel.config.test.ts', () => {
	test( 'Browserslist config', () => {
		let config = require( '../../config/babel.config' );
		const wpBrowsers = require( '@wordpress/browserslist-config' ).map( range => {
			return '> 1%' === range ? '> 2%' : range;
		} )
		expect( config.presets[ 0 ][ 1 ].targets.browsers ).toEqual( wpBrowsers );

		global.__TEST__ = false;
		jest.resetModules();
		config = require( '../../config/babel.config' );
		expect( config.presets[ 0 ][ 1 ].targets ).toEqual( {
			browsers: require( '@wordpress/browserslist-config' ).map( range => {
				return '> 1%' === range ? '> 2%' : range;
			} ),
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

		global.__TEST__ = true;
	} );
} );
