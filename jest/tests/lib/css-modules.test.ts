import {basename} from 'path';
import {readFileSync} from 'fs';
import compileWithWebpack, {type Fixture} from '../../helpers/compileWithWebpack';
import {sync} from 'glob';


describe( 'CSS Modules', () => {
	afterEach( () => {
		process.env.NODE_ENV = 'test';
	} );

	test.each( provideModuleFiles() )( 'Development ( $description )', async ( fixture: Fixture ) => {
		process.env.NODE_ENV = 'development';

		const output = readFileSync( fixture.output, 'utf8' );
		const webpackResult = await compileWithWebpack( fixture );
		expect( webpackResult ).toEqual( output.trim() );
	} );

	test.each( provideModuleFiles() )( 'Production ( $description )', async ( fixture: Fixture ) => {
		process.env.NODE_ENV = 'production';

		const output = readFileSync( fixture.output.replace( /\.css$/, '.min.css' ), 'utf8' );
		const webpackResult = await compileWithWebpack( fixture );
		expect( webpackResult ).toEqual( output.trim() );
	} );
} );

/**
 * - Source file in `fixtures/css-modules`.
 * - Expected `<name>.css` (development) and `<name>.min.css` (production) beside it.
 *
 * `output` stays `<name>.css` in both modes because it names the emitted file.
 */
function provideModuleFiles(): Fixture[] {
	return sync( 'jest/fixtures/css-modules/*.pcss' )
		.map( ( file: string ) => {
			return {
				basename: basename( file ),
				input: file,
				output: file.replace( /\.pcss$/, '.css' ),
				description: file.replace( /\\/g, '/' ).replace( 'jest/fixtures/', '' ),
			};
		} );
}
