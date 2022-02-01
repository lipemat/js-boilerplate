process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require( 'webpack' );
const webpackConfig = require( '../helpers/config' ).getConfig( 'webpack.dist.js' );

async function build( config ) {
	// Compiler Instance.
	const compiler = await webpack( config );

	// Run the compiler.
	compiler.run( ( err, stats ) => {
		if ( err ) {
			throw err;
		}

		const info = stats.toJson();

		if ( stats.hasErrors() ) {
			console.error( info.errors );
			process.exit( 1 );
		} else {
			console.log( stats.toString( config.stats ) );
		}
	} );
}


build( webpackConfig );
