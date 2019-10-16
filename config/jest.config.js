// So we have something to check against for adjusting things like babel.config.js.
global.__TEST__ = true;

const path = require( 'path' );
const packageConfig = require( '../helpers/package-config' );

let babelConfig = require( '../helpers/config' ).getConfig( 'babel.config' );
delete babelConfig.cacheDirectory;

let jestConfig = {
	'moduleNameMapper': {
		'\\.(pcss|less|css)$': 'identity-obj-proxy'
	},
	'testURL': 'http://localhost',
	'transform': {
		'^.+\\.[tj]sx?$': [ 'babel-jest', babelConfig ]
	},
	'setupFilesAfterEnv': [ path.resolve( packageConfig.workingDirectory, 'tests/setup.js' ) ]
};

/**
 * Allows overriding configurations in the project `/config/jest.config.js` file.
 * We don't actually need to do this because `jest.config.js` in the project root
 * is already an override of this file but we support it anyway to keep things consistent.
 */
try {
	let localConfig = require( path.resolve( packageConfig.workingDirectory + '/config', 'jest.config.js' ) );
	jestConfig = {...jestConfig, ...localConfig};
} catch ( e ) {
}

module.exports = jestConfig;
