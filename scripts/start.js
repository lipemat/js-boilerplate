process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require( 'webpack' );
const config = require( '../helpers/package-config' );
const {unlinkSync, writeFile} = require( 'fs' );
const WebpackDevServer = require( 'webpack-dev-server' );
const configHelper = require( '../helpers/config' );
const path = require( 'path' );
const webpackConfig = configHelper.getConfig( 'webpack.dev.js' );
const devServerConfig = configHelper.getConfig( 'dev-server.config.js' );

const server = new WebpackDevServer( devServerConfig, webpack( webpackConfig ) );

/**
 * Create a `.running` file within the `dist` which only
 * exists if this script is running.
 */
writeFile( path.resolve( config.workingDirectory, 'dist/.running' ), Date.now().toString(), err => {
	if ( err ) {
		throw err;
	}
	process.on( 'exit', () => {
		unlinkSync( path.resolve( config.workingDirectory, 'dist/.running' ) );
	} );
} );

( async() => {
	try {
		await server.start();
	} catch ( err ) {
		return console.log( err );
	}
} )();
