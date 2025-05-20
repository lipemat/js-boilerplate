afterEach( () => {
	delete process.env.BROWSERSLIST;
	process.env.NODE_ENV = 'test';
} );

describe( 'webpack.dist.test.ts', () => {
	test( 'Browserslist config', () => {
		process.env.NODE_ENV = 'production';
		const config = require( '../../../config/webpack.dist' );
		const wpBrowsers = require( '@wordpress/browserslist-config' );
		expect( config.target ).toEqual( 'browserslist:' + wpBrowsers.join( ', ' ) );
		expect( config ).toMatchSnapshot( 'Default Browsers' );

		jest.resetModules();
		process.env.BROWSERSLIST = 'chrome 72, firefox 65';
		const config2 = require( '../../../config/webpack.dist' );
		expect( config2.target ).toEqual( 'browserslist:chrome 72, firefox 65' );
		expect( config ).toMatchSnapshot( 'Chrome 72, Firefox 65' );
	} );
} );
