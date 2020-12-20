const webpack = require( 'webpack' );
const path = require( 'path' );
const fs = require( 'fs' );
const configHelper = require('../helpers/config' );
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const config = require( '../helpers/package-config' );
const postCSSOptions = configHelper.getConfig( 'postcss.config.js' );
const babelOptions = configHelper.getConfig( 'babel.config.js' );

// To allow line numbers to show up in console errors. @see React Error Boundaries.
babelOptions.plugins.unshift( '@babel/plugin-transform-react-jsx-source' );

let plugins = [
	new webpack.ProvidePlugin( {
		jQuery: 'jquery',
		$: 'jquery'
	} ),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
];

// Loads a thread which verifies any TypeScripts on changes.
// Only use this if the project has a tsconfig.json file.
if ( configHelper.hasLocalOverride( 'tsconfig.json', true ) ) {
	plugins.push( new ForkTsCheckerWebpackPlugin( {
		formatter: 'basic',
		logger: {
			devServer: false
		}
	} ) );
}

let entry = {
	master : [
		'webpack-dev-server/client?' + config.url + ':3000',
		'webpack/hot/only-dev-server',
		'core-js/stable',
		'regenerator-runtime/runtime',
		'./src/index.js'
	]
};

// Loads an admin.js file if it exists @since 5.0.0
if ( fs.existsSync( path.resolve( config.workingDirectory, './src/admin.js' ) ) ) {
	entry.admin = [...entry.master];
	entry.admin.splice( -1, 1, './src/admin.js' );
}

module.exports = {
	devtool: 'eval-cheap-module-source-map',
	entry: entry,
	mode: 'development',
	stats: 'minimal',
	externals: {
		jquery: 'jQuery'
	},
	output: {
		path: path.resolve( config.workingDirectory, 'dist' ),
		filename: '[name].js',
		publicPath: config.url + ':3000/js/dist/',
		chunkFilename: '[name].js'
	},
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
		extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json', '.pcss' ],
		modules: [
			path.resolve( config.workingDirectory, 'src' ),
			'node_modules'
		]
	},
	plugins: plugins,
	optimization: {
		moduleIds: 'named'
	},
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				loader: 'babel-loader',
				include: path.resolve( config.workingDirectory, 'src' ),
				exclude: /node_modules/,
				options: babelOptions
			},
			{
				test: /\.(j|t)sx?$/,
				include: /node_modules/,
				use: ['react-hot-loader/webpack'],
			},
			{
				test: /\.pcss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: '[name]__[local]__[contenthash:base64:1]',
							},
							sourceMap: true,
							url: false
						}
					},
					{
						loader: '@lipemat/postcss-loader',
						options: postCSSOptions
					}
				]
			}

		]
	}
};
