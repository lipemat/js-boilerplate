import {execSync} from 'node:child_process';

const FILES = [
	'config/babel.config',
	'config/jest.config',
	'helpers/config',
	'helpers/package-config',
];

console.log( 'Compiling the files from the src directory.' );
execSync( 'tsc -p src', {stdio: 'inherit'} );

FILES.forEach( file => {
	const destination = `${file}`;
	console.log( `Reformatting ${destination}.js with ESLint.` );
	execSync( `eslint ${destination}* --fix`, {stdio: 'inherit'} );
} );
