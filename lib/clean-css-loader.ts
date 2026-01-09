

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
export default function cleanCssLoader( this: any, content: string, ...args: [] ): void {
	this.callback( null, content );
}
