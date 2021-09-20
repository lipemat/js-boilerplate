/**
 * Get all configurations for package.json of the project running this.
 */
const path = require( 'path' );
const fs = require( 'fs' );
const workingDirectory = fs.realpathSync( process.cwd() );

let packageConfig = require( path.resolve( workingDirectory, 'package.json' ) );
packageConfig.workingDirectory = packageConfig.jsDirectory ? path.resolve( packageConfig.jsDirectory ) : workingDirectory;
packageConfig.themeUrlPath = packageConfig.themeUrlPath || '/';
packageConfig.url = packageConfig.url || 'http://localhost';
packageConfig.root = packageConfig.root || './';
packageConfig.regenerate_revision = packageConfig.regenerate_revision || false;
packageConfig.es6Modules = packageConfig.es6Modules || [];

try {
	const localConfig = require( path.resolve( workingDirectory, './local-config.json' ) );
	packageConfig = {...packageConfig, ...localConfig};
} catch ( e ) {
}

module.exports = packageConfig;
