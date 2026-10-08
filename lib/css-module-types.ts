import type {LoaderContext} from 'webpack';
import {basename} from 'path';

import {generateModuleTypeDefinition, writeTypingsFile} from '@lipemat/js-boilerplate-shared/lib/css-module-types.js';
import camelCase from '../helpers/camel-case.js';


/**
 * Extracts CSS class names from a CSS Module into TypeScript definitions.
 *
 * Allows TS and PHPStorm to validate uses of CSS Modules in the codebase.
 *
 * Inspired by: `@teamsupercell/typings-for-css-modules-loader` but without dependencies and under our control.
 */
export default function createCssModuleTypings( this: LoaderContext<Record<string, never>>, content: string, ...args: [] ): void {
	if ( 'cacheable' in this && 'function' === typeof this.cacheable ) {
		this.cacheable();
	}

	try {
		const indexOfLocals = content.indexOf( '.locals' );
		const cssModuleKeys = -1 === indexOfLocals ? [] : getCssModuleKeys( content.substring( indexOfLocals ) );
		if ( cssModuleKeys.length > 0 ) {
			const fileName = this.resourcePath;
			const cssModuleDefinition = generateModuleTypeDefinition( cssModuleKeys, camelCase( basename( fileName ), true ) );

			const typingsPath = fileName.replace( /\.pcss$/, '.pcss.d.ts' );
			writeTypingsFile( typingsPath, cssModuleDefinition );
		}

		this.callback( null, content, ...args );
	} catch ( error ) {
		this.emitError( error as Error );
	}
}


/**
 * Extracts CSS module keys from the content of a CSS Module file.
 *
 * @param {string} content - The content of the CSS Module file.
 * @return {string[]} - An array of unique CSS module keys.
 */
function getCssModuleKeys( content: string ): string[] {
	const keyRegex = /"([^"\n]+)":/g;
	let match: string[] | null;
	const cssModuleKeys: string[] = [];

	while ( ( match = keyRegex.exec( content ) ) ) {
		if ( -1 === cssModuleKeys.indexOf( match[ 1 ] ) ) {
			cssModuleKeys.push( match[ 1 ] );
		}
	}
	return cssModuleKeys;
}
