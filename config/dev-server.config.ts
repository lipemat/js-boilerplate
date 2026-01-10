import fs from 'fs';
import {getPackageConfig} from '@lipemat/js-boilerplate-shared';
import type {Configuration} from 'webpack-dev-server';

const packageConfig = getPackageConfig();

const url = new URL( packageConfig.url );

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
	},
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Headers': '*',
	},
	host: '0.0.0.0', // Allow connections from any IP.
	hot: true,
	port: 3000,
	server,
	static: false,
}

export default config;
