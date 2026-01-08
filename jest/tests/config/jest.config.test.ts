import {getConfig} from '../../../helpers/config';

describe( 'jest.config.test.ts', () => {
	it( 'should match the snapshot', () => {
		const config = require( '../../../config/jest.config' ).default;
		expect( config ).toMatchSnapshot();
		expect( config ).toStrictEqual( getConfig( 'jest.config' ) );
	} );


	test( 'Build files', () => {
		const TS = require( '../../../config/jest.config.ts' ).default
		const JS = require( '../../../config/jest.config' ).default;
		expect( TS ).toStrictEqual( JS );
	} );
} );
