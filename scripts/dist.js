process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require( 'webpack' );
const webpackConfig = require( '../helpers/config' ).getConfig( 'webpack.dist.js' );


async function build( webpackConfig ) {
	// Compiler Instance.
	const compiler = await webpack( webpackConfig );

	// Run the compiler.
	compiler.run( ( err, stats ) => {
		console.log( stats.toString() );
	} );

}
