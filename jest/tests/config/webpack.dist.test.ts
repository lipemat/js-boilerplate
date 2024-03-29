afterEach( () => {
	delete process.env.BROWSERSLIST;
} );

describe( 'webpack.dist.test.ts', () => {
	test( 'Browserslist config', () => {
		const config = require( '../../../config/webpack.dist' );
		const wpBrowsers = require( '@wordpress/browserslist-config' );
		expect( config.target ).toEqual( 'browserslist:' + wpBrowsers.join( ', ' ) + ', not op_mini all' );
		expect( config ).toMatchSnapshot( 'Default Browsers' );

		jest.resetModules();
		process.env.BROWSERSLIST = 'chrome 72, firefox 65';
		const config2 = require( '../../../config/webpack.dist' );
		expect( config2.target ).toEqual( 'browserslist:chrome 72, firefox 65' );
		expect( config ).toMatchSnapshot( 'Chrome 72, Firefox 65' );
	} );
} );
