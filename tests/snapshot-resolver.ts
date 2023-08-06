const {dirname, basename} = require( 'path' );

/**
 * Custom module resolver for Jest snapshots.
 *
 * This is needed because the snapshots contain references to the current path.
 * Hash the file names based on the path of the project.
 *
 * If we try to name the snapshot files with the hash, we get "snapshot obsolete"
 * errors when running. Instead, we use this custom resolver to change the path to
 * the snapshots.
 *
 * @version 1.0.0
 *
 * @see jest.config.js
 *
 * @link https://brunoscheufler.com/blog/2020-03-08-configuring-jest-snapshot-resolvers
 * @link https://jestjs.io/docs/configuration#snapshotresolver-string
 *
 * @note I had to add the '.js' extension to the snapshot file name in order for the
 *       snapshots to not be considered obsolete.
 */


/**
 * Hash the current path to get a unique name for the snapshot.
 *
 * This is needed because the snapshots contain references to the current path.
 * If the package is installed on a different machine or inside a monorepo, the
 * path will change, and the snapshots will fail.
 */
function getCurrentDirectoryHash( dir: string ) {
	return require( 'crypto' ).createHash( 'md5' ).update( dir ).digest( 'hex' );
}


module.exports = {
	/**
	 * Convert the test file path to the path of its snapshot.
	 */
	resolveSnapshotPath: ( testPath, snapshotExtension ) => {
		const hash = getCurrentDirectoryHash( dirname( testPath ) );

		return dirname( testPath ) + '/__snapshots__/' + basename( testPath ) + '.' + hash + snapshotExtension + '.js';
	},

	/**
	 * Convert the path of a snapshot to the path of the original test file.
	 */
	resolveTestPath: ( snapshotFilePath, snapshotExtension ) => {
		const hash = getCurrentDirectoryHash( dirname( snapshotFilePath.replace( '__snapshots__/', '' ) ) );

		let newPath = snapshotFilePath
			.replace( '__snapshots__/', '' )
			.slice( 0, -snapshotExtension.length - 3);
		return newPath.replace( '.' + hash, '' );
	},

	/**
	 * Test to make sure the resolves are mapping back and forth correctly.
	 */
	testPathForConsistencyCheck: 'some/__tests__/example.test.js',
}
