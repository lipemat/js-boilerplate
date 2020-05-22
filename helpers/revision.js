const fs = require( 'fs' );
const path = require( 'path' );
const packageConfig = require( '../helpers/package-config' );

/**
 * Bump the .revision file to the current timestamp.
 *
 * Useful when PWA is active because Chrome will get the old service worker
 * cached resources unless we bump the revision.
 * Also helps with sha integrity issues on developing locally.
 *
 * If not using PWA and using another form of .revision generation such as
 * Beanstalk or a deploy script, it's probably better to disable this so you
 * can match the git hash to the .revision file.
 *
 * May be enabled by adding "regenerate_revision":true to your package.json.
 */
function updateRevisionFile() {
	if ( packageConfig.regenerate_revision && packageConfig.root ) {
		fs.writeFile( path.resolve( packageConfig.root, '.revision' ), Date.now(), err => {
			if ( err ) {
				throw err;
			}
			console.log( '\n', 'Generated .revision file', '\n' );
		} );
	}
}

module.exports = {
	updateRevisionFile
}
