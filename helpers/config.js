const packageConfig = require( './package-config' );
const path = require( 'path' );

const extensions = Object.keys( packageConfig.dependencies ).filter( name => name.includes( 'js-boilerplate-' ) );

/**
 * Check to see if a local config file exists.
 *
 * @param {String} $fileName
 * @param {boolean} $inRoot - Look in the root their project directory instead of their /config directory
 *
 * @returns {boolean}
 */
function hasLocalOverride( $fileName, $inRoot = false ) {
	let hasLocal = false;
	try {
		if ( $inRoot ) {
			require( path.resolve( packageConfig.workingDirectory, $fileName ) );
			hasLocal = true;
		} else {
			require( path.resolve( packageConfig.workingDirectory + '/config' ) );
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
 * @param {String} $fileName
 *
 * @returns {object}
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
 * @param {String} $fileName
 *
 * @returns {object}
 */
function getExtensionsConfig( $fileName ) {
	let config = {};
	extensions.map( extension => {
		try {
			const extensionConfig = require( extension + '/config/' + $fileName );
			config = {...config, ...extensionConfig};
		} catch ( e ) {
		}
	} );

	return config;
}

module.exports = {
	getConfig: getConfig,
	getExtensionsConfig: getExtensionsConfig,
	hasLocalOverride: hasLocalOverride
};
