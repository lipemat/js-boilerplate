import 'core-js/stable';
import '@testing-library/jest-dom';
import 'unfetch/polyfill';

jest.spyOn( global.console, 'warn' ).mockImplementation( () => jest.fn() );

// Support cookies.
let __cookies = '';

Object.defineProperty( window.document, 'cookie', {
	get: () => __cookies,
	set: v => __cookies = v,
	// @ts-ignore
	split: s => __cookies.split( s ),
} );
