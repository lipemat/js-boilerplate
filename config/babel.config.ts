import {getBrowsersList} from '../helpers/config.ts';
import type {TransformOptions} from '@babel/core';
import type {Options} from '@babel/preset-env';
import {createRequire} from 'node:module';

export type BabelConfig = Pick<BabelFull, 'presets' | 'plugins' | 'cacheDirectory'>;
export type BabelFull = Partial<TransformOptions> & BabelLoader;

/**
 * @link https://webpack.js.org/loaders/babel-loader/#options
 */
export type BabelLoader = {
	cacheDirectory?: boolean | string;
	cacheIdentifier?: string;
	cacheCompression?: boolean;
	customize?: string;
	metadataSubscribers?: string[];
}

/**
 * Use Babel's preset-env to add support for target browsers.
 *
 * @note Set the `debug` option to `true` to debug the included polyfills and plugins.
 *
 * @see https://babeljs.io/docs/en/babel-preset-env
 */
const presetEnv: Options = {
	bugfixes: true,
	corejs: {
		// Use the core-js version currently installed in the project.
		version: createRequire( import.meta.url )( 'core-js/package.json' ).version,
		proposals: false,
	},
	// Enable the `debug` option to debug the included polyfills and plugins.
	debug: false,
	// Ignore any external browserslist in favor of `getBrowsersList()`.
	ignoreBrowserslistConfig: true,
	shippedProposals: false,
	targets: {
		browsers: getBrowsersList(),
	},
	useBuiltIns: 'usage',
};


const babelConfig: BabelConfig = {
	cacheDirectory: true,
	presets: [
		[ '@babel/preset-env', presetEnv ],
		[ '@babel/preset-react', {
			development: 'production' !== process.env.NODE_ENV,
			runtime: 'automatic',
		} ],
		'@babel/preset-typescript',
	],
	plugins: [],
};

export default babelConfig;
