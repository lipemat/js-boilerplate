"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generated from the `src` directory to compile TS to JS because JEST
 * does not support using TS files as part of the JEST configuration when
 * located in a `node_modules directory.
 *
 */
const config_1 = require("../helpers/config");
/**
 * Use Babel's preset-env to add support for target browsers.
 *
 * @note Set the `debug` option to `true` to debug the included polyfills and plugins.
 *
 * @see https://babeljs.io/docs/en/babel-preset-env
 */
const presetEnv = {
    bugfixes: true,
    corejs: {
        // Use the core-js version currently installed in the project.
        version: require('core-js/package.json').version,
        proposals: false,
    },
    // Enable the `debug` option to debug the included polyfills and plugins.
    debug: false,
    // Ignore any external browserslist in favor of `getBrowsersList()`.
    ignoreBrowserslistConfig: true,
    shippedProposals: false,
    targets: {
        browsers: (0, config_1.getBrowsersList)(),
    },
    useBuiltIns: 'usage',
};
const babelConfig = {
    cacheDirectory: true,
    presets: [
        ['@babel/preset-env', presetEnv],
        ['@babel/preset-react', {
                development: 'production' !== process.env.NODE_ENV,
                runtime: 'automatic',
            }],
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
    ],
};
exports.default = babelConfig;
module.exports = babelConfig;
