/**
 * Get all configurations for package.json of the project running this.
 */
const path = require( 'path' );
const fs = require( 'fs' );
const workingDirectory = fs.realpathSync( process.cwd() );

let packageConfig = require( path.resolve( workingDirectory, 'package.json' ) );
packageConfig.es6Modules ||= [];
// Path of the package.json file (root).
packageConfig.packageDirectory = workingDirectory;
packageConfig.themeUrlPath ||= '/';
packageConfig.url ||= 'http://localhost';
// Path of JS application files.
packageConfig.workingDirectory = packageConfig.jsPath ? path.resolve( packageConfig.jsPath ) : workingDirectory;
packageConfig.shortCssClasses ||= false;

try {
	const localConfig = require( path.resolve( workingDirectory, './local-config.json' ) );
	packageConfig = {...packageConfig, ...localConfig};
} catch ( e ) {
}

module.exports = packageConfig;
