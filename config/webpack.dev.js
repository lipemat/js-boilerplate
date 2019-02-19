const webpack = require( 'webpack' );
const path = require( 'path' );
const config = require( '../helpers/package-config' );
const postCSSOptions = require('../helpers/config' ).getConfig( 'postcss.config.js' );
const babelOptions = require('../helpers/config' ).getConfig( 'babel.config.js' );

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?https://localhost:3000',
		'webpack/hot/only-dev-server',
		'./src/index.js'
	],
	mode: 'development',
	externals: {
		jquery: 'jQuery'
	},
	output: {
		path: path.resolve( config.workingDirectory, 'dist' ),
		filename: 'master.js',
		publicPath: 'https://localhost:3000/js/dist/',
		chunkFilename: '[name].js'
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
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
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							sourceMap: true,
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
