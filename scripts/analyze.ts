import {getConfig} from '../helpers/config.js';
import webpack from 'webpack';
import Statoscope from '@statoscope/webpack-plugin';
import fs from 'fs';
import minimist from 'minimist';


const help = `
Uses Statoscope to visualize the size of the project's output files.

Usage: lipemat-js-boilerplate analyze [--stats-only|--help]

  --help, -h : Show the help menu.
  --stats-only: Generate a stats.json file for use with 
                https://statoscope.tech for comparing diffs between builds.
	
`;

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Command line arguments.
const flags = minimist( process.argv.slice( 2 ) );
const workingDirectory = fs.realpathSync( process.cwd() );
const statsDir = workingDirectory + '/node_modules/.cache/statoscope';
const webpackConfig = await getConfig( 'webpack.dist.js' );
// @ts-expect-error TS2339 ESM imports of Statscrope resuire translation of `.default.
const StatoscopeWebpackPlugin: typeof Statoscope = Statoscope.default;

if ( true === flags.h || true === flags.help ) {
	console.debug( help );
	process.exit( 0 );
}


function analyze() {
	const statsOnly: boolean = true === ( flags[ 'stats-only' ] ?? false );

	webpackConfig.plugins?.push( new StatoscopeWebpackPlugin( {
		saveOnlyStats: statsOnly,
		saveStatsTo: statsOnly ? workingDirectory + '/stats-[hash].json' : statsDir + '/stats-[hash].json',
		saveReportTo: statsDir + '/stats-[hash].html',
	} ) );

	// Use the default webpack stats configuration.
	delete webpackConfig.stats;

	webpack( webpackConfig )?.run( ( err, stats ) => {
		if ( err ) {
			throw err;
		}
		if ( 'undefined' === typeof stats ) {
			return;
		}
		if ( stats.hasErrors() ) {
			process.exit( 1 );
		}
	} );
}

analyze();
