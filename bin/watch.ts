import chokidar from 'chokidar';
import {exec} from 'child_process';
import chalk, {red} from 'chalk';

const toWatch = [
	'config/*.ts',
	'helpers/*.ts',
];

/**
 * Watch for changes in the config or helpers directory and run the build script when a change is detected.
 */
chokidar.watch( toWatch, {ignored: /(^|[\/\\])\../} )
	.on( 'change', path => {
		console.log( chalk.yellowBright( '[watch]' ), `${path} changed` );
		exec( 'yarn run build', ( err, stdout ) => {
			if ( err ) {
				console.error( red( stdout ) );
			} else {
				console.log( stdout );
			}
		} );
	} )
	.once( 'ready', () => {
		console.log( chalk.greenBright( '[watch]' ), 'Watching for changes…' );
	} )
