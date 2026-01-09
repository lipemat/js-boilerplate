import {basename} from 'path';
import {readFileSync} from 'fs';
import compileWithWebpack, {type Fixture} from '../../helpers/compileWithWebpack';
import {sync} from 'glob';


describe( 'Clean CSS Loader', () => {
	test.each( provideCssFiles() )( 'Compress CSS file ( $description )', async ( fixture: Fixture ) => {
		process.env.NODE_ENV = 'production';

		const output = readFileSync( fixture.output, 'utf8' );
		const webpackResult = await compileWithWebpack( fixture );
		expect( webpackResult ).toEqual( output.trim() );
	} );
} );

/**
 * - Source file in `fixtures/css`
 * - Output (min) file in `fixtures/css/min` with the same name as the source file.
 */
function provideCssFiles(): Fixture[] {
	return sync( 'jest/fixtures/css/*.css' )
		.map( ( file: string ) => {
			return {
				basename: basename( file ),
				input: file,
				output: file.replace( /css[\/\\]/, 'css/min/' ),
				description: file.replace( /\\/g, '/' ).replace( 'jest/fixtures/', '' ),
			};
		} );
}
