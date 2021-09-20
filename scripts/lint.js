const eslint = require( 'eslint/lib/cli' );
const packageConfig = require( '../helpers/package-config' );

eslint.execute( [ '', '', packageConfig.workingDirectory + '/src', '--fix', '--ext', '.tsx,.ts,.js,.jsx' ] );
