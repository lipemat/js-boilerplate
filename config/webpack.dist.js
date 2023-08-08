const webpack = require( 'webpack' );
const path = require( 'path' );
const CompressionPlugin = require( 'compression-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const {CleanWebpackPlugin} = require( 'clean-webpack-plugin' );
const WebpackAssetsManifest = require( 'webpack-assets-manifest' );
const {SubresourceIntegrityPlugin} = require( 'webpack-subresource-integrity' );
const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );
const WebpackAssetsHash = require( '../helpers/WebpackAssetsHash' );

const {getConfig, getTsConfigFile, getBrowsersList} = require( '../helpers/config' );
const moduleHelpers = require( '../helpers/modules' );
const config = require( '../helpers/package-config' );
const {getEntries} = require( '../helpers/entries' );

const postcssOptions = getConfig( 'postcss.config.js' );
const babelOptions = getConfig( 'babel.config.js' );
const cssLoaderOptions = getConfig( 'css-loader.config.js' );

const ManifestPlugin = new WebpackAssetsManifest( {
	integrity: true,
	integrityHashes: [ 'sha384' ],
	output: 'manifest.json',
} );

const plugins = [
	new webpack.ProvidePlugin( {
		jQuery: 'jquery',
		$: 'jquery',
	} ),
	new MiniCssExtractPlugin( {
		filename: '[name].css',
		chunkFilename: '[name].[contenthash].css',
	} ),
	new CleanWebpackPlugin( {
		// Remove all files except the `.running` file created by "Start".
		cleanOnceBeforeBuildPatterns: [ '**/*', '!.running' ],
	} ),
	new ForkTsCheckerWebpackPlugin( {
		formatter: 'basic',
		typescript: {
			configFile: getTsConfigFile(),
		},
	} ),
	new SubresourceIntegrityPlugin( {
		hashFuncNames: [ 'sha384' ],
	} ),
	new WebpackAssetsHash( ManifestPlugin ),
	ManifestPlugin,
];

/**
 * Generate .br files if enabled.
 *
 * @note Will only generate files if 20% or more size is gained.
 * @see https://webpack.js.org/plugins/compression-webpack-plugin/#using-brotli
 */
if ( config.brotliFiles ) {
	plugins.push( new CompressionPlugin( {
		algorithm: 'brotliCompress',
		deleteOriginalAssets: false,
		test: /\.(js|css)$/,
	} ) );
}


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
	optimization: {
		moduleIds: 'deterministic',
	},
	// Displays warnings of size limits.
	performance: {
		hints: 'warning',
	},
	externals: {
		jquery: 'jQuery',
	},
	target: 'browserslist:' + getBrowsersList().join( ', ' ),
	output: {
		path: path.resolve( config.workingDirectory, 'dist' ),
		filename: '[name].js',
		publicPath: 'auto', // Change this if you want to use an external CDN etc.
		chunkFilename: '[name].[contenthash].js',
		crossOriginLoading: 'anonymous',
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json', '.pcss' ],
		modules: [
			path.resolve( config.workingDirectory, 'src' ),
			'node_modules',
		],
	},
	plugins,
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
