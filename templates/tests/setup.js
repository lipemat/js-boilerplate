import 'core-js/stable';
import 'regenerator-runtime/runtime';

require( 'unfetch/polyfill' ); // So we can use window.fetch.

// eslint-disable-next-line no-undef
jest.spyOn( global.console, 'warn' ).mockImplementation( () => jest.fn() );

// Support cookies.
let __cookies = '';
Object.defineProperty( window.document, 'cookie', {
	get: () => __cookies,
	set: v => __cookies = v,
	split: s => __cookies.split( s ),
} );


// Mock environmental variables
global.__TEST__ = true;
window.CORE_CONFIG = {
	endpoint: 'http://starting-point.loc/wp-json/',
};
