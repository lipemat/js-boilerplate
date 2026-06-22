process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

import webpack from 'webpack';
import {getPackageConfig} from '@lipemat/js-boilerplate-shared/helpers/package-config.js';
import {unlinkSync, writeFile} from 'fs';
import WebpackDevServer from 'webpack-dev-server';
import {getConfig} from '../helpers/config.js';
import {getDevServerPort} from '../helpers/dev-server-port.js';
import path from 'path';

process.env.LIPEMAT_DEV_SERVER_PORT = String( await getDevServerPort() );

const webpackConfig = await getConfig( 'webpack.dev.js' );
const devServerConfig = await getConfig( 'dev-server.config.js' );

const compiler = webpack( webpackConfig );
if ( null === compiler ) {
	throw new Error( 'Failed to create the webpack compiler.' );
}
const server = new WebpackDevServer( devServerConfig, compiler );

/**
 * Create a `.running` file within the `dist` which only
 * exists if this script is running.
 */
const runningFile = path.resolve( getPackageConfig().workingDirectory, 'dist/.running' );
writeFile( runningFile, JSON.stringify( {
	pid: process.pid,
	port: Number( process.env.LIPEMAT_DEV_SERVER_PORT ),
	started: new Date().toISOString(),
} ), err => {
	if ( err ) {
		throw err;
	}
	process.on( 'exit', () => {
		unlinkSync( runningFile );
	} );
} );

( async() => {
	try {
		await server.start();
	} catch ( err ) {
		return console.error( err );
	}
} )();
