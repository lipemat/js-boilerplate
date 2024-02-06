import {execSync} from 'node:child_process';
import chalk from 'chalk';

console.log( chalk.blue( '[TS] ' ) + ' Compiling the files using the tsconfig.json in the src directory.' );

execSync( 'tsc -p src', {stdio: 'inherit'} );

console.log( chalk.blueBright( '[TS] ' ) + ' Finished compiling the files.' );
