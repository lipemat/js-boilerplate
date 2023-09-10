import path from 'path';
import fs from 'fs';

const packageConfig = require( '../helpers/package-config' );

const possibleConfig = [
	// @todo Remove pulling from the root on next major release.
	path.resolve( packageConfig.workingDirectory + '/jest.config.js' ),

	// New location.
	path.resolve( packageConfig.workingDirectory + '/jest/jest.config.js' ),
	path.resolve( packageConfig.workingDirectory + '/jest/jest.config.ts' ),
].filter( fs.existsSync );

if ( possibleConfig.length < 1 ) {
	throw new Error( 'You must have a `jest.config.[tj]s` file in the root of your project or in the `jest` folder.' );
} else {
	const file = possibleConfig.shift();
	if ( undefined !== file ) {
		process.argv.push( '--config', file );
	}
}

require( 'jest-cli/bin/jest' );
