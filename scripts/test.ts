import {resolve as pathResolve} from 'path';
import {existsSync} from 'fs';

import {getPackageConfig} from '@lipemat/js-boilerplate-shared';
import {run} from 'jest-cli';

const packageConfig = getPackageConfig();

const possibleConfig = [
	pathResolve( packageConfig.workingDirectory + '/jest/jest.config.ts' ),
	pathResolve( packageConfig.workingDirectory + '/jest/jest.config.js' ),
].filter( existsSync );

if ( possibleConfig.length < 1 ) {
	throw new Error( 'You must have a `jest.config.[tj]s` file in the root of your project or in the `jest` folder.' );
} else {
	const file = possibleConfig.shift();
	if ( undefined !== file ) {
		process.argv.push( '--config', file );
	}
}

run()
