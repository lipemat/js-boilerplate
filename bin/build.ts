import {execSync} from 'node:child_process';
import chalk from 'chalk';

console.debug( chalk.blue( '[TS] ' ) + ' Compiling TS to JS using the tsconfig.json in the src directory.' );

execSync( 'tsc -p src', {stdio: 'inherit'} );

console.debug( chalk.blueBright( '[TS] ' ) + ' Finished compiling the files.' );

export {}
