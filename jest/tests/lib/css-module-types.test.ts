import {sync} from 'glob';
import fs from 'fs';
import {syncBuiltinESMExports} from 'node:module';
import {basename, join, resolve} from 'path';
import {type LoaderContext} from 'webpack';
import {jest} from '@jest/globals';


const writeFileSyncMock = jest.spyOn( fs, 'writeFileSync' ).mockImplementation( () => {} );

// Webpack imports loaders outside Jest's ESM module registry.
syncBuiltinESMExports();
jest.unstable_mockModule( 'fs', () => ( {
	...fs,
	default: fs,
	writeFileSync: writeFileSyncMock,
} ) );

const {default: createCssModuleTypings} = await import( '../../../lib/css-module-types.js' );
const {default: compileWithWebpack} = await import( '../../helpers/compileWithWebpack' );

type CssLoaderContext = LoaderContext<Record<string, never>>;
const mockAsyncFunction = jest.fn<CssLoaderContext['callback']>();
const mockLoaderContext: Pick<CssLoaderContext, 'async' | 'callback' | 'emitError' | 'resourcePath'> = {
	callback: jest.fn<CssLoaderContext['callback']>(),
	async: jest.fn<CssLoaderContext['async']>().mockReturnValue( mockAsyncFunction ),
	emitError: jest.fn(),
	resourcePath: '',
};

describe( 'Format CSS Module Typings', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	afterAll( () => {
		writeFileSyncMock.mockRestore();
		syncBuiltinESMExports();
		jest.unstable_unmockModule( 'fs' );
	} );

	test( 'Empty files are not generated', async () => {
		const pcssFile = join( 'jest/fixtures/postcss-modules/default.pcss' );
		const postCSSContent = fs.readFileSync( pcssFile, 'utf8' );

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
		const expectedContent = fs.readFileSync( cleanFile, 'utf8' );
		const postCSSContent = fs.readFileSync( pcssFile, 'utf8' );

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
