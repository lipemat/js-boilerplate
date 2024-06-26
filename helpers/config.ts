import {existsSync} from 'fs';
import {resolve} from 'path';
import webpack from 'webpack';
import type {BabelConfig} from '../config/babel.config';
import type {JestConfig} from '../config/jest.config';
import {getPackageConfig} from './package-config';
import type {EntriesConfig} from '../config/entries.config';
import type {Config as PostCSSConfig} from 'postcss-load-config';
import type {CssLoaderConfig} from '../config/css-loader.config';

// Must be required to avoid issues with browserslist.
const browserslist = require( 'browserslist' );


type Configs = {
	'babel.config': BabelConfig;
	'css-loader.config': CssLoaderConfig;
	'entries.config': EntriesConfig;
	'jest.config': JestConfig;
	'postcss.config': PostCSSConfig;
	'webpack.dist': webpack.Configuration;
};

const {dependencies, devDependencies, workingDirectory, packageDirectory} = getPackageConfig();

const extensions = [
	...Object.keys( dependencies ?? {} ).filter( name => name.includes( 'js-boilerplate-' ) ),
	...Object.keys( devDependencies ?? {} ).filter( name => name.includes( 'js-boilerplate-' ) ),
];


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
			require( resolve( workingDirectory, fileName ) );
			hasLocal = true;
		} else {
			require( resolve( packageDirectory + '/config', fileName ) );
			hasLocal = true;
		}
	} catch ( e ) {
		if ( 'MODULE_NOT_FOUND' !== e.code ) {
			console.error( e );
		}
	}

	return hasLocal;
}


/**
 * Get a config from our /config directory merged with any
 * matching configuration from the project directory.
 *
 * For instance if we have a file named config/babel.config.js in our project
 * we will merge the contents with our config/babel.config.js in favor of whatever
 * is specified with the project's file.
 *
 * If the `module.exports` are a function, the existing configuration will be passed
 * as the only argument. Otherwise, standard `module.exports` are also supported.
 *
 * @example ```ts
 * // standard
 * module.export = {
 *     externals: {extra: 'Extra'}
 * }
 * // function
 * module.exports = function( config ) {
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
	let mergedConfig = require( '../config/' + fileName ) as Configs[T];
	mergedConfig = {...mergedConfig, ...getExtensionsConfig<Configs[T]>( fileName, mergedConfig )};
	try {
		const localConfig = require( resolve( packageDirectory + '/config', fileName ) );
		if ( 'function' === typeof localConfig ) {
			mergedConfig = {...mergedConfig, ...localConfig( mergedConfig )};
		} else {
			mergedConfig = {...mergedConfig, ...localConfig};
		}
	} catch ( e ) {
		if ( 'MODULE_NOT_FOUND' !== e.code ) {
			console.error( e );
		}
	}
	return mergedConfig;
}


/**
 * Get a config from any existing extension's /config directories
 * merged into one.
 *
 * @param {string} fileName
 * @param {Object} defaultConfig - Default config from this package.
 *                               Used for passing to an extension callback.
 *
 * @see getConfig
 *
 * @return {Object}
 */
export function getExtensionsConfig<T extends object>( fileName: string, defaultConfig: T ): T {
	let mergedConfig: T = {} as T;
	extensions.forEach( extension => {
		try {
			const extensionConfig = require( extension + '/config/' + fileName );
			if ( 'function' === typeof extensionConfig ) {
				mergedConfig = {...mergedConfig, ...extensionConfig( {...defaultConfig, ...mergedConfig} )};
			} else {
				mergedConfig = {...mergedConfig, ...extensionConfig};
			}
		} catch ( e ) {
			if ( 'MODULE_NOT_FOUND' !== e.code ) {
				console.error( e );
			}
		}
	} );

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
		const wp = [ ...require( '@wordpress/browserslist-config' ) ];
		return adjustBrowserslist( wp );
	}
	return projectBrowsersList;
}


/**
 * If browserslist is not specified, we fall back to WordPress defaults.
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
		const wp = [ ...require( '@wordpress/browserslist-config' ) ];
		return adjustBrowserslist( wp );
	}
	return false;
};


/**
 * Adjust the browserslist to include our defaults.
 *
 * @todo Remove `not op_mini all` after 3/8/2024 if it does not creep back in to the defaults.
 */
export function adjustBrowserslist( browserRules: string[] ): string[] {
	browserRules.push( 'not op_mini all' );
	return browserRules;
}
