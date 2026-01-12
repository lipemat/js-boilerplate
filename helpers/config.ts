import {existsSync} from 'fs';
import {resolve} from 'path';
import {type Configuration as WebpackConfig} from 'webpack';
import type {Configuration as DevServerConfig} from 'webpack-dev-server';
import type {BabelConfig} from '../config/babel.config';
import type {JestConfig} from '../config/jest.config.js';
import {getPackageConfig} from '@lipemat/js-boilerplate-shared/helpers/package-config.js';
import type {EntriesConfig} from '../config/entries.config.js';
import type {CssLoaderConfig} from '../config/css-loader.config.js';
import browserslist from 'browserslist';
import {createRequire} from 'node:module';
import {ensureJSExtension, getExtensionsConfig} from '@lipemat/js-boilerplate-shared/helpers/config.js';
import {getBrowsersList} from '@lipemat/js-boilerplate-shared/helpers/browserslist.js';

type Configs = {
	'babel.config.js': BabelConfig;
	'css-loader.config.js': CssLoaderConfig;
	'dev-server.config.js': DevServerConfig;
	'entries.config.js': EntriesConfig;
	'jest.config.js': JestConfig;
	'webpack.dev.js': WebpackConfig;
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
	const configModule = await import( ensureJSExtension( `../config/${fileName}` ) );
	const config = configModule.default;

	const extensionsConfig = getExtensionsConfig<Configs[T]>( fileName, config );
	let mergedConfig: Configs[T] = {...config, ...extensionsConfig};

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
export const getDefaultBrowsersList = (): false | readonly string[] => {
	if ( browserslist( browserslist.defaults ) === browserslist() ) {
		return getBrowsersList();
	}
	return false;
};


export {
	/**
	 * @deprecated Use `@lipemat/js-boilerplate-shared` instead.
	 */
	getExtensionsConfig,
	/**
	 * @deprecated Use `@lipemat/js-boilerplate-shared` instead.
	 */
	getBrowsersList,
};
