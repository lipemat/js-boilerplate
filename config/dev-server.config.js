const fs = require( 'fs' );
const packageConfig = require( '../helpers/package-config' );

const url = new URL( packageConfig.url );

let server = 'https:' === url.protocol ? 'https' : 'http';
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

module.exports = {
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
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
		'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
	},
	host: '0.0.0.0', // Allow connections from any IP.
	hot: true,
	port: 3000,
	server,
	static: false,
};
