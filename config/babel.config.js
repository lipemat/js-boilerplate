const browserslist = require( 'browserslist' );

const presetEnv = {
	corejs: {
		version: '3.8',
	},
	shippedProposals: true,
	useBuiltIns: 'usage',
};
/**
 * Requirement of Babel preset when no browserlist config is specified.
 *
 * @notice Will change in Babel 8.
 *
 * @link https://babeljs.io/docs/en/babel-preset-env#targets
 */
if ( browserslist( browserslist.defaults ) === browserslist() ) {
	presetEnv.targets = 'defaults';
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

