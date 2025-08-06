import * as fs from 'fs';
import {sync} from 'glob';
import {basename, join, resolve} from 'path';
import {type LoaderContext} from 'webpack';
// @ts-expect-error TS5097: An import path can only end with a .ts extension when allowImportingTsExtensions is enabled.
import createCssModuleTypings from '../../../lib/css-module-types.ts';
import compileWithWebpack from '../../helpers/compileWithWebpack';
import {getPackageConfig, type PackageConfig} from '../../../helpers/package-config';


// Change the result of the getPackageConfig function, so we can change anything.
jest.mock( '../../../helpers/package-config.js', () => {
	const mockPackageConfig: Partial<PackageConfig> = {}

	return {
		...jest.requireActual( '../../../helpers/package-config.js' ),
		getPackageConfig: () => ( {
			...jest.requireActual( '../../../helpers/package-config.js' ),
			...mockPackageConfig,
			change: ( changes: Partial<PackageConfig> ) => {
				Object.assign( mockPackageConfig, changes );
			},
		} ),
	}
} );


jest.mock( 'fs', () => {
	const actualFs = jest.requireActual( 'fs' );
	return {
		...actualFs,
		writeFileSync: jest.fn(),
	};
} );


const mockAsyncFunction = jest.fn().mockReturnValue( () => {
} );

// @ts-expect-error TS2345: Argument of type 'Record<string, never>' is not assignable to a parameter of type 'LoaderContext<{}>'.
const mockLoaderContext: LoaderContext<Record<string, never>> = {
	callback: jest.fn().mockReturnValue( () => {
	} ),
	async: () => mockAsyncFunction,
	emitError: jest.fn(),
};

describe( 'Format CSS Module Typings', () => {
	beforeEach( () => {
		jest.clearAllMocks();
		// @ts-expect-error TS2339: Property change does not exist on type PackageConfig
		getPackageConfig().change( {cssTsFiles: true} );
	} );

	test.each( sync( 'jest/fixtures/postcss-modules/raw/*.pcss' ).map( pcssFile => {
		const filename = basename( pcssFile );
		const cleanFile = join( 'jest/fixtures/postcss-modules/results', filename.replace( /\.pcss$/, '.pcss.d.ts' ) );

		return {
			description: `Formats CSS types for ${filename}`,
			pcssFile,
			cleanFile,
		};
	} ) )( '$description', async ( {pcssFile, cleanFile} ) => {
		const expectedContent = fs.readFileSync( cleanFile, 'utf8' );
		const postCSSContent = fs.readFileSync( pcssFile, 'utf8' );

		await compileWithWebpack( {
			basename: basename( pcssFile ),
			description: pcssFile.replace( /\\/g, '/' ).replace( 'jest/fixtures/', '' ),
			input: pcssFile,
			output: pcssFile.replace( '.pcss', '.css' ),
		} );
		expect( fs.writeFileSync ).toHaveBeenCalledWith( resolve( pcssFile.replace( /\.pcss$/, '.pcss.d.ts' ) ), expectedContent );

		mockLoaderContext.resourcePath = pcssFile;
		createCssModuleTypings.call( mockLoaderContext, postCSSContent );
		expect( mockLoaderContext.callback ).toHaveBeenCalledWith( null, postCSSContent );
	} );
} );
