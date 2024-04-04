"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBabelExcludeRegex = void 0;
const babel_loader_regex_builder_1 = require("are-you-es5/dist/babel-loader-regex-builder");
const package_config_1 = require("./package-config");
const are_you_es5_1 = require("are-you-es5");
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
    const nonES5 = (0, are_you_es5_1.checkModules)({});
    // Support specifying additional es5Modules in package.json.
    const regex = (0, babel_loader_regex_builder_1.getBabelLoaderIgnoreRegex)([
        ...nonES5.es6Modules,
        ...(0, package_config_1.getPackageConfig)().es6Modules,
    ]);
    // We must strip off the leading and trailing '/'.
    return new RegExp(regex.replace(/^\/|\/$/g, ''));
}
exports.getBabelExcludeRegex = getBabelExcludeRegex;
