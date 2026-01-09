import path from 'path';
import type {PackageConfig} from '@lipemat/js-boilerplate-shared';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// @ts-expect-error
import wpBrowsers from '@wordpress/browserslist-config';

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
	process.env.NODE_ENV = 'test';
} );

describe( 'webpack.dist.test.ts', () => {
	test( 'Browserslist config', () => {
		process.env.NODE_ENV = 'production';
		const config = require( '../../../config/webpack.dist' ).default;
		expect( config.target ).toEqual( 'browserslist:' + wpBrowsers.join( ', ' ) );
		expect( config ).toMatchSnapshot( 'Default Browsers' );

		jest.resetModules();
		process.env.BROWSERSLIST = 'chrome 72, firefox 65';
		const config2 = require( '../../../config/webpack.dist' ).default;
		expect( config2.target ).toEqual( 'browserslist:chrome 72, firefox 65' );
		expect( config ).toMatchSnapshot( 'Chrome 72, Firefox 65' );
	} );


	test( 'cssTsFiles', () => {
		mockPackageConfig.cssTsFiles = false;
		jest.resetModules();
		let config = require( '../../../config/webpack.dist' ).default;
		let loaders = config.module.rules.pop().use;
		expect( loaders[ 0 ] ).toEqual( MiniCssExtractPlugin.loader );
		expect( loaders[ 1 ].loader ).toEqual( 'css-loader' );
		expect( loaders[ 2 ].loader ).toEqual( 'postcss-loader' );

		expect( config ).toMatchSnapshot( 'cssTsFiles No types' );

		mockPackageConfig.cssTsFiles = true;
		jest.resetModules();
		config = require( '../../../config/webpack.dist' ).default;
		loaders = config.module.rules.pop().use;
		expect( loaders[ 0 ] ).toEqual( MiniCssExtractPlugin.loader );
		expect( loaders[ 1 ].loader ).toEqual( path.resolve( __dirname, '../../../lib/css-module-types.ts' ) );
		expect( loaders[ 2 ].loader ).toEqual( 'css-loader' );
		expect( loaders[ 3 ].loader ).toEqual( 'postcss-loader' );

		expect( config ).toMatchSnapshot( 'cssTsFiles With Types' );
	} );
} );
