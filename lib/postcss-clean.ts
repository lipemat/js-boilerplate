/**
 * Mimic the `postcss-clean` plugin.
 *
 * Override due to the plugin using version 4 of `clean-css`, which
 * has issues with PostCSS 7/8 and results in inconsistent CSS.
 *
 * This may potentially be removed in favor of using that plugin again if
 * they change the version of PostCSS to 8 and Clean CSS to 5.
 *
 * Decided to use this `lib` instead of maintaining another fork.
 *
 * @link https://www.npmjs.com/package/postcss-clean
 *
 */
import postCss, {type Helpers, type Plugin, type Root} from 'postcss';
import type {MinifierOutput, OptionsOutput, Output} from 'clean-css';

// Can't use `import` due to the plugin not supporting a default export.
const CleanCSS = require( 'clean-css' );

const cleaner = ( opts: OptionsOutput = {} ): Plugin => {
	const clean: MinifierOutput = new CleanCSS( opts );

	return {
		postcssPlugin: 'clean',
		OnceExit( css: Root, {result}: Helpers ) {
			return new Promise( ( resolve, reject ) => {
				clean.minify( css.toString(), ( err, min: Output ) => {
					if ( null !== err ) {
						return reject( new Error( err.join( '\n' ) ) );
					}

					if ( min.warnings.length > 0 ) {
						return reject( new Error( 'postcss-clean minify failed! \n' + min.warnings.join( '\n' ) ) );
					}

					result.root = postCss.parse( min.styles );
					resolve();
				} );
			} );
		},
	};
};

export const postcss = true;
export default cleaner;
