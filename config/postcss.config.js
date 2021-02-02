const postcssPresetEnv = require( 'postcss-preset-env' );

const config = {
	plugins: [
		require( 'postcss-import' ),
		require( 'postcss-custom-media' ),
		require( 'postcss-nested' ),
		postcssPresetEnv( {
			browsers: [
				'defaults',
				'not IE 11',
			],
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
