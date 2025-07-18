import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import {WebpackAssetsManifest} from 'webpack-assets-manifest';
import {SubresourceIntegrityPlugin} from 'webpack-subresource-integrity';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import WebpackAssetsHash from '../helpers/WebpackAssetsHash';
import {type Configuration as WebpackConfig, ProvidePlugin, WebpackPluginInstance} from 'webpack';

import {getBrowsersList, getConfig, getTsConfigFile} from '../helpers/config';
import {getEntries} from '../helpers/entries';
import {getPackageConfig} from '../helpers/package-config';

const postcssOptions = getConfig( 'postcss.config' );
const babelOptions = getConfig( 'babel.config' );
const cssLoaderOptions = getConfig( 'css-loader.config' );

const ManifestPlugin = new WebpackAssetsManifest( {
	integrity: true,
	integrityHashes: [ 'sha384' ],
	output: 'manifest.json',
} );

const plugins: WebpackPluginInstance[] = [
	new ProvidePlugin( {
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
	new SubresourceIntegrityPlugin( {
		hashFuncNames: [ 'sha384' ],
	} ),
	new WebpackAssetsHash( ManifestPlugin ),
	ManifestPlugin,
];

// Loads a thread, which verifies any TypeScript if a project has a "tsconfig.json" file.
if ( '' !== getTsConfigFile() ) {
	plugins.push( new ForkTsCheckerWebpackPlugin( {
		formatter: 'basic',
		typescript: {
			configFile: getTsConfigFile(),
		},
	} ) );
}

/**
 * Generate .br files if enabled.
 *
 * @note Will only generate files if 20% or more size is gained.
 * @see https://webpack.js.org/plugins/compression-webpack-plugin/#using-brotli
 */
if ( getPackageConfig().brotliFiles ) {
	plugins.push( new CompressionPlugin( {
		algorithm: 'brotliCompress',
		deleteOriginalAssets: false,
		test: /\.(js|css)$/,
	} ) );
}


const config: WebpackConfig = {
	devtool: false,
	entry: getEntries(),
	mode: 'production',
	stats: {
		assets: true,
		assetsSort: 'size',
		assetsSpace: 100,
		cachedModules: false,
		cachedAssets: true,
		children: false,
		colors: {
			// Change green to yellow, as my default terminal color is green.
			green: '\u001b[93m',
		},
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
		path: path.resolve( getPackageConfig().workingDirectory, 'dist' ),
		filename: '[name].js',
		publicPath: 'auto', // Change this if you want to use an external CDN etc.
		chunkFilename: '[name].[contenthash].js',
		crossOriginLoading: 'anonymous',
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json', '.pcss' ],
		modules: [
			path.resolve( getPackageConfig().workingDirectory, 'src' ),
			'node_modules',
		],
	},
	plugins,
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.[jt]sx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: babelOptions,
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'clean-css-loader',
						options: {
							level: 2,
							sourceMap: false,
						},
					},
				],
			},
			{
				test: /\.pcss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: '@teamsupercell/typings-for-css-modules-loader',
						options: {
							banner: '// Autogenerated by typings-for-css-modules-loader.',
							disableLocalsExport: true,
							prettierConfigFile: path.resolve( __dirname, '../helpers/.prettierrc.json' ),
						},
					},
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
				].filter( loader => {
					if ( ! getPackageConfig().cssTsFiles && 'object' === typeof loader ) {
						return loader.loader !== '@teamsupercell/typings-for-css-modules-loader';
					}
					return true;
				} ),
			},
		],
	},
};

export default config;
module.exports = config;
