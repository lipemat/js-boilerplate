const {ESLint} = require( 'eslint' );
const packageConfig = require( '../helpers/package-config' );

/**
 * Use the public API to run the eslint commands.
 *
 * @link https://eslint.org/docs/developer-guide/nodejs-api
 */
( async function main() {
	// 1. Create an instance with the `fix` option.
	const eslint = new ESLint( {
		fix: true,
	} );

	// 2. Lint files. This doesn't modify target files.
	const results = await eslint.lintFiles( [
		packageConfig.workingDirectory + '/src/**/*.{js,jsx,ts,tsx}',
	] );

	// 3. Modify the files with the fixed code.
	await ESLint.outputFixes( results );

	// 4. Format the results.
	const formatter = await eslint.loadFormatter( 'stylish' );
	const resultText = formatter.format( results );

	// 5. Output it.
	console.log( resultText );
}() ).catch( error => {
	process.exitCode = 1;
	console.error( error );
} );
