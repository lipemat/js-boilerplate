import {type Configuration as WebpackConfig, ProvidePlugin, type WebpackPluginInstance} from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import {getBrowsersList, getConfig, getTsConfigFile} from '../helpers/config';
import {getEntries} from '../helpers/entries';
import {getPackageConfig} from '@lipemat/js-boilerplate-shared';
import type {BabelConfig} from './babel.config';

const postcssOptions = getConfig( 'postcss.config' );
const babelOptions: BabelConfig = getConfig( 'babel.config' );
const cssLoaderOptions = getConfig( 'css-loader.config' );
const devServerOptions = getConfig( 'dev-server.config' );

// To support React Fast Refresh.
babelOptions.plugins?.unshift( 'react-refresh/babel' );


const plugins: WebpackPluginInstance[] = [
	new ProvidePlugin( {
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
						loader: path.resolve( __dirname, '../lib/css-module-types.ts' ),
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
						return loader.loader !== path.resolve( __dirname, '../lib/css-module-types.ts' );
					}
					return true;
				} ),
			},

		],
	},
};

export default config;
