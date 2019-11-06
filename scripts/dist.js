process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const fs = require( 'fs' );
const path = require( 'path' );
const webpack = require( 'webpack' );
const webpackConfig = require( '../helpers/config' ).getConfig( 'webpack.dist.js' );
const packageConfig = require( '../helpers/package-config' );

/**
 * Bump the .revision file to the latest
 * Useful when PWA is active because Chrome will reload when developing via workspaces
 * but reloading the page will get the old "Application" cached resources unless we
 * bump the revision.
 * All helps with sha integrity issues on developing locally.
 */
function updateRevisionFile() {
	if ( packageConfig.root ) {
		fs.writeFile( path.resolve( packageConfig.root, '.revision' ), Date.now(), err => {
			if ( err ) {
				throw err;
			}
			console.log( '\n', 'Generated .revision file', '\n' );
		} );
	}
}


async function build( config ) {
	// Compiler Instance.
	const compiler = await webpack( config );

	// Run the compiler.
	compiler.run( ( err, stats ) => {
		if ( err ) {
			throw err;
		}

		const info = stats.toJson();
		if (stats.hasWarnings()) {
			console.warn(info.warnings.toString());
		}

		if ( stats.hasErrors() ) {
			console.error(info.errors.toString());
		} else {
			console.log( stats.toString( config.stats ) );
		}

		updateRevisionFile();
	} );
}


build( webpackConfig );

