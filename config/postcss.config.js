let config = {
	plugins: [
		require( 'postcss-import' ),
		require( 'postcss-custom-media' ),
		require( 'postcss-nested' ),
		require( 'postcss-preset-env' ),
		require( 'css-mqpacker' )
	],
	parser: 'postcss-scss'
};

// For production we minify it.
if ( 'production' === process.env.NODE_ENV ) {
	config.plugins.push( require( 'postcss-clean' )( {
		level: 2
	} ) );
} else {
	config.sourceMap = true;
}


module.exports = config;
