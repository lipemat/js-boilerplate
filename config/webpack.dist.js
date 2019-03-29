const webpack = require( 'webpack' );
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const WebpackCleanupPlugin = require( '@lipemat/webpack-cleanup-plugin' );
const config = require( '../helpers/package-config' );
const postCSSOptions = require('../helpers/config' ).getConfig( 'postcss.config.js' );
const babelOptions = require('../helpers/config' ).getConfig( 'babel.config.js' );

module.exports = {
	devtool: false,
	entry: [
		'@babel/polyfill/noConflict',
		'./src/index.js'
	],
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
		extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json', '.pcss' ],
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
			filename: 'master.css'
		} ),
		new WebpackCleanupPlugin()
	],
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
						loader: '@lipemat/postcss-loader',
						options: postCSSOptions
					}
				]
			}

		]
	}
};
