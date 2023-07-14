const browserslist = require( 'browserslist' );
const {getBrowsersList, getDefaultBrowsersList} = require( '../helpers/config' );
const path = require( 'path' );

const help = `
	List browsers being targeted by Babel and PostCSS.

	Standard browserslist configurations will be honored.
	If no configuration is provided, this falls back to @wordpress/browserslist-config.

	Usage: lipemat-js-boilerplate browserslist [options]

	--help, -h       Show help menu.`;

const args = process.argv.slice( 2 );
if ( args[ 0 ] && ( '-h' === args[ 0 ] || '--help' === args[ 0 ] ) ) {
	console.log( help );
	process.exit( 0 );
}


const provided = getDefaultBrowsersList() || browserslist.loadConfig( {
	path: path.resolve( '.' ),
} );

console.log( '' );
console.log( 'JS Provided Browserslist' );
console.table( provided );

console.log( '' );
console.log( 'JS Included Browsers' );
console.table( browserslist( provided, {
	env: 'production',
} ) );

console.log( '' );
console.log( 'JS Browser Coverage' );
console.table( browserslist.coverage( browserslist( provided, {
	env: 'production',
} ) ) );
