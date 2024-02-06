import {getConfig} from './config';
import {getPackageConfig} from './package-config';
import {existsSync} from 'fs';
import {resolve} from 'path';
import type {EntriesConfig} from '../config/entries.config';

const entries: EntriesConfig = getConfig( 'entries.config' );

/**
 * Entry points to be loaded by Webpack.
 *
 * Checks for sources in the order they are defined and creates a
 * single entry per key if a source file exists.
 *
 * @see entries.config.js
 */
export function getEntries(): { [ name: string ]: string } {
	const matches: {[name: string]: string} = {};
	Object.keys( entries ).forEach( name => {
		entries[ name ].some( possibleFile => {
			const filePath = getPackageConfig().workingDirectory + '/src/' + possibleFile;
			if ( existsSync( resolve( filePath ) ) ) {
				matches[ name ] = resolve( filePath );
				return true;
			}
			return false;
		} );
	} );
	return matches;
}
