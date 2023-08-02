const packageConfig = require( './package-config' );
const path = require( 'path' );
const once = require( 'lodash/once' );
const browserslist = require( 'browserslist' );
const fs = require( 'fs' );
const config = require( './package-config' );

const extensions = [
	...Object.keys( packageConfig.dependencies ?? {} ).filter( name => name.includes( 'js-boilerplate-' ) ),
	...Object.keys( packageConfig.devDependencies ?? {} ).filter( name => name.includes( 'js-boilerplate-' ) ),
];

/**
 * Check to see if a local config file exists.
 *
 * @param {string}  fileName
 * @param {boolean} inWorkingDirectory - Look in working directory instead of their /config directory
 *
 * @return {boolean}
 */
function hasLocalOverride( fileName, inWorkingDirectory = false, ) {
	let hasLocal = false;
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
function getConfig( fileName ) {
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
function getExtensionsConfig( fileName, defaultConfig ) {
	let mergedConfig = {};
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
	const possibles = [
		// Backward compatible for before @lipemat/eslint-config version 3.
		path.resolve( config.workingDirectory + '/tsconfig.json' ),
		path.resolve( config.packageDirectory + '/tsconfig.json' ),
	];
	let tsConfig = '';
	possibles.forEach( filePath => {
		if ( fs.existsSync( filePath ) ) {
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
		return require( '@wordpress/browserslist-config' );
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
const getDefaultBrowsersList = once( () => {
	if ( browserslist( browserslist.defaults ) === browserslist() ) {
		return require( '@wordpress/browserslist-config' );
	}
	return false;
} );


module.exports = {
	getBrowsersList,
	getConfig,
	getDefaultBrowsersList,
	getExtensionsConfig,
	getTsConfigFile,
	hasLocalOverride,
};
