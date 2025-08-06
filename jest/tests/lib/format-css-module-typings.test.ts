import * as fs from 'fs';
import {sync} from 'glob';
import {basename, join} from 'path';
import type {LoaderContext} from 'webpack';

const formatCSSModuleTypings = require( '../../../lib/format-css-module-typings.ts' );

jest.mock( 'fs', () => {
	const actualFs = jest.requireActual( 'fs' );
	return {
		...actualFs,
		writeFileSync: jest.fn(),
	};
} );

// @ts-expect-error TS2345: Argument of type 'Record<string, never>' is not assignable to a parameter of type 'LoaderContext<{}>'.
const mockLoaderContext: LoaderContext<Record<string, never>> = {
	callback: jest.fn().mockReturnValue( () => {
	} ),
	resourcePath: '',
};

describe( 'Format CSS Module Typings', () => {
	test.each( sync( 'jest/fixtures/postcss-modules/raw/*.pcss.d.ts' ).map( rawFile => {
		const filename = basename( rawFile );
		const cleanFile = join( 'jest/fixtures/postcss-modules/clean', filename );

		return {
			description: `Formats ${filename} correctly`,
			rawFile,
			cleanFile,
		};
	} ) )( '$description', ( {rawFile, cleanFile} ) => {
		const expectedContent = fs.readFileSync( cleanFile, 'utf8' );
		mockLoaderContext.resourcePath = rawFile;
		formatCSSModuleTypings.call( mockLoaderContext, 'dummy-source' );
		expect( fs.writeFileSync ).toHaveBeenCalledWith( rawFile, expectedContent );
		expect( mockLoaderContext.callback ).toHaveBeenCalledWith( null, 'dummy-source' );
	} );
} );
