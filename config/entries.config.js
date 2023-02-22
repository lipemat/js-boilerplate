/**
 * Entry points to be loaded by Webpack.
 *
 * Checks for sources in the order they are defined and creates a
 * single entry per key if a source file exists.
 *
 * @see getEntries
 */
module.exports = {
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
