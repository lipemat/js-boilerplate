const path = require( 'path' );
const config = require( '../helpers/package-config' );

module.exports = {
	verbose: true,
	babelrc: true,
	'moduleNameMapper': {
		"^.+\\.pcss$": path.resolve( __dirname, '../tests/mocks/style-mock.js' )
	},
	'transform': {
		"^.+\\.jsx?$": path.resolve( __dirname, '../tests/transformers/babel.transform.js' )
	},
	'setupFilesAfterEnv': [ path.resolve( config.workingDirectory, 'tests/setup.js' ) ]
};
