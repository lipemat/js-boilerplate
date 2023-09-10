import {getPackageConfig} from './package-config';
const path = require( 'path' );
const browserslist = require( 'browserslist' );
const fs = require( 'fs' );

const extensions = [
	...Object.keys( getPackageConfig().dependencies ?? {} ).filter( name => name.includes( 'js-boilerplate-' ) ),
	...Object.keys( getPackageConfig().devDependencies ?? {} ).filter( name => name.includes( 'js-boilerplate-' ) ),
];

/**
 * Check to see if a local config file exists.
 *
 * @param {string}  fileName
 * @param {boolean} inWorkingDirectory - Look in working directory instead of their /config directory
 *
 * @return {boolean}
 */
function hasLocalOverride( fileName: string, inWorkingDirectory = false, ) {
	let hasLocal: boolean = false;
	const packageConfig = getPackageConfig();
	try {
		if ( inWorkingDirectory ) {
			require( path.resolve( packageConfig.workingDirectory, fileName ) );
			hasLocal = true;
		} else {
			require( path.resolve( packageConfig.packageDirectory + '/config', fileName ) );
			hasLocal = true;
		}
	} catch ( e ) {
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
export function getConfig( fileName: string ) {
	const packageConfig = getPackageConfig();
	let mergedConfig = require( '../config/' + fileName );
	mergedConfig = {...mergedConfig, ...getExtensionsConfig( fileName, mergedConfig )};
	try {
		const localConfig = require( path.resolve( packageConfig.packageDirectory + '/config', fileName ) );
		if ( 'function' === typeof localConfig ) {
			mergedConfig = {...mergedConfig, ...localConfig( mergedConfig )};
		} else {
			mergedConfig = {...mergedConfig, ...localConfig};
		}
	} catch ( e ) {
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
function getExtensionsConfig( fileName: string, defaultConfig: Record<string, any> ) {
	let mergedConfig: Record<string, any> = {};
	extensions.forEach( extension => {
		try {
			const extensionConfig = require( extension + '/config/' + fileName );
			if ( 'function' === typeof extensionConfig ) {
				mergedConfig = {...mergedConfig, ...extensionConfig( {...defaultConfig, ...mergedConfig} )};
			} else {
				mergedConfig = {...mergedConfig, ...extensionConfig};
			}
		} catch ( e ) {
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
function getTsConfigFile() {
	const packageConfig = getPackageConfig();
	const possibles = [
		// Backward compatible for before @lipemat/eslint-config version 3.
		path.resolve( packageConfig.workingDirectory + '/tsconfig.json' ),
		path.resolve( packageConfig.packageDirectory + '/tsconfig.json' ),
	];
	let tsConfig = '';
	possibles.forEach( filePath => {
		if ( Boolean( fs.existsSync( filePath ) ) ) {
			tsConfig = filePath;
		}
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
function getBrowsersList() {
	const projectBrowsersList = browserslist();
	if ( browserslist( browserslist.defaults ) === projectBrowsersList ) {
		const wp = [ ...require( '@wordpress/browserslist-config' ) ];
		wp.push( 'not and_uc 15.5' );
		return wp;
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
 * @link https://github.com/browserslist/browserslist#config-file
 *
 * @return {boolean | string[]}
 */
const getDefaultBrowsersList = () => {
	if ( browserslist( browserslist.defaults ) === browserslist() ) {
		const wp = [ ...require( '@wordpress/browserslist-config' ) ];
		wp.push( 'not and_uc 15.5' );
		return wp;
	}
	return false;
};

/**
 * @notice This module must remain CommonJS for use with Jest.
 *         It is loaded before TS is loaded by Jest.
 */
module.exports = {
	getBrowsersList,
	getConfig,
	getDefaultBrowsersList,
	getExtensionsConfig,
	getTsConfigFile,
	hasLocalOverride,
};
