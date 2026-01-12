import {ESLint} from 'eslint';
import minimist from 'minimist';
import chalk from 'chalk';

import {getPackageConfig} from '@lipemat/js-boilerplate-shared/helpers/package-config.js';

// Command line arguments.
const flags = minimist( process.argv.slice( 2 ) );

/**
 * ESLint does not have a utility method for detecting if
 * any error has occurred, nor does it set the exit code.
 *
 * We can use this function to determine if any error has
 * occurred and set the exit code accordingly.
 */
function errorOccurred( results: ESLint.LintResult[] ): boolean {
	return results.some( result => result.errorCount > 0 || result.warningCount > 0 );
}

/**
 * Use the public API to run the eslint commands.
 *
 * @link https://eslint.org/docs/developer-guide/nodejs-api
 */
( async function main() {
	// 1. Create an instance with the `fix` and `cache` options.
	const eslint = new ESLint( {
		fix: ( flags.fix ?? true ) !== 'false',
		cache: true,
		cacheStrategy: 'content',
	} );

	console.log( chalk.underline( 'Running "js-boilerplate:lint" (eslint) task' ) );

	// 2. Lint files. This doesn't modify target files.
	const results: ESLint.LintResult[] = await eslint.lintFiles( [
		getPackageConfig().workingDirectory + '/src/**/*.{js,jsx,ts,tsx,svelte}',
	] );

	// 3. Modify the files with the fixed code.
	await ESLint.outputFixes( results );

	// 4. Format the results.
	const formatter = await eslint.loadFormatter( 'stylish' );
	const resultText = formatter.format( results );

	// 5. Output it.
	if ( '' === resultText ) {
		console.log( `>> Linted ${results.length} files without errors` );
	} else {
		console.log( resultText );
		if ( errorOccurred( results ) ) {
			process.exitCode = 1;
		}
	}
	console.log( '' );
}() ).catch( error => {
	process.exitCode = 1;
	console.error( error );
} );
