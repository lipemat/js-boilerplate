import type {PostCSSConfig} from '../../../config/postcss.config.cts';
import {jest} from '@jest/globals';

/**
 * @notice We can't reset the modules of MiniCssExtractPlugin conflicts with
 *         itself. Instead, we isolate other configurations to allow them to
 *         load fresh each time.
 */
export function getPostCSSConfig(): PostCSSConfig {
	// @ts-ignore
	let config: PostCSSConfig = {};
	jest.isolateModules( () => {
		config = require( '../../../config/postcss.config.cts' ).default;
	} );
	return config;
}

afterEach( () => {
	process.env.NODE_ENV = 'test';
} );


describe( 'PostCSS Pretty lib plugin', () => {
	test( 'Plugin is included during development', () => {
		expect( getPostCSSConfig().plugins ).toContainEqual( expect.objectContaining( {postcssPlugin: 'js-boilerplate/postcss-pretty'} ) );
	} );


	test( 'Plugin is not included during production', () => {
		process.env.NODE_ENV = 'production';
		expect( getPostCSSConfig().plugins ).not.toContainEqual( expect.objectContaining( {postcssPlugin: 'js-boilerplate/postcss-pretty'} ) );
	} );
} );
