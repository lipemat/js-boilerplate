import {getConfig} from '../helpers/config';
import webpack, {type Configuration, type Stats} from 'webpack';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const config: Configuration = getConfig( 'webpack.dist' );

const compiler = webpack( config );
compiler.run( ( err: Error | null, stats: Stats ) => {
	if ( err ) {
		throw err;
	}

	if ( stats.hasErrors() ) {
		console.error( stats.toString( config.stats ) );
		process.exit( 1 );
	} else {
		console.debug( stats.toString( config.stats ) );
	}
} );
