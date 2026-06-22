import fs from 'fs';
import {getPackageConfig} from '@lipemat/js-boilerplate-shared/helpers/package-config.js';
import {DEV_SERVER_PORT_START} from '../helpers/dev-server-port.js';
import type {Configuration} from 'webpack-dev-server';

const packageConfig = getPackageConfig();

const url = new URL( packageConfig.url );

const port = 'undefined' !== typeof process.env.LIPEMAT_DEV_SERVER_PORT
	? Number( process.env.LIPEMAT_DEV_SERVER_PORT )
	: DEV_SERVER_PORT_START;

let server: Configuration['server'] = 'https:' === url.protocol ? 'https' : 'http';
// Load local certificates for https during development.
if ( 'object' === typeof ( packageConfig.certificates ) ) {
	server = {
		type: 'https',
		options: {
			cert: fs.readFileSync( packageConfig.certificates.cert ),
			key: fs.readFileSync( packageConfig.certificates.key ),
		},
	};
}

const config: Configuration = {
	allowedHosts: 'all',
	client: {
		logging: 'warn',
		overlay: {
			errors: true,
			warnings: false,
		},
		webSocketURL: {
			hostname: url.hostname,
			port,
			protocol: 'wss',
		},
	},
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Headers': '*',
	},
	host: '0.0.0.0', // Allow connections from any IP.
	hot: true,
	port,
	server,
	static: false,
}

export default config;
