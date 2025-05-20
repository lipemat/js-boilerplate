import {resolve} from 'path';
import type {Config} from 'jest';
import {existsSync} from 'fs';
import {getPackageConfig} from '../helpers/package-config';
import {getConfig} from '../helpers/config';


export type JestConfig = Pick<Config, 'globals' | 'moduleNameMapper' | 'roots' | 'testEnvironment' | 'testEnvironmentOptions' | 'transform' | 'transformIgnorePatterns' | 'setupFilesAfterEnv'>;

const {workingDirectory, url} = getPackageConfig();
const babelConfig = getConfig( 'babel.config' );
delete babelConfig.cacheDirectory;


const jestConfig: Config = {
	globals: {
		__TEST__: true,
	},
	moduleNameMapper: {
		'\\.(pcss|less|css)$': 'identity-obj-proxy',
		'is-plain-obj': 'identity-obj-proxy',
		uuid: 'identity-obj-proxy',
	},
	// Does not support prettier 3 until version 30.
	// @link https://github.com/jestjs/jest/issues/14305
	prettierPath: null,
	roots: [
		'./tests',
	],
	testEnvironment: 'jsdom',
	testEnvironmentOptions: {
		url,
	},
	transform: {
		'^.+\\.[tj]sx?$': [ 'babel-jest', babelConfig ],
	},
	transformIgnorePatterns: [
		'node_modules/(?!@lipemat)',
	],
	setupFilesAfterEnv: [
		// @todo Remove old "tests" directory in version 11.
		resolve( workingDirectory, 'tests/setup.js' ),
		resolve( workingDirectory, 'tests/setup.ts' ),
		// New location.
		resolve( workingDirectory, 'jest/setup.ts' ),
	].filter( existsSync ),
};

export default jestConfig;
module.exports = jestConfig;
