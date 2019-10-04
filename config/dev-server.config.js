const configHelper = require('../helpers/config' );
const webpackConfig = configHelper.getConfig('webpack.dev.js');

module.exports = {
	disableHostCheck: true,
	host: '0.0.0.0', // Allow connections from outside localhost to support mobile debugging
	hot: true,
	https: true,
	historyApiFallback: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
		'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
	},
	port: 3000,
	publicPath: webpackConfig.output.publicPath
};
