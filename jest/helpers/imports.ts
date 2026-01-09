import {pathToFileURL} from 'node:url';

export async function importFresh<T>( relativeToRoot: string ): Promise<T> {
	const url = pathToFileURL( relativeToRoot );
	// Bust ESM import cache so env changes are reflected.
	url.searchParams.set( 't', String( Date.now() ) );
	return ( await import( url.href ) ).default as T;
}
