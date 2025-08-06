import type {LoaderContext} from 'webpack';
import {existsSync, readFileSync, writeFileSync} from 'fs';

/**
 * Formats CSS Module typings files.
 *
 * This loader reads the `.pcss.d.ts` file, formats its content, and writes it back.
 * It ensures that the typings are consistent and follow a specific style.
 *
 * Replaces the prettier library with a custom formatting function to avoid
 * unnecessary dependencies and unplugging issues.
 *
 * @link https://webpack.js.org/api/loaders/
 *
 * @param {string} content - The content of the CSS Module file.
 * @param {...[]}  args    - Additional arguments passed to the loader.
 */

function formatCssModuleTypings( this: LoaderContext<Record<string, never>>, content: string, ...args: [] ): void {
	try {
		const resourcePath = this.resourcePath;
		const typingsPath = resourcePath.replace( /\.pcss$/, '.pcss.d.ts' );

		if ( ! existsSync( typingsPath ) ) {
			this.callback( null, content, ...args );
			return;
		}

		let typingsContent = readFileSync( typingsPath, 'utf8' );
		typingsContent = formatDefinitionContent( typingsContent );

		writeFileSync( typingsPath, typingsContent );

		this.callback( null, content, ...args );
	} catch ( error ) {
		this.emitError( error as Error );
	}
}

/**
 * Formats TypeScript content for CSS Module typings.
 *
 * @param {string} content - The content of the TypeScript file to format.
 * @return {string} - The formatted TypeScript content.
 */
function formatDefinitionContent( content: string ): string {
	let formatted = content;

	formatted = formatted.replace( /: string; /g, ': string;' );
	formatted = formatted.replace( /^([ \t]*)'([\w-]+)':/gm, function( match, indent, key ) {
		if ( -1 === key.indexOf( '-' ) ) {
			return indent + key + ':';
		}
		return indent + '\'' + key + '\':';
	} );

	formatted = formatted.replace( /^( {2})+/gm, function( match ) {
		const tabCount = match.length / 2;
		return '\t'.repeat( tabCount );
	} );
	formatted = formatted.replace( /\s+$/gm, '' );

	formatted = formatted.replace( /^}\ndeclare/gm, '}\n\ndeclare' );
	formatted = formatted.replace( /;$\nexport/gm, ';\n\nexport' );

	return formatted.trim() + '\n';
}

module.exports = formatCssModuleTypings;
export default formatCssModuleTypings;
