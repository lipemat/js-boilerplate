import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import wpBrowsers from '@wordpress/browserslist-config';

import {importFresh} from '../../helpers/imports.ts';
import {fileURLToPath} from 'node:url';
import type {PackageConfig} from '@lipemat/js-boilerplate-shared';

import {jest} from '@jest/globals';

let mod: Partial<PackageConfig> = {};

jest.unstable_mockModule( '@lipemat/js-boilerplate-shared', async () => {
	const originalModule = await import( '@lipemat/js-boilerplate-shared/helpers/package-config.js' );

	return {
		getPackageConfig: () => {
			return {
				...originalModule.getPackageConfig(),
				...mod,
			}
		},
		modifyPackageConfig: ( changes: Partial<ReturnType<typeof originalModule.getPackageConfig>> ) => {
			mod = changes
		},
	};
} );


const {modifyPackageConfig} = await import( '@lipemat/js-boilerplate-shared' );


describe( 'webpack.dist.test.ts', () => {
	afterEach( () => {
		delete process.env.BROWSERSLIST;
		process.env.NODE_ENV = 'test';
		jest.resetModules();
	} );


	test( 'Browserslist config', async () => {
		process.env.NODE_ENV = 'production';

		const config = await importFresh( './config/webpack.dist.js' );
		expect( config.target ).toEqual( 'browserslist:' + wpBrowsers.join( ', ' ) );
		expect( config ).toMatchSnapshot( 'Default Browsers' );
	} );


	test( 'Chrome 72, Firefox 65', async () => {
		process.env.NODE_ENV = 'production';
		process.env.BROWSERSLIST = 'chrome 72, firefox 65';

		const config2 = await importFresh( './config/webpack.dist.js' );
		expect( config2.target ).toEqual( 'browserslist:chrome 72, firefox 65' );
		expect( config2 ).toMatchSnapshot( 'Chrome 72, Firefox 65' );
	} );


	test( 'cssTsFiles Disabled', async () => {
		modifyPackageConfig( {
			cssTsFiles: false,
		} );
		const config = await importFresh( './config/webpack.dist.js' );
		const loaders = [ ...config.module.rules ].pop()?.use;
		expect( loaders[ 0 ] ).toEqual( MiniCssExtractPlugin.loader );
		expect( loaders[ 1 ].loader ).toEqual( 'css-loader' );
		expect( loaders[ 2 ].loader ).toEqual( 'postcss-loader' );

		expect( config ).toMatchSnapshot( 'cssTsFiles No types' );
	} );


	test( 'cssTsFiles Enabled', async () => {
		process.env.NODE_ENV = 'production';
		modifyPackageConfig( {
			cssTsFiles: true,
		} );
		const config = await importFresh( './config/webpack.dist.js' );
		const loaders = [ ...config.module.rules ].pop()?.use;
		expect( loaders[ 0 ] ).toEqual( MiniCssExtractPlugin.loader );
		expect( loaders[ 1 ].loader ).toEqual( fileURLToPath( new URL( '../../../lib/css-module-types.js', import.meta.url ) ) );
		expect( loaders[ 2 ].loader ).toEqual( 'css-loader' );
		expect( loaders[ 3 ].loader ).toEqual( 'postcss-loader' );

		expect( config ).toMatchSnapshot( 'cssTsFiles With Types' );
	} );
} );
