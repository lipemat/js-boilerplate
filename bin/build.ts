import {execSync} from 'node:child_process';
import {ESLint} from 'eslint';
import chalk from 'chalk';

const FILES = [
	'config/babel.config',
	'config/jest.config',
	'helpers/config',
	'helpers/package-config',
];

console.log( chalk.blue( '[TS] ' ) + ' Compiling the files from the src directory.' );
execSync( 'tsc -p src', {stdio: 'inherit'} );

FILES.forEach( async file => {
	const destination = `${file}`;
	console.log( chalk.blueBright( '[ESLint] ' ) + `Reformatting ${destination}.js.` );

	// 1. Create an instance with the `fix` and `cache` options.
	const eslint = new ESLint( {
		fix: true,
		cache: true,
		cacheStrategy: 'content',
	} );

	// 2. Lint files. This doesn't modify target files.
	const results: ESLint.LintResult[] = await eslint.lintFiles( [
		file + '*.{js,jsx,ts,tsx}',
	] );

	// 3. Modify the files with the fixed code.
	await ESLint.outputFixes( results );
} );
