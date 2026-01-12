import webpack, {type Configuration as WebpackConfig, type WebpackPluginInstance} from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import {getBrowsersList, getConfig, getTsConfigFile} from '../helpers/config.js';
import {getEntries} from '../helpers/entries.js';
import {getPackageConfig} from '@lipemat/js-boilerplate-shared/helpers/package-config.js';
import type {BabelConfig} from './babel.config';
import {fileURLToPath} from 'node:url';
import {getPostCSSConfig} from '@lipemat/js-boilerplate-shared/helpers/postcss-config.js';

const postcssOptions = getPostCSSConfig( 'develop' );
const babelOptions: BabelConfig = await getConfig( 'babel.config.js' );
const cssLoaderOptions = await getConfig( 'css-loader.config.js' );
const devServerOptions = await getConfig( 'dev-server.config.js' );

// To support React Fast Refresh.
babelOptions.plugins?.unshift( 'react-refresh/babel' );


const plugins: WebpackPluginInstance[] = [
	new webpack.ProvidePlugin( {
		jQuery: 'jquery',
		$: 'jquery',
	} ),
	new ReactRefreshWebpackPlugin(),
];

// Loads a thread, which verifies any TypeScript on changes if the project has a "tsconfig.json" file.
if ( '' !== getTsConfigFile() ) {
	plugins.push( new ForkTsCheckerWebpackPlugin( {
		devServer: false,
		formatter: 'basic',
		typescript: {
			configFile: getTsConfigFile(),
		},
	} ) );
}

const config: WebpackConfig = {
	devtool: 'eval-source-map',
	entry: getEntries(),
	mode: 'development',
	stats: 'minimal',
	externals: {
		jquery: 'jQuery',
	},
	target: 'browserslist:' + getBrowsersList().join( ', ' ),
	output: {
		path: path.resolve( getPackageConfig().workingDirectory, 'dist' ),
		filename: '[name].js',
		publicPath: getPackageConfig().url + ':' + devServerOptions.port + '/js/dist/',
		chunkFilename: '[name].js',
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json', '.pcss' ],
		modules: [
			path.resolve( getPackageConfig().workingDirectory, 'src' ),
			'node_modules',
		],
	},
	plugins,
	optimization: {
		moduleIds: 'named',
		emitOnErrors: false,
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.[jt]sx?$/,
				loader: 'babel-loader',
				include: path.resolve( getPackageConfig().workingDirectory, 'src' ),
				exclude: /node_modules/,
				options: babelOptions,
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
			{
				test: /\.pcss$/,
				use: [
					'style-loader',
					{
						loader: fileURLToPath( new URL( '../lib/css-module-types.js', import.meta.url ) ),
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
						return loader.loader !== fileURLToPath( new URL( '../lib/css-module-types.js', import.meta.url ) );
					}
					return true;
				} ),
			},

		],
	},
};

export default config;
