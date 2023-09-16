afterEach( () => {
	delete process.env.BROWSERSLIST;
} );

describe( 'webpack.dev.test.ts', () => {
	test( 'Browserslist config', () => {
		const config = require( '../../../config/webpack.dev' );
		const wpBrowsers = require( '@wordpress/browserslist-config' );
		expect( config.target ).toEqual( 'browserslist:' + wpBrowsers.join( ', ' ) + ', not and_uc 15.5, not op_mini all' );
		expect( config ).toMatchSnapshot( 'Default Browsers' );


		jest.resetModules();
		process.env.BROWSERSLIST = 'chrome 71';
		const config2 = require( '../../../config/webpack.dev' );
		expect( config2.target ).toEqual( 'browserslist:chrome 71' );
		expect( config ).toMatchSnapshot( 'Chrome 71' );
	} );
} );
