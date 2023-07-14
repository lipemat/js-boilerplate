afterAll( () => {
	delete process.env.BROWSERSLIST;
} );

describe( 'webpack.dist.test.ts', () => {
	test( 'Browserslist config', () => {
		const config = require( '../../config/webpack.dist' );
		const wpBrowsers = require( '@wordpress/browserslist-config' );
		expect( config.target ).toEqual( 'browserslist:' + wpBrowsers.join( ', ' ) );

		jest.resetModules();
		process.env.BROWSERSLIST = 'chrome 72, firefox 65';
		const config2 = require( '../../config/webpack.dist' );
		expect( config2.target ).toEqual( 'browserslist:chrome 72, firefox 65' );
	} );
} );
