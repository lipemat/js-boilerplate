const webpack = require( 'webpack' );
const WebpackDevServer = require( 'webpack-dev-server' );

new webpack.DefinePlugin( {
	PRODUCTION: JSON.stringify( false ),
	'process.env.BABEL_ENV': JSON.stringify( 'development' ),
	'process.env.NODE_ENV': JSON.stringify( 'development' )
} );

const config = require( '../config/webpack.dev' );

new WebpackDevServer( webpack( config ), {
	disableHostCheck: true,
	publicPath: config.output.publicPath,
	hot: true,
	https: true,
	historyApiFallback: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
		'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
	}
} ).listen( 3000, 'localhost', function( err, result ) {
	if ( err ) {
		return console.log( err );
	}

	console.log( 'Listening at https://localhost:3000/' );
} );
