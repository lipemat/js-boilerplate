const packageConfig = require( './package-config' );
const path = require( 'path' );
const once = require( 'lodash/once' );
const browserslist = require( 'browserslist' );

const extensions = Object.keys( packageConfig.dependencies ).filter( name => name.includes( 'js-boilerplate-' ) );

/**
 * Check to see if a local config file exists.
 *
 * @param {string} fileName
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
 * @param {string} $fileName
 *
 * @return {Object}
 */
function getConfig( $fileName ) {
	let config = {...require( '../config/' + $fileName ), ...getExtensionsConfig( $fileName )};
	try {
		const localConfig = require( path.resolve( packageConfig.packageDirectory + '/config', $fileName ) );
		config = {...config, ...localConfig};
	} catch ( e ) {
	}
	return config;
}

/**
 * Get a config from any existing extension's /config directories
 * merged into one.
 *
 * @param {string} $fileName
 *
 * @return {Object}
 */
function getExtensionsConfig( $fileName ) {
	let config = {};
	extensions.forEach( extension => {
		try {
			const extensionConfig = require( extension + '/config/' + $fileName );
			config = {...config, ...extensionConfig};
		} catch ( e ) {
		}
	} );

	return config;
}

/**
 * If browserslist is not specified, we fallback to WordPress defaults
 * except for IE11 which we don't support by default.
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
		return require( '@wordpress/browserslist-config' );
	}
	return false;
} );


module.exports = {
	getConfig,
	getDefaultBrowsersList,
	getExtensionsConfig,
	hasLocalOverride,
};
