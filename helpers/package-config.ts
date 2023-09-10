import {resolve} from 'path';
import {realpathSync} from 'fs';

const workingDirectory = realpathSync( process.cwd() );
let packageConfig = require( resolve( workingDirectory, 'package.json' ) );
packageConfig.brotliFiles ||= false;
packageConfig.es6Modules ||= [];
packageConfig.jsPath ||= '';
// Path of the package.json file (root).
packageConfig.packageDirectory = workingDirectory;
packageConfig.url ||= 'http://localhost';
// Path of JS application files.
packageConfig.workingDirectory = packageConfig.jsPath !== '' ? resolve( packageConfig.jsPath ) : workingDirectory;
packageConfig.shortCssClasses ||= false;

try {
	const localConfig = require( resolve( workingDirectory, './local-config.json' ) );
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
export function getPackageConfig() {
	return packageConfig;
}
packageConfig.getPackageConfig = getPackageConfig;

// Leaving old export structure for backwards compatibility.
// @todo Remove in favor of default export in version 11.
module.exports = packageConfig;
