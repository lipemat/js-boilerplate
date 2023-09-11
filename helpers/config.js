const packageConfig = require( './package-config' );
const path = require( 'path' );
const fs = require( 'fs' );
const once = require( 'lodash/once' );
const browserslist = require( 'browserslist' );

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
function hasLocalOverride( fileName, inWorkingDirectory = false ) {
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
	let config = require( '../config/' + fileName );
	config = {...config, ...getExtensionsConfig( fileName, config )};
	try {
		const localConfig = require( path.resolve( packageConfig.packageDirectory + '/config', fileName ) );
		if ( 'function' === typeof localConfig ) {
			config = {...config, ...localConfig( config )};
		} else {
			config = {...config, ...localConfig};
		}
	} catch ( e ) {
	}
	return config;
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
	let config = {};
	extensions.forEach( extension => {
		try {
			const extensionConfig = require( extension + '/config/' + fileName );
			if ( 'function' === typeof extensionConfig ) {
				config = {...config, ...extensionConfig( {...defaultConfig, ...config} )};
			} else {
				config = {...config, ...extensionConfig};
			}
		} catch ( e ) {
		}
	} );

	return config;
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
		path.resolve( packageConfig.workingDirectory + '/tsconfig.json' ),
		path.resolve( packageConfig.packageDirectory + '/tsconfig.json' ),
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
 * If browserslist is not specified, we fall back to WordPress defaults
 * except for > 1% we don't support by default.
 *
 * Return false if a browserslist is specified in the current project.
 *
 * @link https://github.com/browserslist/browserslist#config-file
 *
 * @return {boolean | string[]}
 */
const getDefaultBrowsersList = once( () => {
	// JEST requires the default browsers list for JSDOM to work.
	if ( typeof global.__TEST__ !== 'undefined' && global.__TEST__ ) {
		return false;
	}

	if ( browserslist( browserslist.defaults ) === browserslist() ) {
		return require( '@wordpress/browserslist-config' ).map( range => {
			// Swap out "> 1%" for "> 2%".
			return '> 1%' === range ? '> 2%' : range;
		} );
	}
	return false;
} );


module.exports = {
	getConfig,
	getDefaultBrowsersList,
	getExtensionsConfig,
	hasLocalOverride,
	getTsConfigFile,
};
