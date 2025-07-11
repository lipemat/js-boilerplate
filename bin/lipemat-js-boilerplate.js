#!/usr/bin/env node
'use strict';

const spawn = require( 'cross-spawn' );
const args = process.argv.slice( 2 );

const scriptIndex = args.findIndex(
	x => 'browserslist' === x || 'start' === x || 'dist' === x || 'test' === x || 'lint' === x || 'fix-pnp' === x,
);
let script = -1 === scriptIndex ? args[ 0 ] : args[ scriptIndex ];
const nodeArgs = scriptIndex > 0 ? args.slice( 0, scriptIndex ) : [];


const TS_CONVERTED_SCRIPTS = [
	'analyze',
	'dist',
	'test',
	'lint',
	'validate-css-modules',
];

switch ( script ) {
	case 'analyze':
	case 'browserslist':
	case 'dist':
	case 'fix-pnp':
	case 'lint':
	case 'start':
	case 'test':
	case 'validate-css-modules': {
		// If the ts-node command is not available, install it globally.
		if ( spawn.sync( 'ts-node', [ '-v' ] ).error ) {
			console.log( 'Installing ts-node globally.' );
			spawn.sync( 'npm', [ 'install', '-g', 'ts-node' ] );
		}

		if ( TS_CONVERTED_SCRIPTS.includes( script ) ) {
			script = script + '.ts';
		}

		// Run the script.
		const result = spawn.sync(
			'ts-node',
			nodeArgs
				.concat( require.resolve( '../scripts/' + script ) )
				.concat( args.slice( scriptIndex + 1 ) ),
			{stdio: 'inherit'}
		);
		if ( result.error ) {
			console.log( result.error );
			process.exit( 1 );
		}
		if ( result.signal ) {
			if ( 'SIGKILL' === result.signal ) {
				console.log(
					'The build failed because the process exited too early. ' +
					'This probably means the system ran out of memory or someone called ' +
					'`kill -9` on the process.',
				);
			} else if ( 'SIGTERM' === result.signal ) {
				console.log(
					'The build failed because the process exited too early. ' +
					'Someone might have called `kill` or `killall`, or the system could ' +
					'be shutting down.',
				);
			}
			process.exit( 1 );
		}
		process.exit( result.status );
		break;
	}
	default:
		console.log( 'Unknown script "' + script + '".' );
		console.log( 'Perhaps you need to update @lipemat/js-boilerplate?' );
		break;
}
