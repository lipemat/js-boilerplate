const areYouES5 = require( 'are-you-es5' );
const regexBuilder = require( 'are-you-es5/dist/babel-loader-regex-builder' );
const config = require( './package-config' );

/**
 * Using `are-you-es5` generate a list of top level dependencies
 * which are not ES5 safe. Create a regular expression which excludes
 * the `node_modules` directory except for any ES6 modules.
 *
 * Allows Babel to transpile any node_modules which are not available in ES5.
 *
 * @notice Only checks packages listed in package.json, not sub packages.
 *
 * @return {RegExp}
 */
function getBabelExcludeRegex() {
	const nonES5 = areYouES5.checkModules( {} );
	// Support specifying additional es5Modules in package.json.
	const regex = regexBuilder.getBabelLoaderIgnoreRegex( [ ...nonES5.es6Modules, ...config.es6Modules ] );

	// We must strip off the leading and trailing '/'.
	return new RegExp( regex.replace( /^\/|\/$/g, '' ) );
}

module.exports = {
	getBabelExcludeRegex,
};
