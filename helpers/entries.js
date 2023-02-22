const config = require( './package-config' );
const fs = require( 'fs' );
const path = require( 'path' );
const {getConfig} = require( './config' );

const entries = getConfig( 'entries.config.js' );


/**
 * Entry points to be loaded by Webpack.
 *
 * Checks for sources in the order they are defined and creates a
 * single entry per key if a source file exists.
 *
 * @see entries.config.js
 */
function getEntries() {
	const matches = {};
	Object.keys( entries ).forEach( name => {
		entries[ name ].some( possibleFile => {
			const filePath = config.workingDirectory + '/src/' + possibleFile;
			if ( fs.existsSync( path.resolve( filePath ) ) ) {
				matches[ name ] = path.resolve( filePath );
				return true;
			}
			return false;
		} );
	} );
	return matches;
}

module.exports = {
	getEntries,
};
