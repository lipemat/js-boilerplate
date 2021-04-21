const fs = require( 'fs' );
const configHelper = require('../helpers/config' );
const webpackConfig = configHelper.getConfig('webpack.dev.js');
const packageConfig = require( '../helpers/package-config' );

const url = new URL( packageConfig.url );

let https = url.protocol === 'https:';
// Load local certificates for https during development.
if ( 'object' === typeof( packageConfig.certificates ) ) {
	https = {
		cert: fs.readFileSync( packageConfig.certificates.cert ),
		key: fs.readFileSync( packageConfig.certificates.key ),
	};
}

module.exports = {
	disableHostCheck: true,
	host: '0.0.0.0', // Allow connections from outside localhost to support mobile debugging
	hot: true,
	https,
	historyApiFallback: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
		'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
	},
	port: 3000,
	public: url.hostname + ':3000',
	publicPath: webpackConfig.output.publicPath,
	stats: webpackConfig.stats
};
