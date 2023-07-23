import {ALPHABET, getLocalIdent, getNextClass, resetCounters, SHORT_ALPHABET, usingShortCssClasses} from '../../helpers/css-classnames';

// Change this variable during tests.
let mockShortCssEnabled = false;

// Change the result of the getPackageConfig function.
jest.mock( '../../helpers/package-config.js', () => ( {
	...jest.requireActual( '../../helpers/package-config.js' ),
	getPackageConfig: () => ( {
		...jest.requireActual( '../../helpers/package-config.js' ),
		// Change this variable during the test.
		shortCssClasses: mockShortCssEnabled,
	} ),
} ) );

describe( 'Test CSS Classname Generation', () => {
	beforeEach( () => {
		resetCounters();
	} );

	it( 'getNextClass', () => {
		expect( getNextClass() ).toEqual( 'A' );
		expect( getNextClass() ).toEqual( 'B' );

		for ( let i = 0; i < SHORT_ALPHABET.length - 2; i++ ) {
			getNextClass();
		}

		expect( getNextClass() ).toEqual( 'Aa' );
		expect( getNextClass() ).toEqual( 'Ab' );

		const third = SHORT_ALPHABET.length * ALPHABET.length;
		for ( let i = 0; i < third - 2; i++ ) {
			getNextClass();
		}

		expect( getNextClass() ).toEqual( 'Aaa' );
		expect( getNextClass() ).toEqual( 'Aab' );
	} );

	it( 'getLocalIdent', () => {
		expect( getLocalIdent( {
			resourcePath: 'E:/SVN/js-boilerplate/tests/fake.pcss',
		}, '', 'a-class' ) ).toEqual( 'A' );
		expect( getLocalIdent( {
			resourcePath: 'E:/SVN/js-boilerplate/tests/other.pcss',
		}, '', 'a-class' ) ).toEqual( 'B' );
		expect( getLocalIdent( {
			resourcePath: 'E:/SVN/js-boilerplate/tests/other.pcss',
		}, '', 'b-class' ) ).toEqual( 'C' );
		expect( getLocalIdent( {
			resourcePath: 'E:/SVN/js-boilerplate/tests/fake.pcss',
		}, '', 'a-class' ) ).toEqual( 'A' );
		expect( getLocalIdent( {
			resourcePath: 'E:/SVN/js-boilerplate/tests/other.pcss',
		}, '', 'b-class' ) ).toEqual( 'C' );
	} );

	test( 'Alphabet Length', () => {
		expect( ALPHABET.length ).toEqual( 62 );
		expect( SHORT_ALPHABET.length ).toEqual( 26 );
	} );

	test( 'Are Short CSS Classes Enabled', () => {
		expect( usingShortCssClasses() ).toEqual( false );
		mockShortCssEnabled = true;
		expect( usingShortCssClasses() ).toEqual( true );
	} );
} );
