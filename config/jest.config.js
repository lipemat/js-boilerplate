'use strict';
Object.defineProperty( exports, '__esModule', {value: true} );
/**
 * Generated from the `src` directory to compile TS to JS because JEST
 * does not support using TS files as part of the JEST configuration when
 * located in a `node_modules directory.
 *
 */
const path_1 = require( 'path' );
const fs_1 = require( 'fs' );
const package_config_1 = require( '../helpers/package-config' );
const config_1 = require( '../helpers/config' );
const {workingDirectory, url} = ( 0, package_config_1.getPackageConfig )();
const babelConfig = ( 0, config_1.getConfig )( 'babel.config' );
delete babelConfig.cacheDirectory;
const jestConfig = {
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
		( 0, path_1.resolve )( workingDirectory, 'tests/setup.js' ),
		( 0, path_1.resolve )( workingDirectory, 'tests/setup.ts' ),
		// New location.
		( 0, path_1.resolve )( workingDirectory, 'jest/setup.ts' ),
	].filter( fs_1.existsSync ),
};
exports.default = jestConfig;
module.exports = jestConfig;
