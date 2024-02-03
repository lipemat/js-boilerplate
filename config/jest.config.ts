import path from 'path';
import type {Config} from 'jest';
const {getPackageConfig} = require( '../helpers/package-config' );
import fs from 'fs';

const packageConfig = getPackageConfig();
const babelConfig = require( '../helpers/config' ).getConfig( 'babel.config' );
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
	setupFilesAfterEnv: [
		// @todo Remove old "tests" directory in version 11.
		path.resolve( packageConfig.workingDirectory, 'tests/setup.js' ),
		path.resolve( packageConfig.workingDirectory, 'tests/setup.ts' ),

		// New location.
		path.resolve( packageConfig.workingDirectory, 'jest/setup.ts' ),
	].filter( fs.existsSync ),
};

export default jestConfig;
