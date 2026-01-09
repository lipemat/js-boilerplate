import webpack from 'webpack';
import {getConfig} from '../helpers/config';
import path from 'path';

const help = `
Validate CSS modules using .d.ts definition files for each CSS module.

- Generates .d.ts files for each CSS module.
- Runs \`dist\` to validate compilation using TS.
	
@deprecated Not needed anymore now PHPStorm supports .d.ts files for CSS modules.

@see .github/workflows/pull-request-lint-action.yml

Usage: lipemat-js-boilerplate validate-css-modules

--help, -h Show the help menu.`;

const args = process.argv.slice( 3 );
if ( '-h' === args[ 0 ] || '--help' === args[ 0 ] ) {
	console.debug( help );
	process.exit( 0 );
}

async function validate() {
	let webpackConfig = getConfig( 'webpack.dist' );
	webpackConfig.stats = 'errors-warnings';

	// Add CSS module typings generation to webpack config.
	// @ts-expect-error
	webpackConfig.module?.rules?.map( ( rule: webpack.RuleSetRule ) => {
		if ( rule.test?.toString() === /\.pcss$/.toString() ) {
			// @ts-ignore
			rule.use?.splice( 1, 0, {
				loader: path.resolve( __dirname, '../lib/css-module-types.ts' ),
			} )
		}
		return rule;
	} )

	// Wait for the generation to finish before continuing.
	await new Promise( ( resolve, reject ) => {
		webpack( webpackConfig )?.run( ( err, stats ) => {
			if ( err ) {
				reject( err );
			}

			if ( stats && stats.hasErrors() ) {
				console.error( stats.toString( webpackConfig.stats ) );
				process.exit( 1 );
			}
			resolve( stats );
		} );
	} );

	console.debug( '>>> CSS Module definitions generated.' );

	// A fresh config for CSS validation.
	webpackConfig = getConfig( 'webpack.dist' );
	webpackConfig.stats = 'errors-warnings';
	webpack( webpackConfig )?.run( ( err, stats ) => {
		if ( err ) {
			throw err;
		}

		if ( stats && stats.hasErrors() ) {
			console.error( stats.toString( webpackConfig.stats ) );
			process.exit( 1 );
		}
		console.debug( '>>> CSS validation completed.' );
	} );
}


validate();
