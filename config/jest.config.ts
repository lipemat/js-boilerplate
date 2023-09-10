import type {Config} from 'jest';
import {resolve} from 'path';
const {getPackageConfig} = require( '../helpers/package-config' );
const {existsSync} = require( 'fs' );
import {getConfig} from '../helpers/config';

const packageConfig = getPackageConfig();
const babelConfig = getConfig( 'babel.config' );
delete babelConfig.cacheDirectory;

let jestConfig: Config = {
	globals: {
		__TEST__: true,
	},
	moduleNameMapper: {
		'\\.(pcss|less|css)$': 'identity-obj-proxy',
		'is-plain-obj': 'identity-obj-proxy',
		uuid: 'identity-obj-proxy',
	},
	roots: [
		'./tests',
	],
	testEnvironment: 'jsdom',
	testEnvironmentOptions: {
		url: packageConfig.url,
	},
	transform: {
		'^.+\\.[tj]sx?$': [ 'babel-jest', babelConfig ],
	},
	setupFilesAfterEnv: [
		// @todo Remove old "tests" directory on next major release.
		resolve( packageConfig.workingDirectory, 'tests/setup.js' ),
		resolve( packageConfig.workingDirectory, 'tests/setup.ts' ),

		// New location.
		resolve( packageConfig.workingDirectory, 'jest/setup.ts' ),
	].filter( existsSync ),
};

/**
 * Never ended up using this.
 *
 * @todo Remove in version 11.
 */
try {
	const localConfig = require( resolve( packageConfig.workingDirectory + '/config', 'jest.config.ts' ) );
	jestConfig = {...jestConfig, ...localConfig};
} catch ( e ) {
}

export default jestConfig;
