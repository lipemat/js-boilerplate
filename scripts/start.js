process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require( 'webpack' );
const WebpackDevServer = require( 'webpack-dev-server' );
const configHelper = require('../helpers/config' );
const webpackConfig = configHelper.getConfig('webpack.dev.js');
const devServerConfig = configHelper.getConfig('dev-server.config.js');

const server = new WebpackDevServer( webpack( webpackConfig ), devServerConfig );

server.listen( devServerConfig.port, devServerConfig.host, function( err, result ) {
	if ( err ) {
		return console.log( err );
	}
	if ( devServerConfig.https ) {
		console.log( `Listening at https://${devServerConfig.host}:${devServerConfig.port}/` );
	} else {
		console.log( `Listening at http://${devServerConfig.host}:${devServerConfig.port}/` );
	}
} );
