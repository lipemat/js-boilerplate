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
	jest.isolateModules( () => {
		config = require( '../../config/postcss.config.js' );
	} );
	return config;
}

function processPostCSS( input: string ): Promise<postcss.Result> {
	const config = getPostCSSConfig();
	return postcss( config.plugins ).process( input, {
		from: 'test.css',
		parser: require( config.parser ),
	} );
}

// Create a data provider for fixtures.
const fixtures: Fixture[] = require( 'glob' )
	.sync( 'tests/fixtures/{postcss,safari-15}/*.pcss' )
	.map( file => {
		return {
			basename: basename( file ),
			input: file,
			output: file.replace( '.pcss', '.css' ),
			description: file.replace( /\\/g, '/' ).replace( 'tests/fixtures/', '' ),
		};
	} );

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
		const creator = ( browsers, features = {} ) => {
			return postcssPresetEnv( {
				browsers,
				features: {...features},
			} );
		};

		const config = getPostCSSConfig();
		// We want to make sure no matter what postcss-custom-properties is not included
		// if a user did not provided a custom browserslist to override.
		expect( config.plugins[ 4 ].plugins?.filter( plugin => {
			return 'postcss-custom-properties' === plugin.postcssPlugin;
		} ).length ).toEqual( 0 );
		expect( config.plugins[ 4 ].plugins?.filter( plugin => {
			return 'postcss-focus-visible' === plugin.postcssPlugin;
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

		// Safari 15 requires postcss-focus-visible.
		process.env.BROWSERSLIST = 'safari 15';
		const config3 = getPostCSSConfig();
		expect( config3.plugins[ 4 ]?.plugins?.filter( plugin => {
			return 'postcss-focus-visible' === plugin.postcssPlugin;
		} ).length ).toEqual( 1 );
		expect( JSON.stringify( config3.plugins[ 4 ] ) )
			.toEqual( JSON.stringify( creator( [ 'safari 15' ], {
				'focus-visible-pseudo-class': {
					replaceWith: ':global(.focus-visible)',
				},
			} ) ) );


		// @notice If this fails, we can probably remove the override in favor of default wp.
		const wpDefaultBrowsers = [ ...require( '@wordpress/browserslist-config' ) ];
		process.env.BROWSERSLIST = browserslist( wpDefaultBrowsers );
		expect( getPostCSSConfig().plugins[ 4 ]?.plugins?.filter( plugin => {
			return 'postcss-custom-properties' === plugin.postcssPlugin;
		} ).length ).toEqual( 1 );
	} );


	test.each( fixtures )( 'PostCSS fixtures ( $description )', async fixture => {
		if ( fixture.input.includes( 'safari-15' ) ) {
			process.env.BROWSERSLIST = 'safari 15';
		}

		const input = readFileSync( fixture.input, 'utf8' );
		let output = readFileSync( fixture.output.replace( '.css', '.raw.css' ), 'utf8' );
		let result = await processPostCSS( input );
		expect( result.css.trim() ).toEqual( output.trim() );

		process.env.NODE_ENV = 'production';
		result = await processPostCSS( input );
		output = readFileSync( fixture.output.replace( '.css', '.raw.min.css' ), 'utf8' );
		expect( result.css.trim() ).toEqual( output.trim() );
	} );


	test.each( fixtures )( 'Webpack compiled fixtures ( $description )', async fixture => {
		if ( fixture.input.includes( 'safari-15' ) ) {
			process.env.BROWSERSLIST = 'safari 15';
		}

		let output = readFileSync( fixture.output, 'utf8' );
		let webpackResult = await compileWithWebpack( fixture );
		expect( webpackResult ).toEqual( output.trim() )

		process.env.NODE_ENV = 'production';
		output = readFileSync( fixture.output.replace( '.css', '.min.css' ), 'utf8' );
		webpackResult = await compileWithWebpack( fixture );
		expect( webpackResult ).toEqual( output.trim() );
	} );
} );
