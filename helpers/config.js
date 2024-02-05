'use strict';
Object.defineProperty( exports, '__esModule', {value: true} );
exports.adjustBrowserslist = exports.getDefaultBrowsersList = exports.getBrowsersList = exports.getTsConfigFile = exports.getExtensionsConfig = exports.getConfig = exports.hasLocalOverride = void 0;
const fs_1 = require( 'fs' );
const path_1 = require( 'path' );
const browserslist = require( 'browserslist' );
const package_config_1 = require( './package-config' );
const {dependencies, devDependencies, workingDirectory, packageDirectory} = ( 0, package_config_1.getPackageConfig )();
const extensions = [
	...Object.keys( dependencies !== null && dependencies !== void 0 ? dependencies : {} ).filter( name => name.includes( 'js-boilerplate-' ) ),
	...Object.keys( devDependencies !== null && devDependencies !== void 0 ? devDependencies : {} ).filter( name => name.includes( 'js-boilerplate-' ) ),
];
/**
 * Check to see if a local config file exists.
 *
 * @param {string}  fileName
 * @param {boolean} inWorkingDirectory - Look in working directory instead of their /config directory
 *
 * @return {boolean}
 */
function hasLocalOverride( fileName, inWorkingDirectory = false ) {
	let hasLocal = false;
	try {
		if ( inWorkingDirectory ) {
			require( ( 0, path_1.resolve )( workingDirectory, fileName ) );
			hasLocal = true;
		} else {
			require( ( 0, path_1.resolve )( packageDirectory + '/config', fileName ) );
			hasLocal = true;
		}
	} catch ( e ) {
	}
	return hasLocal;
}
exports.hasLocalOverride = hasLocalOverride;
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
function getConfig( fileName ) {
	let mergedConfig = require( '../config/' + fileName );
	mergedConfig = Object.assign( Object.assign( {}, mergedConfig ), getExtensionsConfig( fileName, mergedConfig ) );
	try {
		const localConfig = require( ( 0, path_1.resolve )( packageDirectory + '/config', fileName ) );
		if ( 'function' === typeof localConfig ) {
			mergedConfig = Object.assign( Object.assign( {}, mergedConfig ), localConfig( mergedConfig ) );
		} else {
			mergedConfig = Object.assign( Object.assign( {}, mergedConfig ), localConfig );
		}
	} catch ( e ) {
	}
	return mergedConfig;
}
exports.getConfig = getConfig;
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
function getExtensionsConfig( fileName, defaultConfig ) {
	let mergedConfig = {};
	extensions.forEach( extension => {
		try {
			const extensionConfig = require( extension + '/config/' + fileName );
			if ( 'function' === typeof extensionConfig ) {
				mergedConfig = Object.assign( Object.assign( {}, mergedConfig ), extensionConfig( Object.assign( Object.assign( {}, defaultConfig ), mergedConfig ) ) );
			} else {
				mergedConfig = Object.assign( Object.assign( {}, mergedConfig ), extensionConfig );
			}
		} catch ( e ) {
		}
	} );
	return mergedConfig;
}
exports.getExtensionsConfig = getExtensionsConfig;
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
	const possibles = [
		// Backward compatible for before @lipemat/eslint-config version 3.
		( 0, path_1.resolve )( workingDirectory + '/tsconfig.json' ),
		( 0, path_1.resolve )( packageDirectory + '/tsconfig.json' ),
	].filter( fs_1.existsSync );
	let tsConfig = '';
	possibles.forEach( filePath => {
		tsConfig = filePath;
	} );
	return tsConfig;
}
exports.getTsConfigFile = getTsConfigFile;
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
		return adjustBrowserslist( wp );
	}
	return projectBrowsersList;
}
exports.getBrowsersList = getBrowsersList;
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
const getDefaultBrowsersList = () => {
	if ( browserslist( browserslist.defaults ) === browserslist() ) {
		const wp = [ ...require( '@wordpress/browserslist-config' ) ];
		return adjustBrowserslist( wp );
	}
	return false;
};
exports.getDefaultBrowsersList = getDefaultBrowsersList;
/**
 * Adjust the browserslist to include our defaults.
 *
 * @todo Remove `not op_mini all` after 3/8/2024 if it does not creep back in to the defaults.
 */
function adjustBrowserslist( browserRules ) {
	browserRules.push( 'not op_mini all' );
	return browserRules;
}
exports.adjustBrowserslist = adjustBrowserslist;
