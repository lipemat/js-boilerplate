import {renameSync} from 'node:fs';
import {execSync} from 'node:child_process';

/**
 * Running tsc will always create the "helpers" and "src" directories because
 * we import from TS in helpers when we compile the "src" files.
 *
 * To put the files in the correct locations we run the following process:
 * - Compile the files into a temp node_modules directory.
 * - Move the files from the temp node_modules directory to the config directory.
 * - Reformat the files using eslint.
 */


const FILES = [
	'config/babel.config',
	'config/jest.config',
	'helpers/config',
	'helpers/package-config',
];

console.log( 'Compiling the files from the src directory into \'node_modules/\@_js-boilerplate\'.' );
execSync( 'tsc -p src', {stdio: 'inherit'} );

FILES.forEach( file => {
	const source = `node_modules/\@_js-boilerplate/${file}`;
	const destination = `${file}`;

	console.log( `Moving '${source}' to '${destination}'` );
	renameSync( `${source}.js`, `${destination}.js` );
	renameSync( `${source}.d.ts`, `${destination}.d.ts` );

	console.log( `Reformatting ${destination}.js with ESLint.` );
	execSync( `eslint ${destination}* --fix`, {stdio: 'inherit'} );
} );
