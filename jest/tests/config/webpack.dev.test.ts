import {type PackageConfig} from '@lipemat/js-boilerplate-shared';
import path from 'path';

const mockPackageConfig: Partial<PackageConfig> = {};
// Change the result of the getPackageConfig function, so we can change anything.
jest.mock( '@lipemat/js-boilerplate-shared', () => ( {
	...jest.requireActual( '@lipemat/js-boilerplate-shared' ),
	getPackageConfig: () => ( {
		...jest.requireActual( '@lipemat/js-boilerplate-shared/helpers/package-config.js' ).getPackageConfig(),
		...mockPackageConfig,
	} ),
} ) );


afterEach( () => {
	delete process.env.BROWSERSLIST;
} );


describe( 'webpack.dev.test.ts', () => {
	test( 'Browserslist config', () => {
		const config = require( '../../../config/webpack.dev.ts' ).default;
		const wpBrowsers = require( '@wordpress/browserslist-config' );
		expect( config.target ).toEqual( 'browserslist:' + wpBrowsers.join( ', ' ) );
		expect( config ).toMatchSnapshot( 'Default Browsers' );


		jest.resetModules();
		process.env.BROWSERSLIST = 'chrome 71';
		const config2 = require( '../../../config/webpack.dev.ts' ).default;
		expect( config2.target ).toEqual( 'browserslist:chrome 71' );
		expect( config ).toMatchSnapshot( 'Chrome 71' );
	} );


	test( 'cssTsFiles', () => {
		mockPackageConfig.cssTsFiles = false;
		jest.resetModules();
		let config = require( '../../../config/webpack.dev.ts' ).default;
		let loaders = config.module.rules.pop().use;
		expect( loaders[ 0 ] ).toEqual( 'style-loader' );
		expect( loaders[ 1 ].loader ).toEqual( 'css-loader' );
		expect( loaders[ 2 ].loader ).toEqual( 'postcss-loader' );

		mockPackageConfig.cssTsFiles = true;
		jest.resetModules();
		config = require( '../../../config/webpack.dev.ts' ).default;
		loaders = config.module.rules.pop().use;
		expect( loaders[ 0 ] ).toEqual( 'style-loader' );
		expect( loaders[ 1 ].loader ).toEqual( path.resolve( __dirname, '../../../lib/css-module-types.ts' ) );
		expect( loaders[ 2 ].loader ).toEqual( 'css-loader' );
		expect( loaders[ 3 ].loader ).toEqual( 'postcss-loader' );

		expect( config ).toMatchSnapshot( 'cssTsFiles' );
	} );
} );
