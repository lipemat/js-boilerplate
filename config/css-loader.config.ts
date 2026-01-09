import {getLocalIdent, usingShortCssClasses} from '@lipemat/js-boilerplate-shared/helpers/css-classnames';
import type {Config, Mode} from '@lipemat/js-boilerplate-shared/types/css-loader';
import type {AtLeast} from '@lipemat/js-boilerplate-shared/types/utility';

export type CssLoaderConfig = AtLeast<Config, 'importLoaders' | 'modules' | 'sourceMap' | 'url'>

/**
 * Options for the Webpack `css-loader`.
 *
 * Extracted to its on file to allow easy overrides.
 */

/**
 * Default to :global for classes in "global" or "pcss" directories.
 *
 * @param {string} resourcePath
 * @return {string}
 */
const mode = ( resourcePath: string ): Mode => {
	if ( /globals?\//i.test( resourcePath.replace( /\\/g, '/' ) ) ) {
		return 'global';
	}
	if ( /pcss?\//i.test( resourcePath.replace( /\\/g, '/' ) ) ) {
		return 'global';
	}
	return 'local';
};

const cssLoader: CssLoaderConfig = {
	importLoaders: 1,
	modules: {
		exportLocalsConvention: 'camelCase',
		localIdentName: 'Ⓜ[name]__[local]__[contenthash:base64:2]',
		mode,
	},
	sourceMap: true,
	url: false,
};

if ( 'production' === process.env.NODE_ENV ) {
	cssLoader.modules = {
		exportLocalsConvention: 'camelCase',
		// Use short CSS Classes if enabled.
		...usingShortCssClasses() ? {getLocalIdent} : {},
		// Hash used when short CSS classes are not enabled.
		localIdentName: '[contenthash:base64:5]',
		mode,
	}
	cssLoader.sourceMap = false;
}

export default cssLoader;
