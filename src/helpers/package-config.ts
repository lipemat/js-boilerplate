import {resolve} from 'path';
import {realpathSync} from 'node:fs';

export interface PackageConfig {
	author?: string;
	brotliFiles: boolean;
	certificates?: Certificates;
	combinedJson: boolean;
	cssTsFiles: boolean;
	css_folder: string;
	default: PackageConfig;
	dependencies: Dependencies;
	description?: string;
	devDependencies: Dependencies;
	es6Modules?: string[];
	getPackageConfig: () => PackageConfig;
	jsPath: string;
	license?: string;
	name?: string;
	packageDirectory: string;
	packageManager?: string;
	resolutions?: Dependencies;
	scripts: Partial<Scripts>;
	shortCssClasses: boolean;
	url: string;
	version?: string;
	workingDirectory: string;
}

export interface Dependencies {
	[ name: string ]: string;
}

export interface Certificates {
	cert: string;
	key: string;
}

export interface Scripts {
	browserslist: string;
	dist: string;
	lint: string;
	postinstall: string;
	start: string;
	test: string;
}


const workingDirectory = realpathSync( process.cwd() );

const defaults: Partial<PackageConfig> = {
	brotliFiles: false,
	es6Modules: [],
	jsPath: '',
	packageDirectory: workingDirectory,
	url: 'http://localhost',
	shortCssClasses: false,
	cssTsFiles: false,
}

let packageConfig: PackageConfig = require( resolve( workingDirectory, 'package.json' ) );
packageConfig = {...defaults, ...packageConfig};
packageConfig.workingDirectory = packageConfig.jsPath !== '' ? resolve( packageConfig.jsPath ) : workingDirectory;

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

packageConfig.default = packageConfig;
module.exports = packageConfig;
