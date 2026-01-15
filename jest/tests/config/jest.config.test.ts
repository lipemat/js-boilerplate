import {getConfig} from '../../../helpers/config.js';

describe( 'jest.config.test.ts', () => {
	it( 'should match the snapshot', async () => {
		const config = await import( '../../../config/jest.config.js' );
		expect( config.default ).toMatchSnapshot();
		// @ts-expect-error Technically not supported by validating backward compatibility.
		expect( config.default ).toStrictEqual( await getConfig( 'jest.config' ) );
		expect( config.default ).toStrictEqual( await getConfig( 'jest.config.js' ) );
	} );


	test( 'Build files', async () => {
		const TS = await import( '../../../config/jest.config.ts' );
		const JS = await import( '../../../config/jest.config.js' );
		expect( TS ).toStrictEqual( JS );
	} );
} );
