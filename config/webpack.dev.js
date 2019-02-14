const webpack = require( 'webpack' );
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

let plugins = [
	new webpack.ProvidePlugin( {
		jQuery: 'jquery',
		$: 'jquery'
		//	_ : 'lodash', #import just the functions used to reduce size `import each from 'lodash/each`;
	} ), new webpack.DefinePlugin( {
		'process.env': {
			'NODE_ENV': JSON.stringify( process.env.NODE_ENV )
		}
	} ),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin(),
	new webpack.NoEmitOnErrorsPlugin()
];


let entry = [
	'react-hot-loader/patch',
	'webpack-dev-server/client?https://localhost:3000',
	'webpack/hot/only-dev-server',
	'./src/index.js'
];

let output = {
	path: path.resolve( __dirname, 'dist' ),
	filename: 'master.js',
	publicPath: 'https://localhost:3000/js/dist/',
	chunkFilename: '[name].js'
};


let cssLoader = [
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
		options: {
			sourceMap: true
		}
	}
];


module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: entry,
	mode: 'development',
	externals: {
		jquery: 'jQuery'
	},
	output: output,
	resolve: {
		extensions: [ '.js', '.jsx', 'json', '.pcss' ],
		modules: [
			path.resolve( __dirname, 'src' ),
			'node_modules'
		]
	},
	plugins: plugins,
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [ 'babel-loader' ],
				include: path.resolve( __dirname, 'src' ),
				exclude: /node_modules/
			},
			{
				test: /\.pcss$/,
				use: cssLoader
			}

		]
	}
};
