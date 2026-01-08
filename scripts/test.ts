const {resolve: pathResolve} = require( 'path' );
const {existsSync} = require( 'fs' );

const {getPackageConfig} = require( '@lipemat/js-boilerplate-shared' );

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

require( 'jest-cli/bin/jest' );
