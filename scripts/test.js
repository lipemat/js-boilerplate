let jestConfig = require('../config/jest.config' );
const config = require( '../helpers/package-config' );

let jest = require( 'jest' );

jest.runCLI( jestConfig, [config.workingDirectory] );
