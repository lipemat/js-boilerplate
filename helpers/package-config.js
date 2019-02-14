/**
 * Get all configurations for package.json of the project running this.
 *
 * @type {any}
 */
const path = require( 'path' );
const fs = require( 'fs' );
const workingDirectory = fs.realpathSync( process.cwd() );

let packageConfig = require( path.resolve( workingDirectory, 'package.json' ) );
packageConfig.workingDirectory = workingDirectory;

try {
	let localConfig = require( path.resolve( workingDirectory, './local-config.json' ) );
	for ( let attr in localConfig ) {
		packageConfig[ attr ] = localConfig[ attr ];
	}
} catch ( e ) {
}

module.exports = packageConfig;
