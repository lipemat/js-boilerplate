import {getConfig} from '../../../helpers/config';

describe( 'jest.config.test.ts', () => {
	it( 'should match the snapshot', () => {
		const config = require( '../../../config/jest.config' );
		expect( config ).toMatchSnapshot();
		expect( config ).toStrictEqual( getConfig( 'jest.config' ) );
	} );
} );
