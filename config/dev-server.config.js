const fs = require( 'fs' );
const packageConfig = require( '../helpers/package-config' );

const url = new URL( packageConfig.url );

let https = 'https:' === url.protocol;
// Load local certificates for https during development.
if ( 'object' === typeof ( packageConfig.certificates ) ) {
	https = {
		cert: fs.readFileSync( packageConfig.certificates.cert ),
		key: fs.readFileSync( packageConfig.certificates.key ),
	};
}

module.exports = {
	allowedHosts: 'all',
	host: '0.0.0.0', // Allow connections from any IP.
	hot: true,
	https,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
		'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
	},
	port: 3000,
	static: false,
};
