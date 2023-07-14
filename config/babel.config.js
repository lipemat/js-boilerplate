const {getDefaultBrowsersList} = require( '../helpers/config' );

const presetEnv = {
	bugfixes: true,
	corejs: {
		version: '3.31',
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
		[ '@babel/preset-react', {
			development: 'production' !== process.env.NODE_ENV,
			runtime: 'automatic',
		} ],
		'@babel/preset-typescript',
	],
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
	],
};
