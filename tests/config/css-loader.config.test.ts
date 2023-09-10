const {getLocalIdent} = require( '../../helpers/css-classnames' );

// Change this variable during tests.
let mockShortCssEnabled = false;

// Change the result of the getPackageConfig function so we can change shortCssClasses.
jest.mock( '../../helpers/package-config.ts', () => ( {
	...jest.requireActual( '../../helpers/package-config.ts' ),
	getPackageConfig: () => ( {
		...jest.requireActual( '../../helpers/package-config.ts' ),
		// Change this variable during the test.
		shortCssClasses: mockShortCssEnabled,
	} ),
} ) );
// Change the result of the getLocalIdent function to something we can verify.
jest.mock( '../../helpers/css-classnames.js', () => ( {
	...jest.requireActual( '../../helpers/css-classnames.js' ),
	getLocalIdent: jest.fn().mockReturnValue( '__TEST_CSS__' ),
} ) );


beforeEach( () => {
	jest.resetModules();
} );

afterEach( () => {
	process.env.NODE_ENV = 'test';
	mockShortCssEnabled = false;
} );

describe( 'css-loader.config.test.ts', () => {
	test( 'Develop config', () => {
		const config = require( '../../config/css-loader.config' );
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

	test( 'Production config', () => {
		process.env.NODE_ENV = 'production';
		const config = require( '../../config/css-loader.config' );
		expect( config.importLoaders ).toEqual( 1 );
		expect( config.modules.exportLocalsConvention ).toEqual( 'camelCase' );
		expect( config.modules.localIdentName ).toEqual( '[contenthash:base64:5]' );
		expect( config.url ).toEqual( false );
		expect( config.modules.getLocalIdent ).not.toBeDefined();

		expect( config ).toMatchSnapshot( 'production CSS modules disabled' );

		jest.resetModules();
		mockShortCssEnabled = true;
		const cssEnabled = require( '../../config/css-loader.config' );
		expect( cssEnabled.modules.getLocalIdent ).toBeDefined();
		expect( cssEnabled.modules.getLocalIdent() ).toEqual( '__TEST_CSS__' );
		expect( cssEnabled.modules.getLocalIdent() ).toEqual( getLocalIdent() );

		expect( cssEnabled ).toMatchSnapshot( 'production CSS modules enabled' );
	} );
} );
