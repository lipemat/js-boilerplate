import {sync} from 'glob';
import {basename, join, resolve} from 'path';
import {type LoaderContext} from 'webpack';
// @ts-ignore
import createCssModuleTypings, {modifyFileWriter} from '../../../lib/css-module-types.js';
import compileWithWebpack from '../../helpers/compileWithWebpack';
import {jest} from '@jest/globals';
import {readFileSync, writeFileSync as restoreSync} from 'fs';


const writeFileSyncMock = jest.fn();

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
		modifyFileWriter( writeFileSyncMock );
	} );

	afterEach( () => {
		modifyFileWriter( restoreSync );
		jest.clearAllMocks();
	} );

	test( 'Empty files are not generated', async () => {
		const pcssFile = join( 'jest/fixtures/postcss-modules/default.pcss' );
		const postCSSContent = readFileSync( pcssFile, 'utf8' );

		await compileWithWebpack( {
			basename: basename( pcssFile ),
			description: pcssFile.replace( /\\/g, '/' ).replace( 'jest/fixtures/', '' ),
			input: pcssFile,
			output: pcssFile.replace( '.pcss', '.css' ),
		} );

		expect( writeFileSyncMock ).not.toHaveBeenCalled();
		mockLoaderContext.resourcePath = pcssFile;
		createCssModuleTypings.call( mockLoaderContext, postCSSContent );
		expect( mockLoaderContext.callback ).toHaveBeenCalledWith( null, postCSSContent );
	} );


	test.each( sync( 'jest/fixtures/postcss-modules/source/*.pcss' ).map( pcssFile => {
		const filename = basename( pcssFile );
		const cleanFile = join( 'jest/fixtures/postcss-modules/results', filename.replace( /\.pcss$/, '.pcss.d.ts' ) );

		return {
			description: `Formats CSS types for ${filename}`,
			pcssFile,
			cleanFile,
		};
	} ) )( '$description', async ( {pcssFile, cleanFile} ) => {
		const expectedContent = readFileSync( cleanFile, 'utf8' );
		const postCSSContent = readFileSync( pcssFile, 'utf8' );

		await compileWithWebpack( {
			basename: basename( pcssFile ),
			description: pcssFile.replace( /\\/g, '/' ).replace( 'jest/fixtures/', '' ),
			input: pcssFile,
			output: pcssFile.replace( '.pcss', '.css' ),
		} );
		expect( writeFileSyncMock ).toHaveBeenCalledWith( resolve( pcssFile.replace( /\.pcss$/, '.pcss.d.ts' ) ), expectedContent );

		mockLoaderContext.resourcePath = pcssFile;
		createCssModuleTypings.call( mockLoaderContext, postCSSContent );
		expect( mockLoaderContext.callback ).toHaveBeenCalledWith( null, postCSSContent );
	} );
} );
