const browserslist = require( 'browserslist' );

const {getDefaultBrowsersList, getBrowsersList} = require( '../../../helpers/config' );

afterEach( () => {
	delete process.env.BROWSERSLIST;
} );

describe( 'config', () => {
	test( 'getDefaultBrowsersList', () => {
		const expectedBrowsers = [ ...require( '@wordpress/browserslist-config' ) ];

		expect( getDefaultBrowsersList() ).toEqual( expectedBrowsers );
		expect( getDefaultBrowsersList() ).toEqual( getBrowsersList() );

		process.env.BROWSERSLIST = 'chrome 71';
		expect( getDefaultBrowsersList() ).toEqual( false );
	} );

	test( 'getBrowsersList', () => {
		const expectedBrowsers = [ ...require( '@wordpress/browserslist-config' ) ];

		// Check if the browserslist results change, which may explain other failures.
		expect( browserslist( getBrowsersList() ) ).toMatchSnapshot( 'browserslist' );
		expect( expectedBrowsers ).toMatchSnapshot( 'expectedBrowsers' );

		expect( getBrowsersList() ).toEqual( expectedBrowsers );
		expect( getBrowsersList() ).toEqual( getDefaultBrowsersList() );

		const wpDefaultBrowsers = browserslist( require( '@wordpress/browserslist-config' ), {
			env: 'production',
		} );
		// @notice If this fails, we can probably add 'not and_uc 15.5' to adjustBrowserslist.
		expect( wpDefaultBrowsers.includes( 'and_uc 15.5' ) ).toBe( false );
		expect( wpDefaultBrowsers.includes( 'op_mini all' ) ).toBe( false );
		expect( browserslist( getBrowsersList() ).includes( 'and_uc 15.5' ) ).toBe( false );
		expect( browserslist( getBrowsersList() ).includes( 'op_mini all' ) ).toBe( false );


		process.env.BROWSERSLIST = 'chrome 71';
		expect( getBrowsersList() ).toEqual( [ 'chrome 71' ] );
	} );
} );
