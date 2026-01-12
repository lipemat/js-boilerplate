import {modifyPackageConfig, resetPackageConfig} from '@lipemat/js-boilerplate-shared/helpers/package-config.js';
import {jest} from '@jest/globals';
import {importFresh} from '../../helpers/imports';
import type {CssLoaderConfig} from '../../../config/css-loader.config';


const originalModule = await import( '@lipemat/js-boilerplate-shared/helpers/css-classnames.js' );

// Change the result of the getLocalIdent function to something we can verify.
jest.unstable_mockModule( '@lipemat/js-boilerplate-shared/helpers/css-classnames.js', () => ( {

	...originalModule,
	getLocalIdent: jest.fn().mockReturnValue( '__TEST_CSS__' ),
} ) );


describe( 'css-loader.config.test.ts', () => {
	beforeEach( () => {
		jest.resetModules();
	} );

	afterEach( () => {
		process.env.NODE_ENV = 'test';
		resetPackageConfig();
		jest.resetModules();
	} );


	test( 'Develop config', async () => {
		const config = await importFresh<CssLoaderConfig>( './config/css-loader.config' );
		expect( config.importLoaders ).toEqual( 1 );
		expect( config.modules.exportLocalsConvention ).toEqual( 'camelCase' );
		expect( config.modules.localIdentName ).toEqual( 'Ⓜ[name]__[local]__[contenthash:base64:2]' );
		expect( config.modules.mode ).toEqual( expect.any( Function ) );
		expect( config.modules.getLocalIdent ).not.toBeDefined();
		expect( config.modules.mode )
		expect( config.sourceMap ).toEqual( true );
		expect( config.url ).toEqual( false );

		expect( config ).toMatchSnapshot( 'develop' );
	} );


	test( 'Production config', async () => {
		jest.resetModules();
		modifyPackageConfig( {
			shortCssClasses: false,
		} )
		process.env.NODE_ENV = 'production';
		const config = await importFresh<CssLoaderConfig>( './config/css-loader.config' );
		expect( config.importLoaders ).toEqual( 1 );
		expect( config.modules.exportLocalsConvention ).toEqual( 'camelCase' );
		expect( config.modules.localIdentName ).toEqual( '[contenthash:base64:5]' );
		expect( config.url ).toEqual( false );
		expect( config.modules.getLocalIdent ).not.toBeDefined();

		expect( config ).toMatchSnapshot( 'production CSS modules disabled' );

		jest.resetModules();
		modifyPackageConfig( {
			shortCssClasses: true,
		} )
		const cssEnabled = await importFresh<CssLoaderConfig>( './config/css-loader.config' );
		expect( cssEnabled.modules.getLocalIdent ).toBeDefined();
		expect( cssEnabled.modules.getLocalIdent() ).toEqual( '__TEST_CSS__' );

		const real = await import( '@lipemat/js-boilerplate-shared/helpers/css-classnames' );

		// @ts-expect-error -- Not passing data to the mock function.
		expect( cssEnabled.modules.getLocalIdent() ).toEqual( real.getLocalIdent() );

		expect( cssEnabled ).toMatchSnapshot( 'production CSS modules enabled' );
	} );
} );
