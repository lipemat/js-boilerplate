const path = require( 'path' );
const fs = require( 'fs' );
const postcssPresetEnv = require( 'postcss-preset-env' );
const {getDefaultBrowsersList} = require( '../helpers/config' );
const packageConfig = require( '../helpers/package-config' );

const presetEnv = {
	features: {
		/**
		 * Fixes `focus-visible` feature for CSS modules (included by preset-env anywhere
		 * Safari is supported).
		 *
		 * Requires `focus-visible` polyfill to be loaded externally to support Safari.
		 *
		 * @link https://caniuse.com/css-focus-visible
		 *
		 * May be imported directly into the index.js for sites, which loads JS app
		 * on every page.
		 * @link https://github.com/WICG/focus-visible
		 *
		 * Most will often need it site wide on pages, which do and don't use the JS app.
		 * @link https://unpkg.com/focus-visible@5.2.0/dist/focus-visible.min.js
		 */
		'focus-visible-pseudo-class': {
			replaceWith: ':global(.focus-visible)',
		},
	},
};

/**
 * If browserslist is not specified, we fall back to WordPress defaults.
 *
 * @link https://github.com/csstools/postcss-preset-env#browsers
 */
if ( getDefaultBrowsersList() ) {
	presetEnv.browsers = getDefaultBrowsersList();
}

/**
 * If a media-queries files exist, automatically load them.
 *
 * 1. pcss/globals/media-queries.pcss
 * 2. js/src/pcss/media-queries.pcss
 *
 * @notice `@import` will not work inside the media-queries file so
 *          there is no point in having a JS version if all it does is
 *          import from the global pcss version.
 */
const customMedia = {
	importFrom: [],
};
[
	path.resolve( packageConfig.packageDirectory, 'pcss/globals/media-queries.pcss' ),
	path.resolve( packageConfig.workingDirectory, 'src/pcss/media-queries.pcss' ),
].forEach( possibleFile => {
	if ( fs.existsSync( possibleFile ) ) {
		customMedia.importFrom.push( possibleFile );
	}
} );


/**
 * Put the config together.
 */
const config = {
	plugins: [
		require( 'postcss-import' )( {
			skipDuplicates: false,
		} ),
		require( 'postcss-custom-media' )( customMedia ),
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
	config.sourceMap = true;
}


module.exports = config;
