'use strict';
Object.defineProperty( exports, '__esModule', {value: true} );
exports.getPackageConfig = void 0;
const path_1 = require( 'path' );
const node_fs_1 = require( 'node:fs' );
const workingDirectory = ( 0, node_fs_1.realpathSync )( process.cwd() );
const defaults = {
	brotliFiles: false,
	es6Modules: [],
	jsPath: '',
	packageDirectory: workingDirectory,
	url: 'http://localhost',
	shortCssClasses: false,
	cssTsFiles: false,
};
let packageConfig = require( ( 0, path_1.resolve )( workingDirectory, 'package.json' ) );
packageConfig = Object.assign( Object.assign( {}, defaults ), packageConfig );
packageConfig.workingDirectory = packageConfig.jsPath !== '' ? ( 0, path_1.resolve )( packageConfig.jsPath ) : workingDirectory;
try {
	const localConfig = require( ( 0, path_1.resolve )( workingDirectory, './local-config.json' ) );
	packageConfig = Object.assign( Object.assign( {}, packageConfig ), localConfig );
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
exports.getPackageConfig = getPackageConfig;
packageConfig.getPackageConfig = getPackageConfig;
packageConfig.default = packageConfig;
module.exports = packageConfig;
