"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntries = void 0;
const config_1 = require("./config");
const package_config_1 = require("./package-config");
const fs_1 = require("fs");
const path_1 = require("path");
const entries = (0, config_1.getConfig)('entries.config');
/**
 * Entry points to be loaded by Webpack.
 *
 * Checks for sources in the order they are defined and creates a
 * single entry per key if a source file exists.
 *
 * @see entries.config.js
 */
function getEntries() {
    const matches = {};
    Object.keys(entries).forEach(name => {
        entries[name].some(possibleFile => {
            const filePath = (0, package_config_1.getPackageConfig)().workingDirectory + '/src/' + possibleFile;
            if ((0, fs_1.existsSync)((0, path_1.resolve)(filePath))) {
                matches[name] = (0, path_1.resolve)(filePath);
                return true;
            }
            return false;
        });
    });
    return matches;
}
exports.getEntries = getEntries;
