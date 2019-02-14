/**
 * Using a custom transform to work around the .babelrc requirement
 *
 * @link https://github.com/facebook/jest/issues/1468#issuecomment-276753756
 */

module.exports = require( 'babel-jest' ).createTransformer( {
	'presets': [
		'env',
		'stage-2',
		'react'
	],
	'plugins': [
		'babel-plugin-dynamic-import-node'
	]
} );
