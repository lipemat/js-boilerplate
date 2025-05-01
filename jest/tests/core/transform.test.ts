describe( 'Tests can run with modern syntax.', () => {
	async function* foo() {
		await 1;
		yield 2;
	}

	test( 'support for async generator functions', async () => {
		const generator = foo();

		expect( await generator.next() ).toEqual( {
			done: false,
			value: 2,
		} );
	} );

	test( 'support for optional chaining', () => {
		const obj = {
			foo: {
				bar: 42,
			},
		};

		expect( obj?.foo?.bar ).toEqual( 42 );
		// @ts-expect-error
		expect( obj?.foo?.baz ).toEqual( undefined );
	} );

	test( 'support for url canParse', () => {
		if ( 'canParse' in URL ) {
			expect( URL.canParse( 'https://example.com' ) ).toEqual( true );
		} else {
			// @ts-ignore
			expect( URL.canParse ).toBeUndefined();
		}
	} );


	it( 'Supports named capturing regexes', () => {
		const regex = /(?<name>foo)/;
		const match = regex.exec( 'foo' );
		expect( match?.groups?.name ).toEqual( 'foo' );
	} );


	it( 'Supports private properties in classes', () => {
		class MyClass {
			#privateProperty = 'private';

			getPrivateProperty() {
				return this.#privateProperty;
			}
		}

		const instance = new MyClass();
		expect( instance.getPrivateProperty() ).toEqual( 'private' );
	} );


	it( 'Supports class fields', () => {
		class MyClass {
			field = 'field value';

			getField() {
				return this.field;
			}
		}

		const instance = new MyClass();
		expect( instance.getField() ).toEqual( 'field value' );
	} );
} );
