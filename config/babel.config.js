module.exports = {
	cacheDirectory: true,
	presets: [
		require( '@babel/preset-env' ),
		require( '@babel/preset-react' ),
		require( '@babel/preset-typescript' ),
	],
	plugins: [
		require( '@babel/plugin-syntax-dynamic-import' ),
		require( 'react-hot-loader/babel' ),
	],
};

