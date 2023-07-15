const {getBrowsersList} = require( '../helpers/config' );

/**
 * Use Babel's preset-env to add support for target browsers.
 *
 * @note Set the `debug` option to `true` to debug the included polyfills and plugins.
 *
 * @see https://babeljs.io/docs/en/babel-preset-env
 */
const presetEnv = {
	bugfixes: true,
	corejs: {
		// Use the core-js version currently installed in the project.
		version: require( 'core-js/package.json' ).version,
	},
	debug: false,
	shippedProposals: true,
	targets: {
		browsers: getBrowsersList(),
	},
	useBuiltIns: 'usage',
};


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
