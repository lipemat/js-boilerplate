import webpack from 'webpack';
import {getConfig} from '../helpers/config.js';
import path from 'path';

const help = `
Validate CSS modules using .d.ts definition files for each CSS module.

- Generates .d.ts files for each CSS module.
- Runs \`dist\` to validate compilation using TS.
	
@notice PHPStorm will not support click through to CSS modules if the .pcss.d.ts files are present so this script should only be run in CI.

@see .github/workflows/pull-request-lint-action.yml

Usage: lipemat-js-boilerplate validate-css-modules

--help, -h Show help menu.`;

const args = process.argv.slice( 3 );
if ( '-h' === args[ 0 ] || '--help' === args[ 0 ] ) {
	console.log( help );
	process.exit( 0 );
}

async function validate() {
	let webpackConfig: webpack.Configuration = getConfig( 'webpack.dist' );
	webpackConfig.stats = 'errors-warnings';

	// Add CSS module typings generation to webpack config.
	webpackConfig.module?.rules?.map( ( rule: webpack.RuleSetRule ) => {
		if ( rule.test?.toString() === /\.pcss$/.toString() ) {
			// @ts-ignore
			rule.use?.splice( 1, 0, {
				loader: '@teamsupercell/typings-for-css-modules-loader',
				options: {
					disableLocalsExport: true,
					prettierConfigFile: path.resolve( __dirname, '../helpers/.prettierrc.json' ),
				},
			} )
		}
		return rule;
	} )

	// Wait for generation to finish before continuing.
	await new Promise( ( resolve, reject ) => {
		webpack( webpackConfig ).run( ( err, stats ) => {
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

	console.log( '>>> CSS Module definitions generated.' );

	// A fresh config for CSS validation.
	webpackConfig = getConfig( 'webpack.dist.js' );
	webpackConfig.stats = 'errors-warnings';
	webpack( webpackConfig ).run( ( err, stats ) => {
		if ( err ) {
			throw err;
		}

		if ( stats && stats.hasErrors() ) {
			console.error( stats.toString( webpackConfig.stats ) );
			process.exit( 1 );
		}
		console.log( '>>> CSS validation completed.' );
	} );
}


validate();
