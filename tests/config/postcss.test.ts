// @ts-ignore
const browserslist = require( 'browserslist' );
const postcssPresetEnv = require( 'postcss-preset-env' );

type Config = {
	plugins: Array<{
		plugins?: Array<{
			postcssPlugin: string,
		}>
	}>,
	parser: string,
	sourceMap?: boolean,
}


function getPostCSSConfig(): Config {
	jest.resetModules();
	return require( '../../config/postcss.config.js' );
}

afterEach( () => {
	process.env.NODE_ENV = 'test';
	delete process.env.BROWSERSLIST;
} );


describe( 'postcss.js', () => {
	test( 'PostCSS config', () => {
		/**
		 * @notice If the browserslist results change, the snapshot will need to be updated.
		 */
		expect( getPostCSSConfig() ).toMatchSnapshot( 'develop' );

		process.env.NODE_ENV = 'production';
		expect( getPostCSSConfig() ).toMatchSnapshot( 'production' );
	} );


	test( 'sourceMap', () => {
		expect( getPostCSSConfig().sourceMap ).toEqual( true );

		process.env.NODE_ENV = 'production';
		expect( getPostCSSConfig().sourceMap ).not.toBeDefined();
	} );


	test( 'Browserslist config', () => {
		const expectedBrowsers = [ ...require( '@wordpress/browserslist-config' ) ];
		expectedBrowsers.push( 'not and_uc 15.5' );
		const creator = browsers => {
			return postcssPresetEnv( {
				browsers,
				features: {
					'focus-visible-pseudo-class': {
						replaceWith: ':global(.focus-visible)',
					},
				},
			} );
		};

		const config = getPostCSSConfig();
		// We want to make sure no matter what postcss-custom-properties is not included
		// if a user did not provided a custom browserslist to override.
		expect( config.plugins[ 4 ].plugins?.filter( plugin => {
			return 'postcss-custom-properties' === plugin.postcssPlugin;
		} ).length ).toEqual( 0 );

		expect( JSON.stringify( config.plugins[ 4 ] ) )
			.toEqual( JSON.stringify( creator( expectedBrowsers ) ) );

		// and_uc 15.5 requires postcss-custom-properties.
		process.env.BROWSERSLIST = 'and_uc 15.5';
		const config2 = getPostCSSConfig();
		expect( config2.plugins[ 4 ]?.plugins?.filter( plugin => {
			return 'postcss-custom-properties' === plugin.postcssPlugin;
		} ).length ).toEqual( 1 );
		expect( JSON.stringify( config2.plugins[ 4 ] ) )
			.toEqual( JSON.stringify( creator( [ 'and_uc 15.5' ] ) ) );


		// @notice If this fails, we can probably remove the override in favor of default wp.
		const wpDefaultBrowsers = [ ...require( '@wordpress/browserslist-config' ) ];
		process.env.BROWSERSLIST = browserslist( wpDefaultBrowsers );
		expect( getPostCSSConfig().plugins[ 4 ]?.plugins?.filter( plugin => {
			return 'postcss-custom-properties' === plugin.postcssPlugin;
		} ).length ).toEqual( 1 );
	} );
} );
