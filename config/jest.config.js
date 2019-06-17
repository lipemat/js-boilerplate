const path = require( 'path' );
const config = require( '../helpers/package-config' );
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
module.exports = {
	'moduleNameMapper': {
		"^.+\.pcss$": path.resolve( __dirname, '../tests/mocks/style-mock.js' )
	},
	'testURL': 'http://localhost',
	'transform': {
		"^.+\\.jsx?$": path.resolve( __dirname, '../tests/transformers/babel.transform.js' )
	},
	'setupFilesAfterEnv': [ path.resolve( config.workingDirectory, 'tests/setup.js' ) ]
};
