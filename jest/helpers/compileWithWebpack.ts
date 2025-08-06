import {basename, extname, join, resolve} from 'path';
import webpack, {type Compiler, OutputFileSystem} from 'webpack';
import 'setimmediate';
import {createFsFromVolume, IFs, Volume} from 'memfs';

import {getConfig} from '../../helpers/config';

/**
 * Compile a file using webpack.
 */
export type Fixture = {
	input: string;
	output: string;
	basename: string;
	description: string;
}

/**
 * Mimic webpack compiler.run() method with promises support.
 * This is a workaround for webpack does not support promises.
 *
 */
function compile( compiler: Compiler, fixture: Fixture ): Promise<string> {
	return new Promise( ( promiseResolve, reject ) => {
		compiler.run( ( error, stats ) => {
			if ( error || 'undefined' === typeof stats ) {
				reject( error );
				return;
			}
			if ( stats.hasErrors() ) {
				reject( stats.compilation.errors );
			}

			try {
				// @ts-expect-error TS2352 IFs is not assignable to OutputFileSystem.
				const usedFs = compiler.outputFileSystem as IFs;
				const outputPath = stats.compilation.outputOptions.path ?? '';
				const data = usedFs.readFileSync( join( outputPath, basename( fixture.output ) ) ).toString();
				promiseResolve( data.trim() );
			} catch ( e ) {
				if ( stats.compilation.errors.length > 0 ) {
					reject( stats.compilation.errors );
				}
				reject( e );
			}
		} );
		setTimeout( () => {
			reject( new Error( 'Timed out' ) );
		}, 2_000 );
	} );
}

/**
 * Compile a fixture with webpack.
 *
 * @notice We can't reset the modules of MiniCssExtractPlugin conflicts with
 *         itself. Instead, we isolate other configurations to allow them to
 *         load fresh each time.
 */
export default function compileWithWebpack( fixture: Fixture, config = {} ): Promise<string> {
	const fullConfig = {...require( '../../config/webpack.dist' ), ...config};

	// Isolate the css-loader and postcss config, so it is loaded fresh each time.
	// Allow differentiation between production and development.
	jest.isolateModules( () => {
		fullConfig.module.rules[ 2 ].use[ 1 ].options = getConfig( 'css-loader.config' );
		fullConfig.module.rules[ 2 ].use[ 2 ].options.postcssOptions = getConfig( 'postcss.config' );
	} );

	// Point a single entry to the fixture file.
	const entry = basename( fixture.input, extname( fixture.input ) );
	fullConfig.entry = {
		[ entry ]: resolve( __dirname, '../../', fixture.input ),
	};
	fullConfig.context = resolve( __dirname, '../fixtures' );

	// The manifest plugin does not work in this context.
	delete fullConfig.plugins[ 6 ];

	// Create a compiler with the fixture config.
	const compiler: Compiler | null = webpack( fullConfig );
	if ( null === compiler ) {
		throw new Error( 'Failed to create the webpack compiler.' );
	}

	// Use a memory cache for the compiler file system.
	// @ts-expect-error TS2322 IFs are not assignable to OutputFileSystem.
	compiler.outputFileSystem = createFsFromVolume( new Volume() ) as OutputFileSystem;

	return compile( compiler, fixture );
}
