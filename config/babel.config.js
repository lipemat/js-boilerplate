const browserslist = require( 'browserslist' );

const presetEnv = {
	corejs: {
		version: '3.8',
	},
	shippedProposals: true,
	useBuiltIns: 'usage',
};

/**
 * If browserslist is not specified, we fallback to WordPress defaults.
 *
 * @link https://babeljs.io/docs/en/babel-preset-env#targets
 */
if ( browserslist( browserslist.defaults ) === browserslist() ) {
	presetEnv.targets = require( '@wordpress/browserslist-config' );
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

