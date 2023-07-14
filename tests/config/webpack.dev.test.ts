afterAll( () => {
	delete process.env.BROWSERSLIST;
} );

describe( 'webpack.dev.test.ts', () => {
	test( 'Browserslist config', () => {
		const config = require( '../../config/webpack.dev' );
		const wpBrowsers = require( '@wordpress/browserslist-config' ).map( range => {
			return '> 1%' === range ? '> 2%' : range;
		} )
		expect( config.target ).toEqual( 'browserslist:' + wpBrowsers.join( ', ' ) );

		jest.resetModules();
		process.env.BROWSERSLIST = 'chrome 71';

		const config2 = require( '../../config/webpack.dev' );
		expect( config2.target ).toEqual( 'browserslist:chrome 71' );
	} );
} );
