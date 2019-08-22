const webpack = require( 'webpack' );
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const WebpackCleanupPlugin = require( '@lipemat/webpack-cleanup-plugin' );
const config = require( '../helpers/package-config' );
const postCSSOptions = require( '../helpers/config' ).getConfig( 'postcss.config.js' );
const babelOptions = require( '../helpers/config' ).getConfig( 'babel.config.js' );
const WebpackAssetsManifest = require( 'webpack-assets-manifest' );
const SriPlugin = require( 'webpack-subresource-integrity' );

module.exports = {
	devtool: false,
	entry: [
		'core-js/stable',
		'regenerator-runtime/runtime',
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
		chunkFilename: '[name].[chunkhash].js',
		crossOriginLoading: 'anonymous'
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
			filename: 'master.css',
			chunkFilename: '[name].[chunkhash].css'
		} ),
		new WebpackCleanupPlugin(),
		new SriPlugin( {
			hashFuncNames: [ 'sha256', 'sha384', 'sha512' ]
		} ),
		new WebpackAssetsManifest( {integrity: true} )
		// @note if using BundleAnalyzerPlugin remove the optimization config.
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			maxSize: 500000 // @note if using BundleAnalyzerPlugin remove this line during testing.
		}
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
				test: /\.pcss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							localIdentName: '[hash:base64:5]',
							modules: true,
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
