import camelCase from '../../../helpers/camel-case';

describe( 'camelCase helper', () => {
	it( 'converts dashed strings to camelCase', () => {
		expect( camelCase( 'foo-bar' ) ).toBe( 'fooBar' );
	} );

	it( 'converts underscored strings to camelCase', () => {
		expect( camelCase( 'foo_bar' ) ).toBe( 'fooBar' );
	} );

	it( 'converts space-separated strings to camelCase', () => {
		expect( camelCase( 'foo bar' ) ).toBe( 'fooBar' );
	} );

	it( 'converts mixed-case strings to camelCase', () => {
		expect( camelCase( 'Foo-Bar' ) ).toBe( 'fooBar' );
	} );

	it( 'supports PascalCase conversion', () => {
		expect( camelCase( 'foo-bar', true ) ).toBe( 'FooBar' );
	} );

	it( 'handles arrays of strings', () => {
		expect( camelCase( [ '__foo__', '--bar' ], true ) ).toBe( 'FooBar' );
	} );

	it( 'handles dot separated strings', () => {
		expect( camelCase( '--foo.bar', false ) ).toBe( 'fooBar' );
		expect( camelCase( 'whats.up.dog', false ) ).toBe( 'whatsUpDog' );
		expect( camelCase( 'whats.up.dog', true ) ).toBe( 'WhatsUpDog' );
	} );
} );
