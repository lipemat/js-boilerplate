import net from 'net';

/**
 * First port within the dev server range, and the default port.
 */
export const DEV_SERVER_PORT_START = 3000;

/**
 * Number of ports available to the dev server.
 *
 * Capped to the maximum number of simultaneous PHP dev servers.
 */
export const DEV_SERVER_PORT_RANGE = 20;

const DEV_SERVER_HOST = '0.0.0.0';

/**
 * Check if a single port is free to bind to.
 *
 * @param {number} port - Port to check.
 *
 * @return {Promise<boolean>}
 */
function isPortFree( port: number ): Promise<boolean> {
	return new Promise( resolve => {
		const server = net.createServer();
		server.unref();
		server.on( 'error', () => {
			resolve( false );
		} );
		server.listen( {host: DEV_SERVER_HOST, port}, () => {
			server.close( () => {
				resolve( true );
			} );
		} );
	} );
}

/**
 * Resolve the first free port within the dev server range.
 *
 * @throws {Error} - When every port within the range is in use.
 *
 * @return {Promise<number>}
 */
export async function getDevServerPort(): Promise<number> {
	const lastPort = DEV_SERVER_PORT_START + DEV_SERVER_PORT_RANGE - 1;
	for ( let port = DEV_SERVER_PORT_START; port <= lastPort; port++ ) {
		if ( await isPortFree( port ) ) {
			return port;
		}
	}
	throw new Error( `Unable to start the dev server: all ${DEV_SERVER_PORT_RANGE} ports (${DEV_SERVER_PORT_START}-${lastPort}) are in use.` );
}
