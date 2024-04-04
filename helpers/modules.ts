import {getBabelLoaderIgnoreRegex} from 'are-you-es5/dist/babel-loader-regex-builder';
import {getPackageConfig} from './package-config';
import {checkModules} from 'are-you-es5';

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
export function getBabelExcludeRegex(): RegExp {
	const nonES5 = checkModules( {} );
	// Support specifying additional es5Modules in package.json.
	const regex = getBabelLoaderIgnoreRegex( [
		...nonES5.es6Modules,
		...getPackageConfig().es6Modules,
	] );

	// We must strip off the leading and trailing '/'.
	return new RegExp( regex.replace( /^\/|\/$/g, '' ) );
}
