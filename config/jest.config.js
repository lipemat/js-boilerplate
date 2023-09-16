const path = require( 'path' );
const packageConfig = require( '../helpers/package-config' );
const fs = require( 'fs' );

const babelConfig = require( '../helpers/config' ).getConfig( 'babel.config' );
delete babelConfig.cacheDirectory;

/**
 * @todo Rename this file to `jest.config.ts` in version 11.
 *
 */

let jestConfig = {
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

/**
 * Allows overriding configurations in the project `/config/jest.config.js` file.
 * We don't actually need to do this because `jest.config.js` in the project root
 * is already an override of this file, but we support it anyway to keep things consistent.
 *
 * @todo Remove in version 11.
 */
try {
	const localConfig = require( path.resolve( packageConfig.workingDirectory + '/config', 'jest.config.js' ) );
	jestConfig = {...jestConfig, ...localConfig};
} catch ( e ) {
}

module.exports = jestConfig;
