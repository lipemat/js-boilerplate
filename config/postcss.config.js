const path = require( 'path' );
const fs = require( 'fs' );
const postcssPresetEnv = require( 'postcss-preset-env' );
const {getBrowsersList} = require( '../helpers/config' );
const packageConfig = require( '../helpers/package-config' );

/**
 * Base postcss-presets-env config.
 *
 */
const presetEnv = {
	browsers: getBrowsersList(),
	features: {}
};

// Get a list of included postcss plugins based no the browsers list.
const includedPlugins = postcssPresetEnv( presetEnv )
	.plugins
	.map( plugin => plugin.postcssPlugin );


if ( includedPlugins.includes( 'postcss-focus-visible' ) ) {
	presetEnv.features[ 'focus-visible-pseudo-class' ] = {
		/**
		 * Fixes `focus-visible` feature for CSS modules.
		 *
		 * Only needed if our browsers list includes non-supported browsers
		 * such as Safari 15.3 and below.
		 *
		 * Requires `focus-visible` polyfill to be loaded externally.
		 * Most will often need it site wide on pages, which do and don't use the JS app.
		 * @link https://unpkg.com/focus-visible@5.2.0/dist/focus-visible.min.js
		 */
		replaceWith: ':global(.focus-visible)'
	}
}

/**
 * Provide CSS properties and media queries to all postcss plugins.
 *
 * If a media-queries files exist, automatically load them.
 * If CSS variables exist, automatically load them.
 *
 * 1. pcss/globals/variables.pcss
 * 2. js/src/pcss/variables.pcss
 * 3. pcss/globals/media-queries.pcss
 * 4. js/src/pcss/media-queries.pcss
 */
const externalFiles = [];
[
	path.resolve( packageConfig.packageDirectory, 'pcss/globals/media-queries.pcss' ),
	path.resolve( packageConfig.packageDirectory, 'pcss/globals/variables.pcss' ),
	path.resolve( packageConfig.workingDirectory, 'src/pcss/media-queries.pcss' ),
	path.resolve( packageConfig.workingDirectory, 'src/pcss/variables.pcss' ),
].forEach( possibleFile => {
	if ( fs.existsSync( possibleFile ) ) {
		externalFiles.push( possibleFile );
	}
} );


/**
 * Put the config together.
 */
const config = {
	plugins: [
		require( '@csstools/postcss-global-data' )( {
			files: externalFiles,
		} ),
		require( 'postcss-import' )( {
			skipDuplicates: false,
		} ),
		require( 'postcss-custom-media' ),
		require( 'postcss-nested' ),
		postcssPresetEnv( presetEnv ),
		require( 'postcss-color-mod-function' ),
		require( '@lipemat/css-mqpacker' ),
	],
	parser: 'postcss-scss',
};

// For production, we minify it.
if ( 'production' === process.env.NODE_ENV ) {
	config.plugins.push( require( '../lib/postcss-clean' )( {
		level: 2,
	} ) );
} else {
	config.plugins.push( require( '../lib/postcss-pretty' ) );
	config.sourceMap = true;
}


module.exports = config;
