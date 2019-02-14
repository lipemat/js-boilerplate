let webpack = require( 'webpack' );
let path = require( 'path' );
let DEBUG = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
let WebpackCleanupPlugin = require( 'webpack-cleanup-plugin' );
//configs for things like theme_path
let config = require( './package.json' );
try {
	let localConfig = require( './local-config.json' );
	for ( let attr in localConfig ) {
		config[ attr ] = localConfig[ attr ];
	}
} catch ( e ) {
}

let entry = [];
let cssLoader = '';
let devtool = '';
let output = {};
let mode = 'development';

let plugins = [
	new webpack.ProvidePlugin( {
		jQuery: 'jquery',
		$: 'jquery'
		//	_ : 'lodash', #import just the functions used to reduce size `import each from 'lodash/each`;
	} ), new webpack.DefinePlugin( {
		'process.env': {
			'NODE_ENV': JSON.stringify( process.env.NODE_ENV )
		}
	} )
];

if ( DEBUG ) {
	entry = [
		'react-hot-loader/patch',
		'webpack-dev-server/client?https://localhost:3000',
		'webpack/hot/only-dev-server',
		//'babel-polyfill', conflicts with WPSEO so added to index.js instead'babel-polyfill',
		'./src/index.js'
	];

	output = {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'master.js',
		publicPath: 'https://localhost:3000/js/dist/',
		chunkFilename: '[name].js'
	};

	devtool = 'cheap-module-eval-source-map';
	plugins.push( new webpack.HotModuleReplacementPlugin() );
	plugins.push( new webpack.NamedModulesPlugin() );
	plugins.push( new webpack.NoEmitOnErrorsPlugin() );

	//using a custom postcss-loader that I forked to get browser editing
	//to work with css modules!!
	cssLoader = [
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

} else {
	plugins.push( new MiniCssExtractPlugin( {
		filename: '[hash].css'
	} ) );
	plugins.push( new WebpackCleanupPlugin() );
	mode = 'production';
	devtool = false;
	entry = [
		//'babel-polyfill', conflicts with WPSEO so added to index.js instead'babel-polyfill',
		'./src/index'
	];
	cssLoader = [
		MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				modules: true,
				importLoaders: 1,
				localIdentName: '[name]_[local]__[hash:base64:4]'
			}
		},
		'postcss-loader'
	];

	output = {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'master.js',
		publicPath: config.theme_path + 'js/dist/',
		chunkFilename: '[name].[chunkhash].js'
	};
}


module.exports = {
	devtool: devtool,
	entry: entry,
	mode: mode,
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
