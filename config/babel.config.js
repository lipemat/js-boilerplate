const {getDefaultBrowsersList} = require( '../helpers/config' );

const presetEnv = {
	corejs: {
		version: '3.8',
	},
	shippedProposals: true,
	useBuiltIns: 'usage',
};

/**
 * If browserslist is not specified, we fallback to WordPress defaults
 * except for IE11 which we don't support by default.
 *
 * @link https://babeljs.io/docs/en/babel-preset-env#targets
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

