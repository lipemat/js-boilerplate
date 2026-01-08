import {existsSync} from 'fs';
import {createRequire} from 'node:module';
import {resolve} from 'path';
import {type Configuration as WebpackConfig} from 'webpack';
import type {Configuration as DevServerConfig} from 'webpack-dev-server';
import type {BabelConfig} from '../config/babel.config';
import type {JestConfig} from '../config/jest.config.ts';
import {getExtensionsConfig, getPackageConfig} from '@lipemat/js-boilerplate-shared';
import type {EntriesConfig} from '../config/entries.config';
import type {PostCSSConfig} from '../config/postcss.config';
import type {CssLoaderConfig} from '../config/css-loader.config';

// Must be required to avoid issues with browserslist.
const browserslist = createRequire( import.meta.url )( 'browserslist' );
const requireModule = createRequire( import.meta.url );


type Configs = {
	'babel.config': BabelConfig;
	'css-loader.config': CssLoaderConfig;
	'dev-server.config': DevServerConfig;
	'entries.config': EntriesConfig;
	'jest.config': JestConfig;
	'postcss.config': PostCSSConfig;
	'webpack.dist': WebpackConfig;
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
export function hasLocalOverride( fileName: string, inWorkingDirectory: boolean = false ): boolean {
	let hasLocal = false;
	try {
		if ( inWorkingDirectory ) {
			requireModule( resolve( workingDirectory, fileName ) );
			hasLocal = true;
		} else {
			requireModule( resolve( packageDirectory + '/config', fileName ) );
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
export function getConfig<T extends keyof Configs>( fileName: T ): Configs[T] {
	let mergedConfig = requireModule( '../config/' + fileName ) as Configs[T];
	mergedConfig = {...mergedConfig, ...getExtensionsConfig<Configs[T]>( fileName, mergedConfig )};
	try {
		const localConfig = requireModule( resolve( packageDirectory + '/config', fileName ) );
		if ( 'function' === typeof localConfig ) {
			mergedConfig = {...mergedConfig, ...localConfig( mergedConfig )};
		} else {
			mergedConfig = {...mergedConfig, ...localConfig};
		}
	} catch ( e ) {
		if ( e instanceof Error ) {
			if ( ! ( 'code' in e ) || 'MODULE_NOT_FOUND' !== e.code ) {
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
		const wp = [ ...requireModule( '@wordpress/browserslist-config' ) ];
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
		const wp = [ ...requireModule( '@wordpress/browserslist-config' ) ];
		return adjustBrowserslist( wp );
	}
	return false;
};


export {
	/**
	 * @deprecated Use `@lipemat/js-boilerplate-shared` instead.
	 */
	getExtensionsConfig,
}
