/**
 * Runs `jest` with any arguments passed via the terminal or yarn.
 *
 * @notice you must add `/templates/jest.config.js` to the `jsPath` of your project.
 *
 * @example `lipemat-js-boilerplate test`
 */

const packageConfig = require( '../helpers/package-config' );
process.argv.push( '--config', packageConfig.workingDirectory + '/jest.config.js' );

require( 'jest-cli/bin/jest' );
