/**
 * UGH! Currently Jest does not have a proper public api for calling so we have
 * to have configuration files in the root of the project and call `jest`.
 *
 * We pull what we need from the library in this way.
 *
 * @notice may become available later https://github.com/facebook/jest/pull/7696
 *
 * @type {{transform, testURL, moduleNameMapper, setupFilesAfterEnv, verbose}|*}
 */
let config = require( './node_modules/lipemat-js-boilerplate/tests/jest.config' );

module.exports = config;
