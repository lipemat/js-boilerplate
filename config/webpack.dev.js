const webpack = require( 'webpack' );
const ReactRefreshWebpackPlugin = require( '@pmmmwh/react-refresh-webpack-plugin' );
const path = require( 'path' );
const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );
const {getPackageConfig} = require( '../helpers/package-config' );
const {getEntries} = require( '../helpers/entries' );
const {getConfig, getTsConfigFile, getBrowsersList} = require( '../helpers/config' );

const postcssOptions = getConfig( 'postcss.config.js' );
const babelOptions = getConfig( 'babel.config.js' );
const cssLoaderOptions = getConfig( 'css-loader.config.js' );
const devServerOptions = getConfig( 'dev-server.config.js' );

// To allow line numbers to show up in console errors. @see React Error Boundaries.
babelOptions.plugins.unshift( '@babel/plugin-transform-react-jsx-source' );
// To support React Fast Refresh.
babelOptions.plugins.unshift( 'react-refresh/babel' );

const plugins = [
	new webpack.ProvidePlugin( {
		jQuery: 'jquery',
		$: 'jquery',
	} ),
	new ReactRefreshWebpackPlugin(),
];

// Loads a thread, which verifies any TypeScripts on changes if the
// project has a "tsconfig.json" file.
if ( '' !== getTsConfigFile() ) {
	plugins.push( new ForkTsCheckerWebpackPlugin( {
		devServer: false,
		formatter: 'basic',
		typescript: {
			configFile: getTsConfigFile(),
		},
	} ) );
}

module.exports = {
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
		rules: [
			{
				test: /\.[jt]sx?$/,
				loader: 'babel-loader',
				include: path.resolve( getPackageConfig().workingDirectory, 'src' ),
				exclude: /node_modules/,
				options: babelOptions,
			},
			{
				test: /\.[jt]sx?$/,
				include: /node_modules/,
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
					if ( ! getPackageConfig().cssTsFiles ) {
						return loader.loader !== '@teamsupercell/typings-for-css-modules-loader';
					}
					return true;
				} ),
			},

		],
	},
};
