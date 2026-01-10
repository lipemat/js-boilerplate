import {existsSync} from 'fs';
import {resolve} from 'path';
import {type Configuration as WebpackConfig} from 'webpack';
import type {Configuration as DevServerConfig} from 'webpack-dev-server';
import type {BabelConfig} from '../config/babel.config';
import type {JestConfig} from '../config/jest.config.ts';
import {getExtensionsConfig, getPackageConfig} from '@lipemat/js-boilerplate-shared';
import type {EntriesConfig} from '../config/entries.config.ts';
import type {CssLoaderConfig} from '../config/css-loader.config.ts';
import browserslist from 'browserslist';
// @ts-expect-error TS2307
import wpBrowsers from '@wordpress/browserslist-config';
import {createRequire} from 'node:module';

type Configs = {
	'babel.config': BabelConfig;
	'babel.config.js': BabelConfig;
	'css-loader.config': CssLoaderConfig;
	'css-loader.config.js': CssLoaderConfig;
	'dev-server.config': DevServerConfig;
	'dev-server.config.js': DevServerConfig;
	'entries.config': EntriesConfig;
	'entries.config.js': EntriesConfig;
	'jest.config': JestConfig;
	'jest.config.js': JestConfig;
	'webpack.dist': WebpackConfig;
	'webpack.dist.js': WebpackConfig;
};

const {workingDirectory, packageDirectory} = getPackageConfig();


/**
 * Check to see if a local config file exists.
 *
 * @param {string}  fileName
 * @param {boolean} inWorkingDirectory - Look in working directory instead of their /config directory
 *
 * @return {boolean}
 */
export async function hasLocalOverride( fileName: string, inWorkingDirectory: boolean = false ): Promise<boolean> {
	let hasLocal = false;
	try {
		if ( inWorkingDirectory ) {
			await import( resolve( workingDirectory, fileName ) );
			hasLocal = true;
		} else {
			await import( resolve( packageDirectory + '/config', fileName ) );
			hasLocal = true;
		}
	} catch ( e ) {
		if ( e instanceof Error ) {
			if ( ! ( 'code' in e ) || 'MODULE_NOT_FOUND' !== e.code ) {
				console.error( e );
			}
		}
	}

	return hasLocal;
}


/**
 * Get a config from our /config directory merged with any
 * matching configuration from the project directory.
 *
 * For instance, if we have a file named config/babel.config.js in our project,
 * we will merge the contents with our config/babel.config.js in favor of whatever
 * is specified with the project's file.
 *
 * If the `module.exports` is a function, the existing configuration will be passed
 * as the only argument. Otherwise, standard `module.exports` are also supported.
 *
 * @example ```ts
 * // standard
 * module.export = {
 *     externals: {extra: 'Extra'}
 * }
 * // function
 * module.exports = function(config) {
 *     return {
 *         externals: {...config.externals, extra: 'Extra'}
 *     }
 * }
 * ```
 *
 * @param {string} fileName
 *
 * @return {Object}
 */
export async function getConfig<T extends keyof Configs>( fileName: T ): Promise<Configs[T]> {
	let config = await import( '../config/' + fileName );
	if ( 'default' in config ) {
		config = config.default;
	}

	let mergedConfig: Configs[T] = {...config, ...getExtensionsConfig<Configs[T]>( fileName, config )};

	// Prevent double merging during local unit tests.
	if ( 'js-boilerplate' === packageDirectory.split( /[\\/]/ ).pop() ) {
		return mergedConfig;
	}

	try {
		let localConfig = createRequire( import.meta.url )( resolve( packageDirectory, 'config', fileName.replace( /\.js$/, '' ) ) );
		if ( 'default' in localConfig ) {
			localConfig = localConfig.default;
		}

		if ( 'function' === typeof localConfig ) {
			mergedConfig = {...mergedConfig, ...localConfig( mergedConfig )};
		} else {
			mergedConfig = {...mergedConfig, ...localConfig};
		}
	} catch ( e ) {
		if ( e instanceof Error ) {
			if ( ! ( 'code' in e ) || ( 'MODULE_NOT_FOUND' !== e.code && 'ERR_MODULE_NOT_FOUND' !== e.code ) ) {
				console.error( e );
			}
		}
	}
	return mergedConfig;
}


/**
 * Get the path to the "tsconfig.json" file if it exists.
 *
 * 1. The working directory.
 * 2. The package directory.
 *
 * The package directory takes priority over the working directory.
 *
 *
 * @return {string}
 */
export function getTsConfigFile(): string {
	const possibles = [
		// Backward compatible for before @lipemat/eslint-config version 3.
		resolve( workingDirectory + '/tsconfig.json' ),
		resolve( packageDirectory + '/tsconfig.json' ),
	].filter( existsSync );

	let tsConfig = '';
	possibles.forEach( filePath => {
		tsConfig = filePath;
	} );
	return tsConfig;
}


/**
 * Get the browserslist from the current project.
 *
 * - If specified using standard browserslist config, we will use that.
 *
 *  @link https://github.com/browserslist/browserslist#config-file
 */
export function getBrowsersList(): readonly string[] {
	const projectBrowsersList = browserslist();
	if ( browserslist( browserslist.defaults ) === projectBrowsersList ) {
		const wp = [ ...wpBrowsers ];
		return adjustBrowserslist( wp );
	}
	return projectBrowsersList;
}

/**
 * Adjust the browserslist to include our defaults.
 */
export function adjustBrowserslist( browserRules: string[] ): string[] {
	return browserRules;
}

/**
 * If the browserslist is not specified, we fall back to WordPress defaults.
 *
 * - Return the default browserslist if the current project does not specify one.
 * - Return false if a browserslist is specified.
 *
 * Used in cases where we can fall back to standard browserslist config if the project
 * has not specified one.
 *
 * @deprecated Use getBrowsersList instead.
 *
 * @link https://github.com/browserslist/browserslist#config-file
 *
 * @return {boolean | string[]}
 */
export const getDefaultBrowsersList = (): false | string[] => {
	if ( browserslist( browserslist.defaults ) === browserslist() ) {
		const wp = [ ...wpBrowsers ];
		return adjustBrowserslist( wp );
	}
	return false;
};


export {
	/**
	 * @deprecated Use `@lipemat/js-boilerplate-shared` instead.
	 */
	getExtensionsConfig,
};
