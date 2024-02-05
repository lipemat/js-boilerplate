import chokidar from 'chokidar';
import {exec} from 'child_process';

/**
 * Watch for changes in the src directory and run the build script when a change is detected.
 */
chokidar.watch( 'src', {ignored: /(^|[\/\\])\../} ).on( 'change', path => {
	console.log( `${path} changed` );
	exec( 'yarn run build', ( err, stdout, stderr ) => {
		if ( err || stderr !== '' ) {
			throw err || stderr;
		}
		console.log( stdout );
	} );
} );
