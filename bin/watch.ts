import chokidar from 'chokidar';
import {exec} from 'child_process';
import {red} from 'chalk';

/**
 * Watch for changes in the src directory and run the build script when a change is detected.
 */
chokidar.watch( 'src', {ignored: /(^|[\/\\])\../} )
	.on( 'change', path => {
		console.log( `${path} changed` );
		exec( 'yarn run build', ( err, stdout ) => {
			if ( err ) {
				console.error( red( stdout ) );
			} else {
				console.log( stdout );
			}
		} );
	} )
	.once( 'ready', () => {
		console.log( 'Watching for changes in the src directory...' );
	} )
