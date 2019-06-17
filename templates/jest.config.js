/**
 * UGH! Currently Jest does not have a proper public api for calling so we have
 * to have configuration files in the root of the project and call `jest`.
 *
 * We pull what we need from the library in this way.
 *
 * @notice may become available later https://www.npmjs.com/package/@jest/core
 *
 * @notice This may also be adjusted per project this way directly in this file. :)
 *
 */
let config = require( '@lipemat/js-boilerplate/config/jest.config' );

module.exports = config;
