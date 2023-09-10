const browsersList = require( 'browserslist' );
const configHelper = require( '../../helpers/config' );

afterEach( () => {
	delete process.env.BROWSERSLIST;
} );

describe( 'config', () => {
	test( 'getDefaultBrowsersList', () => {
		const expectedBrowsers = [ ...require( '@wordpress/browserslist-config' ) ];
		expectedBrowsers.push( 'not and_uc 15.5' );

		expect( configHelper.getDefaultBrowsersList() ).toEqual( expectedBrowsers );
		expect( configHelper.getDefaultBrowsersList() ).toEqual( configHelper.getBrowsersList() );

		process.env.BROWSERSLIST = 'chrome 71';
		expect( configHelper.getDefaultBrowsersList() ).toEqual( false );
	} );

	test( 'getBrowsersList', () => {
		const expectedBrowsers = [ ...require( '@wordpress/browserslist-config' ) ];
		expectedBrowsers.push( 'not and_uc 15.5' );

		expect( configHelper.getBrowsersList() ).toEqual( expectedBrowsers );
		expect( configHelper.getBrowsersList() ).toEqual( configHelper.getDefaultBrowsersList() );


		// @notice If this fails, we can probably remove the override in favor of default wp.
		const wpDefaultBrowsers = browsersList( require( '@wordpress/browserslist-config' ), {
			env: 'production',
		} );
		expect( wpDefaultBrowsers.includes( 'and_uc 15.5' ) ).toBe( true );
		expect( browsersList( configHelper.getBrowsersList() ).includes( 'and_uc 15.5' ) ).toBe( false );

		process.env.BROWSERSLIST = 'chrome 71';
		expect( configHelper.getBrowsersList() ).toEqual( [ 'chrome 71' ] );
	} );
} );
