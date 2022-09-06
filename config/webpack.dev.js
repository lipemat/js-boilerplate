const {getConfig, hasLocalOverride} = require( '../helpers/config' );
const webpack = require( 'webpack' );
const path = require( 'path' );
const fs = require( 'fs' );
const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );
const config = require( '../helpers/package-config' );

const postcssOptions = getConfig( 'postcss.config.js' );
const babelOptions = getConfig( 'babel.config.js' );
const cssLoaderOptions = getConfig( 'css-loader.config.js' );
const devServerOptions = getConfig( 'dev-server.config.js' );

// To allow line numbers to show up in console errors. @see React Error Boundaries.
babelOptions.plugins.unshift( '@babel/plugin-transform-react-jsx-source' );

const plugins = [
	new webpack.ProvidePlugin( {
		jQuery: 'jquery',
		$: 'jquery',
	} ),
];

// Loads a thread, which verifies any TypeScripts on changes.
// Only use this if the project has a tsconfig.json file.
if ( hasLocalOverride( 'tsconfig.json', true ) ) {
	plugins.push( new ForkTsCheckerWebpackPlugin( {
		devServer: false,
		formatter: 'basic',
		typescript: {
			configFile: config.workingDirectory + '/tsconfig.json',
		},
	} ) );
}

const entry = {
	master: [
		config.workingDirectory + '/src/index.js',
	],
};

// Loads an admin.js file if it exists.
if ( fs.existsSync( path.resolve( config.workingDirectory, 'src/admin.js' ) ) ) {
	entry.admin = [ ...entry.master ];
	entry.admin.splice( -1, 1, config.workingDirectory + '/src/admin.js' );
}

module.exports = {
	devtool: 'eval-source-map',
	entry,
	mode: 'development',
	stats: 'minimal',
	externals: {
		jquery: 'jQuery',
	},
	output: {
		path: path.resolve( config.workingDirectory, 'dist' ),
		filename: '[name].js',
		publicPath: config.url + ':' + devServerOptions.port + '/js/dist/',
		chunkFilename: '[name].js',
	},
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
		extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json', '.pcss' ],
		modules: [
			path.resolve( config.workingDirectory, 'src' ),
			'node_modules',
		],
	},
	plugins,
	optimization: {
		moduleIds: 'named',
		emitOnErrors: false,
	},
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				loader: 'babel-loader',
				include: path.resolve( config.workingDirectory, 'src' ),
				exclude: /node_modules/,
				options: babelOptions,
			},
			{
				test: /\.[jt]sx?$/,
				include: /node_modules/,
				use: [ 'react-hot-loader/webpack' ],
			},
			{
				test: /\.pcss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: cssLoaderOptions,
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions,
						},
					},
				],
			},

		],
	},
};
