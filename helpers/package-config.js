/**
 * Get all configurations for package.json of the project running this.
 */
const path = require( 'path' );
const fs = require( 'fs' );
const workingDirectory = fs.realpathSync( process.cwd() );

let packageConfig = require( path.resolve( workingDirectory, 'package.json' ) );
packageConfig.dependencies = packageConfig.dependencies || {};
packageConfig.workingDirectory = workingDirectory;
packageConfig.theme_path = packageConfig.theme_path || '/';
packageConfig.url = packageConfig.url || 'https://localhost';
packageConfig.root = packageConfig.root || './';
packageConfig.regenerate_revision = packageConfig.regenerate_revision || false;

try {
	const localConfig = require( path.resolve( workingDirectory, './local-config.json' ) );
	packageConfig = { ...packageConfig, ...localConfig }
} catch ( e ) {
}

module.exports = packageConfig;
