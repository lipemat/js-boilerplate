import net from 'net';
import {DEV_SERVER_PORT_RANGE, DEV_SERVER_PORT_START, getDevServerPort} from '../../../helpers/dev-server-port';

/**
 * Occupy a real port so the resolver must skip it.
 *
 * @param {number} port - Port to occupy.
 *
 * @return {Promise<net.Server>}
 */
function occupyPort( port: number ): Promise<net.Server> {
	return new Promise( ( resolve, reject ) => {
		const server = net.createServer();
		server.on( 'error', reject );
		server.listen( {host: '0.0.0.0', port}, () => {
			resolve( server );
		} );
	} );
}

/**
 * Close an occupied port.
 *
 * @param {net.Server} server - Server to close.
 *
 * @return {Promise<void>}
 */
function releasePort( server: net.Server ): Promise<void> {
	return new Promise( resolve => {
		server.close( () => {
			resolve();
		} );
	} );
}

describe( 'dev-server-port helper', () => {
	it( 'returns the first port when the range is free', async () => {
		expect( await getDevServerPort() ).toBe( DEV_SERVER_PORT_START );
	} );

	it( 'skips occupied ports and returns the next free one', async () => {
		const occupied = await occupyPort( DEV_SERVER_PORT_START );
		try {
			expect( await getDevServerPort() ).toBe( DEV_SERVER_PORT_START + 1 );
		} finally {
			await releasePort( occupied );
		}
	} );

	it( 'throws when every port in the range is in use', async () => {
		const servers: net.Server[] = [];
		try {
			for ( let port = DEV_SERVER_PORT_START; port < DEV_SERVER_PORT_START + DEV_SERVER_PORT_RANGE; port++ ) {
				servers.push( await occupyPort( port ) );
			}
			await expect( getDevServerPort() ).rejects.toThrow( /all 20 ports/ );
		} finally {
			await Promise.all( servers.map( releasePort ) );
		}
	} );
} );
