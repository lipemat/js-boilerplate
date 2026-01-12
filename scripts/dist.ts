import {getConfig} from '../helpers/config.js';
import webpack, {type Compiler, type Configuration, type Stats} from 'webpack';

const config: Configuration = await getConfig( 'webpack.dist.js' );

const compiler: Compiler | null = webpack( config );
if ( null === compiler ) {
	throw new Error( 'Failed to create the webpack compiler.' );
}
compiler.run( ( err: Error | null, stats: Stats | undefined ) => {
	if ( err || 'undefined' === typeof stats ) {
		throw err;
	}

	if ( stats.hasErrors() ) {
		console.error( stats.toString( config.stats ) );
		process.exit( 1 );
	} else {
		console.debug( stats.toString( config.stats ) );
	}
} );
