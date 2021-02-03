const eslint = require( 'eslint/lib/cli' );

eslint.execute( [ '', '', 'src', '--fix', '--ext', '.tsx,.ts,.js,.jsx' ] );
