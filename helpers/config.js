const packageConfig = require( './package-config' );
const path = require( 'path' );
const without = require( 'lodash/without' );
const once = require( 'lodash/once' );
const browserslist = require( 'browserslist' );

const extensions = Object.keys( packageConfig.dependencies ).filter( name => name.includes( 'js-boilerplate-' ) );

/**
 * Check to see if a local config file exists.
 *
 * @param {string} $fileName
 * @param {boolean} $inRoot - Look in the root their project directory instead of their /config directory
 *
 * @return {boolean}
 */
function hasLocalOverride( $fileName, $inRoot = false ) {
	let hasLocal = false;
	try {
		if ( $inRoot ) {
			require( path.resolve( packageConfig.workingDirectory, $fileName ) );
			hasLocal = true;
		} else {
			require( path.resolve( packageConfig.workingDirectory + '/config', $fileName ) );
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
		const localConfig = require( path.resolve( packageConfig.workingDirectory + '/config', $fileName ) );
		config = {...config, ...localConfig};
	} catch ( e ) {
	}
	return config;
}

/**
 * Get a config from any existing extension's /config directory's
 * merged together into one.
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
 * @return {false | string[]}
 */
const getDefaultBrowsersList = once( () => {
	if ( browserslist( browserslist.defaults ) === browserslist() ) {
		const browsers = require( '@wordpress/browserslist-config' );
		browsers.push( 'not IE 11' );
		return without( browsers, 'ie >= 11' );
	}
	return false;
} );


module.exports = {
	getConfig,
	getDefaultBrowsersList,
	getExtensionsConfig,
	hasLocalOverride,
};
