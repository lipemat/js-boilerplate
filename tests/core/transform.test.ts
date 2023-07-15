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
		// @ts-ignore
		expect( obj?.foo?.baz ).toEqual( undefined );
	} );

	test( 'support for url canParse', () => {
		// @ts-ignore
		expect( URL.canParse( 'https://example.com' ) ).toEqual( true );
	} );
} );
