import CleanCSS, {type MinifierPromise} from 'clean-css';
import type {LoaderContext} from 'webpack';

/**
 * Use clean-css to minify any CSS files being loaded.
 *
 * Does not apply to .pcss files, just .css files being imported.
 *
 * Inspired by abandoned "clean-css-loader"
 * - Simplified by not supporting options.
 * - Fix missing `loader-utils` dependency.
 * - Under our control.
 *
 * @link https://github.com/retyui/clean-css-loader
 */
function cleanCssLoader( this: LoaderContext<Record<string, never>>, content: string, ...args: [] ): void {
	const callback = this.async();

	const clean: MinifierPromise = new CleanCSS( {
		level: 2,
		returnPromise: true,
		sourceMap: false,
	} );

	clean.minify( content )
		.then( output => {
			if ( Array.isArray( output.warnings ) ) {
				output.warnings.forEach( warning => {
					this.emitWarning( new Error( warning ) );
				} );
			}
			return callback( null, output.styles, ...args );
		} )
		.catch( callback );
}

export = cleanCssLoader;
