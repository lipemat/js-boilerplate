process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require( 'webpack' );
const WebpackDevServer = require( 'webpack-dev-server' );
const configHelper = require( '../helpers/config' );
const webpackConfig = configHelper.getConfig( 'webpack.dev.js' );
const devServerConfig = configHelper.getConfig( 'dev-server.config.js' );

const server = new WebpackDevServer( devServerConfig, webpack( webpackConfig ) );

( async() => {
	try {
		await server.start();
	} catch ( err ) {
		return console.log( err );
	}
} )();
