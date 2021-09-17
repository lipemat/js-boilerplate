const moduleHelpers = require( '../helpers/modules' );
const webpack = require( 'webpack' );
const path = require( 'path' );
const fs = require( 'fs' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const WebpackCleanupPlugin = require( '@lipemat/webpack-cleanup-plugin' );
const config = require( '../helpers/package-config' );
const postCSSOptions = require( '../helpers/config' ).getConfig( 'postcss.config.js' );
const babelOptions = require( '../helpers/config' ).getConfig( 'babel.config.js' );
const WebpackAssetsManifest = require( 'webpack-assets-manifest' );
const SriPlugin = require( 'webpack-subresource-integrity' );

const entry = {
	master: [
		'./src/index.js',
	],
};

// Loads an admin.js file if it exists @since 4.3.0
if ( fs.existsSync( path.resolve( config.workingDirectory, './src/admin.js' ) ) ) {
	entry.admin = [ ...entry.master ];
	entry.admin.splice( -1, 1, './src/admin.js' );
}

module.exports = {
	devtool: false,
	entry,
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
		publicPath: config.theme_path + 'js/dist/',
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
			filename: 'master.css',
			chunkFilename: '[name].[chunkhash].css',
		} ),
		new WebpackCleanupPlugin(),
		new SriPlugin( {
			hashFuncNames: [ 'sha256', 'sha384', 'sha512' ],
		} ),
		new WebpackAssetsManifest( {
			integrity: true,
			output: 'manifest.json',
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
				test: /\.pcss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								exportLocalsConvention: 'camelCase',
								localIdentName: '[contenthash:base64:5]',
							},
							url: false,
						},
					},
					{
						loader: '@lipemat/postcss-loader',
						options: postCSSOptions,
					},
				],
			},

		],
	},
};
