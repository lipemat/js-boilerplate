import {type PackageConfig} from '../../../helpers/package-config';

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
} );


describe( 'webpack.dev.test.ts', () => {
	test( 'Browserslist config', () => {
		const config = require( '../../../config/webpack.dev' );
		const wpBrowsers = require( '@wordpress/browserslist-config' );
		expect( config.target ).toEqual( 'browserslist:' + wpBrowsers.join( ', ' ) );
		expect( config ).toMatchSnapshot( 'Default Browsers' );


		jest.resetModules();
		process.env.BROWSERSLIST = 'chrome 71';
		const config2 = require( '../../../config/webpack.dev' );
		expect( config2.target ).toEqual( 'browserslist:chrome 71' );
		expect( config ).toMatchSnapshot( 'Chrome 71' );
	} );


	test( 'cssTsFiles', () => {
		let config = require( '../../../config/webpack.dev' );
		let loaders = config.module.rules.pop().use;
		expect( loaders[ 0 ] ).toEqual( 'style-loader' );
		expect( loaders[ 1 ].loader ).toEqual( 'css-loader' );
		expect( loaders[ 2 ].loader ).toEqual( 'postcss-loader' );

		mockPackageConfig.cssTsFiles = true;
		jest.resetModules();
		config = require( '../../../config/webpack.dev' );
		loaders = config.module.rules.pop().use;
		expect( loaders[ 0 ] ).toEqual( 'style-loader' );
		expect( loaders[ 1 ].loader ).toEqual( '@teamsupercell/typings-for-css-modules-loader' );
		expect( loaders[ 1 ].options.prettierConfigFile ).toEqual( require.resolve( '../../../helpers/.prettierrc.json' ) );
		expect( loaders[ 2 ].loader ).toEqual( 'css-loader' );
		expect( loaders[ 3 ].loader ).toEqual( 'postcss-loader' );

		expect( config ).toMatchSnapshot( 'cssTsFiles' );
	} );
} );
