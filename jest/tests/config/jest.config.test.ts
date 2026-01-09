import {getConfig} from '../../../helpers/config.js';
import {createRequire} from 'node:module';

const requireModule = createRequire( import.meta.url );

describe( 'jest.config.test.ts', () => {
	it( 'should match the snapshot', () => {
		const config = requireModule( '../../../config/jest.config.js' ).default;
		expect( config ).toMatchSnapshot();
		expect( config ).toStrictEqual( getConfig( 'jest.config' ) );
	} );


	test( 'Build files', () => {
		const TS = requireModule( '../../../config/jest.config.ts' ).default
		const JS = requireModule( '../../../config/jest.config.js' ).default;
		expect( TS ).toStrictEqual( JS );
	} );
} );
