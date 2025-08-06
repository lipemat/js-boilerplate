import path from 'path';
import type {PackageConfig} from '../../../helpers/package-config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const mockPackageConfig: Partial<PackageConfig> = {};
// Change the result of the getPackageConfig function, so we can change anything.
jest.mock( '../../../helpers/package-config.js', () => ( {
	...jest.requireActual( '../../../helpers/package-config.js' ),
	getPackageConfig: () => ( {
		...jest.requireActual( '../../../helpers/package-config.js' ),
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
		const config = require( '../../../config/webpack.dist' );
		const wpBrowsers = require( '@wordpress/browserslist-config' );
		expect( config.target ).toEqual( 'browserslist:' + wpBrowsers.join( ', ' ) );
		expect( config ).toMatchSnapshot( 'Default Browsers' );

		jest.resetModules();
		process.env.BROWSERSLIST = 'chrome 72, firefox 65';
		const config2 = require( '../../../config/webpack.dist' );
		expect( config2.target ).toEqual( 'browserslist:chrome 72, firefox 65' );
		expect( config ).toMatchSnapshot( 'Chrome 72, Firefox 65' );
	} );

	test( 'cssTsFiles', () => {
		let config = require( '../../../config/webpack.dist' );
		let loaders = config.module.rules.pop().use;
		expect( loaders[ 0 ] ).toEqual( MiniCssExtractPlugin.loader );
		expect( loaders[ 1 ].loader ).toEqual( 'css-loader' );
		expect( loaders[ 2 ].loader ).toEqual( 'postcss-loader' );

		expect( config ).toMatchSnapshot( 'cssTsFiles No types' );

		mockPackageConfig.cssTsFiles = true;
		jest.resetModules();
		config = require( '../../../config/webpack.dist' );
		loaders = config.module.rules.pop().use;
		expect( loaders[ 0 ] ).toEqual( MiniCssExtractPlugin.loader );
		expect( loaders[ 1 ].loader ).toEqual( path.resolve( __dirname, '../../../lib/css-module-types.ts' ) );
		expect( loaders[ 2 ].loader ).toEqual( 'css-loader' );
		expect( loaders[ 3 ].loader ).toEqual( 'postcss-loader' );

		expect( config ).toMatchSnapshot( 'cssTsFiles With Types' );
	} );
} );
