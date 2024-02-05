const path = require( 'path' );
const fs = require( 'fs' );

const workingDirectory = fs.realpathSync( process.cwd() );
let packageConfig = require( path.resolve( workingDirectory, 'package.json' ) );
packageConfig.brotliFiles ||= false;
packageConfig.es6Modules ||= [];
packageConfig.jsPath ||= '';
// Path of the package.json file (root).
packageConfig.packageDirectory = workingDirectory;
packageConfig.url ||= 'http://localhost';
// Path of JS application files.
packageConfig.workingDirectory = packageConfig.jsPath !== '' ? path.resolve( packageConfig.jsPath ) : workingDirectory;
packageConfig.shortCssClasses ||= false;
packageConfig.tsCssModules ||= false;

try {
	const localConfig = require( path.resolve( workingDirectory, './local-config.json' ) );
	packageConfig = {...packageConfig, ...localConfig};
} catch ( e ) {
}

/**
 * Helper function to get the results of `packageConfig`.
 *
 * - Allows mocking the results of `packageConfig` for testing.
 * - Allows getting the config through a callback instead of an import.
 *
 * @since 10.3.0
 */
function getPackageConfig() {
	return packageConfig;
}
packageConfig.getPackageConfig = getPackageConfig;
packageConfig.default = packageConfig;

module.exports = packageConfig;
