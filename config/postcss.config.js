const postcssPresetEnv = require( 'postcss-preset-env' );
const packageConfig = require( '../helpers/package-config' );
const path = require( 'path' );
const fs = require( 'fs' );

/**
 * Files containing CSS properties to be provided to `postcss-preset-env`.
 * Allows rendering the values in the finish CSS for IE11.
 *
 * @link https://github.com/csstools/postcss-preset-env#importfrom
 */
const importFrom = [
	path.resolve( packageConfig.workingDirectory, 'src/globals/pcss/variables.css' ),
	path.resolve( packageConfig.workingDirectory, '../pcss/variables.css' ),
].filter( filePath => fs.existsSync( filePath ) );

const config = {
	plugins: [
		require( 'postcss-import' ),
		require( 'postcss-custom-media' ),
		require( 'postcss-nested' ),
		postcssPresetEnv( {
			importFrom,
		} ),
		require( 'postcss-color-mod-function' ),
		require( '@lipemat/css-mqpacker' ),
	],
	parser: 'postcss-scss',
};

// For production we minify it.
if ( 'production' === process.env.NODE_ENV ) {
	config.plugins.push( require( 'postcss-clean' )( {
		level: 2,
	} ) );
} else {
	config.sourceMap = true;
}


module.exports = config;
