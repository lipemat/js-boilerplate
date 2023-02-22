const {getConfig} = require( '../helpers/config' );
const moduleHelpers = require( '../helpers/modules' );
const webpack = require( 'webpack' );
const path = require( 'path' );
const crypto = require( 'node:crypto' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const {CleanWebpackPlugin} = require( 'clean-webpack-plugin' );
const WebpackAssetsManifest = require( 'webpack-assets-manifest' );
const SriPlugin = require( 'webpack-subresource-integrity' );
const config = require( '../helpers/package-config' );
const {getEntries} = require( '../helpers/entries' );

const postcssOptions = getConfig( 'postcss.config.js' );
const babelOptions = getConfig( 'babel.config.js' );
const cssLoaderOptions = getConfig( 'css-loader.config.js' );

module.exports = {
	devtool: false,
	entry: getEntries(),
	mode: 'production',
	stats: {
		assets: true,
		assetsSort: 'size',
		assetsSpace: 100,
		cached: false,
		cachedAssets: true,
		children: false,
		colors: true,
		hash: false,
		groupAssetsByChunk: false,
		groupAssetsByEmitStatus: false,
		groupAssetsByExtension: false,
		groupAssetsByInfo: false,
		groupAssetsByPath: false,
		modules: false,
		timings: false,
		version: false,
	},
	// Displays warnings of size limits.
	performance: {
		hints: 'warning',
	},
	externals: {
		jquery: 'jQuery',
	},
	target: [ 'web', 'es5' ],
	output: {
		path: path.resolve( config.workingDirectory, 'dist' ),
		filename: '[name].js',
		publicPath: 'auto', // Change this if you want to use an external CDN etc.
		chunkFilename: '[name].[chunkhash].js',
		crossOriginLoading: 'anonymous',
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json', '.pcss' ],
		modules: [
			path.resolve( config.workingDirectory, 'src' ),
			'node_modules',
		],
	},
	plugins: [
		new webpack.ProvidePlugin( {
			jQuery: 'jquery',
			$: 'jquery',
		} ),
		new MiniCssExtractPlugin( {
			filename: '[name].css',
			chunkFilename: '[name].[chunkhash].css',
		} ),
		new CleanWebpackPlugin( {
			// Remove all files except the `.running` file created by "Start".
			cleanOnceBeforeBuildPatterns: [ '**/*', '!.running' ],
		} ),
		new SriPlugin( {
			hashFuncNames: [ 'sha384' ],
		} ),
		new WebpackAssetsManifest( {
			integrity: true,
			integrityHashes: [ 'sha384' ],
			output: 'manifest.json',
			// Add a `hash` so every item in the manifest for browser cache flushing.
			transform( assets ) {
				Object.keys( assets ).forEach( item => {
					assets[ item ].hash = crypto.createHash( 'md5' ).update( assets[ item ].integrity ).digest( 'hex' );
				} );
			},
		} ),
	],
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				loader: 'babel-loader',
				exclude: moduleHelpers.getBabelExcludeRegex(),
				options: babelOptions,
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
				],
			},
			{
				test: /\.pcss$/,
				use: [
					MiniCssExtractPlugin.loader,
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
