import {basename, extname, join, resolve} from 'path';
import webpack, {type Compiler} from 'webpack';
import 'setimmediate';
import {createFsFromVolume, IFs, Volume} from 'memfs';

const {getConfig} = require( '../../helpers/config' );

/**
 * Compile a file using webpack.
 *
 *
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
	return new Promise( ( resolve, reject ) => {
		compiler.run( ( error, stats ) => {
			if ( error || 'undefined' === typeof stats ) {
				reject( error );
				return;
			}
			if ( stats.hasErrors() ) {
				reject( stats.compilation.errors );
			}

			try {
				const usedFs = compiler.outputFileSystem as IFs;
				const outputPath = stats.compilation.outputOptions.path ?? '';
				const data = usedFs.readFileSync( join( outputPath, basename( fixture.output ) ) ).toString();
				resolve( data.trim() );
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
 *
 */
export default function compileWithWebpack( fixture: Fixture, config = {} ): Promise<string> {
	const fullConfig = {...require( '../../config/webpack.dist.js' ), ...config};

	// Isolate the css-loader and postcss config, so it is loaded fresh each time.
	// Allow differenicate between production and development.
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
	const compiler = webpack( fullConfig );

	// Use a memory cache for the compiler file system.
	compiler.outputFileSystem = createFsFromVolume( new Volume() );

	return compile( compiler, fixture );
}
