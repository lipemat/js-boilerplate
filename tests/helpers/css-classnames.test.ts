import {ALPHABET, getLocalIdent, getNextClass, resetCounters, SHORT_ALPHABET} from '../../helpers/css-classnames';

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
} );
