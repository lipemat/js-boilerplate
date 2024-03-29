// @ts-ignore
const browserslist = require( 'browserslist' );

const {getDefaultBrowsersList, getBrowsersList} = require( '../../../helpers/config.js' );

afterEach( () => {
	delete process.env.BROWSERSLIST;
} );

describe( 'config', () => {
	test( 'getDefaultBrowsersList', () => {
		const expectedBrowsers = [ ...require( '@wordpress/browserslist-config' ) ];
		expectedBrowsers.push( 'not op_mini all' );

		expect( getDefaultBrowsersList() ).toEqual( expectedBrowsers );
		expect( getDefaultBrowsersList() ).toEqual( getBrowsersList() );

		process.env.BROWSERSLIST = 'chrome 71';
		expect( getDefaultBrowsersList() ).toEqual( false );
	} );

	test( 'getBrowsersList', () => {
		const expectedBrowsers = [ ...require( '@wordpress/browserslist-config' ) ];
		expectedBrowsers.push( 'not op_mini all' );

		// Check if the browserslist results change, which may explain other failures.
		expect( browserslist( getBrowsersList() ) ).toMatchSnapshot( 'browserslist' );
		expect( expectedBrowsers ).toMatchSnapshot( 'expectedBrowsers' );

		expect( getBrowsersList() ).toEqual( expectedBrowsers );
		expect( getBrowsersList() ).toEqual( getDefaultBrowsersList() );

		const wpDefaultBrowsers = browserslist( require( '@wordpress/browserslist-config' ), {
			env: 'production',
		} );
		expect( wpDefaultBrowsers.includes( 'and_uc 15.5' ) ).toBe( false );
		// @notice If this fails, we can probably remove the @todo from adjustBrowserslist and change toBe to `true`.
		expect( wpDefaultBrowsers.includes( 'op_mini all' ) ).toBe( false );
		expect( browserslist( getBrowsersList() ).includes( 'and_uc 15.5' ) ).toBe( false );
		expect( browserslist( getBrowsersList() ).includes( 'op_mini all' ) ).toBe( false );


		process.env.BROWSERSLIST = 'chrome 71';
		expect( getBrowsersList() ).toEqual( [ 'chrome 71' ] );
	} );
} );
