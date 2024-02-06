"use strict";
/**
 * Entry points to be loaded by Webpack.
 *
 * Checks for sources in the order they are defined and creates a
 * single entry per key if a source file exists.
 *
 * @see getEntries
 */
Object.defineProperty(exports, "__esModule", { value: true });
const entries = {
    master: [
        'index.js',
        'index.ts',
        'index.tsx',
    ],
    admin: [
        'admin.js',
        'admin.ts',
        'admin.tsx',
    ],
};
module.exports = entries;
