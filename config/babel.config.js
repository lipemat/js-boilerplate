const {getDefaultBrowsersList} = require( '../helpers/config' );

const presetEnv = {
	corejs: {
		version: '3.8',
	},
	shippedProposals: true,
	useBuiltIns: 'usage',
};

/**
 * Use shared browserslist configurations.
 */
if ( getDefaultBrowsersList() ) {
	presetEnv.targets = getDefaultBrowsersList();
}

module.exports = {
	cacheDirectory: true,
	presets: [
		[ '@babel/preset-env', presetEnv ],
		'@babel/preset-react',
		'@babel/preset-typescript',
	],
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		'react-hot-loader/babel',
	],
};
