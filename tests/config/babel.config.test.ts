import * as fs from 'fs';

afterAll( () => {
	fs.unlinkSync( './.browserslistrc' );
} );

describe( 'babel.config.test.ts', () => {
	test( 'Browserslist config', () => {
		let config = require( '../../config/babel.config' );
		expect( config.presets[ 0 ][ 1 ] ).not.toHaveProperty( 'targets' );

		global.__TEST__ = false;
		jest.resetModules();
		config = require( '../../config/babel.config' );
		expect( config.presets[ 0 ][ 1 ].targets ).toEqual( {
			browsers: require( '@wordpress/browserslist-config' ).map( range => {
				return '> 1%' === range ? '> 2%' : range;
			} ),
		} );


		jest.resetModules();
		fs.writeFileSync( './.browserslistrc', 'chrome 71' );
		config = require( '../../config/babel.config' );
		expect( config.presets[ 0 ][ 1 ].targets ).toEqual( {
			browsers: [ 'chrome 71' ],
		} );

		global.__TEST__ = true;
	} );
} );
