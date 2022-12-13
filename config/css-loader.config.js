const config = require( '../helpers/package-config' );
const {getLocalIdent} = require( '../helpers/css-classnames' );

/**
 * Options for the Webpack `css-loader`.
 *
 * Extracted to its on file to allow easy overrides.
 *
 * @since 8.6.0
 */

let cssLoader = {
	importLoaders: 1,
	modules: {
		exportLocalsConvention: 'camelCase',
		localIdentName: 'Ⓜ[name]__[local]__[contenthash:base64:2]',
		// Default to :global for classes in "global" or "pcss" directories.
		mode: resourcePath => {
			if ( /globals?\//i.test( resourcePath.replace( /\\/g, '/' ) ) ) {
				return 'global';
			}
			if ( /pcss?\//i.test( resourcePath.replace( /\\/g, '/' ) ) ) {
				return 'global';
			}
			return 'local';
		},
	},
	sourceMap: true,
	url: false,
};

if ( 'production' === process.env.NODE_ENV ) {
	cssLoader = {
		importLoaders: 1,
		modules: {
			exportLocalsConvention: 'camelCase',
			// Use short CSS Classes if enabled.
			...config.shortCssClasses ? {getLocalIdent} : {},
			// Hash used when short CSS classes are not enabled.
			localIdentName: '[contenthash:base64:5]',
			// Default to :global for classes in "global" directories.
			mode: resourcePath => {
				return /globals?\//i.test( resourcePath.replace( /\\/g, '/' ) ) ? 'global' : 'local';
			},
		},
		url: false,
	};
}

module.exports = cssLoader;
