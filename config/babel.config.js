module.exports = {
	cacheDirectory: true,
	presets: [
		[ '@babel/preset-env', {
			corejs: {
				version: '3.8',
			},
			shippedProposals: true,
			targets: 'defaults',
			useBuiltIns: 'usage',
		} ],
		'@babel/preset-react',
		'@babel/preset-typescript',
	],
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		'react-hot-loader/babel',
	],
};

