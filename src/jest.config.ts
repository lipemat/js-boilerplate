/**
 * Generated from the `src` directory to compile TS to JS because JEST
 * does not support using TS files as part of the JEST configuration when
 * located in a `node_modules directory.
 *
 */
import {resolve} from 'path';
import type {Config} from 'jest';
import {existsSync} from 'fs';
import packageConfig from '../helpers/package-config';
import {getConfig} from '../helpers/config';


export type JestConfig = Pick<Config, 'globals' | 'moduleNameMapper' | 'roots' | 'testEnvironment' | 'testEnvironmentOptions' | 'transform' | 'transformIgnorePatterns' | 'setupFilesAfterEnv'>;

const {workingDirectory} = packageConfig.getPackageConfig();
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
