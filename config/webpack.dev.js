const webpack = require( 'webpack' );
const path = require( 'path' );
const configHelper = require('../helpers/config' );
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const config = require( '../helpers/package-config' );
const postCSSOptions = configHelper.getConfig( 'postcss.config.js' );
const babelOptions = configHelper.getConfig( 'babel.config.js' );

let plugins = [
	new webpack.ProvidePlugin( {
		jQuery: 'jquery',
		$: 'jquery'
	} ),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
];

//Loads a thread which verifies any TypeScripts on changes.
//Only use this if the project has a tsconfig.json file.
if ( configHelper.hasLocalOverride( 'tsconfig.json', true ) ) {
	plugins.push( new ForkTsCheckerWebpackPlugin() );
}

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-dev-server/client?https://localhost:3000',
		'webpack/hot/only-dev-server',
		'@babel/polyfill/noConflict',
		'./src/index.js'
	],
	mode: 'development',
	externals: {
		jquery: 'jQuery'
	},
	output: {
		path: path.resolve( config.workingDirectory, 'dist' ),
		filename: 'master.js',
		publicPath: 'https://localhost:3000/js/dist/',
		chunkFilename: '[name].js'
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json', '.pcss' ],
		modules: [
			path.resolve( config.workingDirectory, 'src' ),
			'node_modules'
		]
	},
	plugins: plugins,
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
							modules: true,
							importLoaders: 1,
							sourceMap: true,
							localIdentName: '[name]_[local]__[hash:base64:4]'
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
