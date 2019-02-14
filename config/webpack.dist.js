const webpack = require( 'webpack' );
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const WebpackCleanupPlugin = require( 'webpack-cleanup-plugin' );
const config = require( '../helpers/package-config' );
const postCSSOptions = require('../config/postcss.config' );
const babelOptions = require('../config/babel.config' );

module.exports = {
	devtool: false,
	entry: path.resolve( config.workingDirectory, './src/index' ),
	mode: 'production',
	externals: {
		jquery: 'jQuery'
	},
	output: {
		path: path.resolve( config.workingDirectory, 'dist' ),
		filename: 'master.js',
		publicPath: config.theme_path + 'js/dist/',
		chunkFilename: '[name].[chunkhash].js'
	},
	resolve: {
		extensions: [ '.js', '.jsx', 'json', '.pcss' ],
		modules: [
			path.resolve( config.workingDirectory, 'src' ),
			'node_modules'
		]
	},
	plugins: [
		new webpack.ProvidePlugin( {
			jQuery: 'jquery',
			$: 'jquery'
		} ),
		new MiniCssExtractPlugin( {
			filename: '[hash].css'
		} ),
		new WebpackCleanupPlugin()
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.resolve( config.workingDirectory, 'src' ),
				exclude: /node_modules/,
				query: babelOptions
			},
			{
				test: /\.pcss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]_[local]__[hash:base64:4]'
						}
					},
					{
						loader: 'postcss-loader',
						options: postCSSOptions
					}
				]
			}

		]
	}
};
