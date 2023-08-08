import {readFileSync} from 'fs';
import {basename} from 'path';
import postcss, {AcceptedPlugin} from 'postcss';
import compileWithWebpack, {Fixture} from '../test-helpers/compileWithWebpack';

const browserslist = require( 'browserslist' );
const postcssPresetEnv = require( 'postcss-preset-env' );

type Config = {
	plugins: Array<AcceptedPlugin & {
		plugins?: Array<{
			postcssPlugin: string,
		}>
	}>;
	parser: string;
	sourceMap?: boolean;
}

/**
 * @notice We can't reset the modules of MiniCssExtractPlugin conflicts with
 *         itself. Instead, we isolate other configurations to allow them to
 *         load fresh each time.
 */
function getPostCSSConfig(): Config {
	// @ts-ignore
	let config: Config = {};
	jest.isolateModules(() => {
		config = require( '../../config/postcss.config.js' );
	} );
	return config;
}

// Create a data provider for fixtures.
const fixtures: Fixture[] = require( 'glob' ).sync( 'tests/fixtures/postcss/*.pcss' )
	.map( file => {
			return {
				basename: basename( file ),
				input: file,
				output: file.replace( '.pcss', '.css' ),
			};
		}
	);


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


	test.each( fixtures )( 'PostCSS fixtures ( $basename )', async fixture => {
		const input = readFileSync( fixture.input, 'utf8' );
		let output = readFileSync( fixture.output.replace( '.css', '.raw.css' ), 'utf8' );
		let result = await postcss( getPostCSSConfig().plugins ).process( input, {
			from: fixture.input,
			parser: require( getPostCSSConfig().parser ),
		} );
		expect( result.css.trim() ).toEqual( output.trim() );

		process.env.NODE_ENV = 'production';
		result = await postcss( getPostCSSConfig().plugins ).process( input, {
			from: fixture.input,
			parser: require( getPostCSSConfig().parser ),
		} );
		output = readFileSync( fixture.output.replace( '.css', '.raw.min.css' ), 'utf8' );
		expect( result.css.trim() ).toEqual( output.trim() );
	} );


	test.each( fixtures )( 'Webpack compiled fixtures ( $basename )', async fixture => {
		let output = readFileSync( fixture.output, 'utf8' );
		let webpackResult = await compileWithWebpack( fixture );
		expect( webpackResult ).toEqual( output.trim() );

		process.env.NODE_ENV = 'production';
		output = readFileSync( fixture.output.replace( '.css', '.min.css' ), 'utf8' );
		webpackResult = await compileWithWebpack( fixture );
		expect( webpackResult ).toEqual( output.trim() );
	} );
} );
