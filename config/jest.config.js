global.__TEST__ = true;

const path = require( 'path' );
const config = require( '../helpers/package-config' );
const {getConfig} = require( '../helpers/config' );
/**
 * UGH! Currently Jest does not have a proper public api for calling so we have
 * to have configuration files in the root of the project.
 *
 * We pull what we need from the here from that file.
 * Also allows overriding configurations per project, not sure if we actually need that yet?
 *
 * @notice may become available later https://github.com/facebook/jest/pull/7696
 *
 */
let babelConfig = getConfig( 'babel.config' );
delete babelConfig.cacheDirectory;

module.exports = {
	'moduleNameMapper': {
		'\\.(pcss|less|css)$': 'identity-obj-proxy',
	},
	'testURL': 'http://localhost',
	'transform': {
		'^.+\\.[tj]sx?$': [ 'babel-jest', babelConfig ]
	},
	'setupFilesAfterEnv': [ path.resolve( config.workingDirectory, 'tests/setup.js' ) ]
};
