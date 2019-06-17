/**
 * Using a custom transform to work around the .babelrc requirement.
 *
 * This way we don't have to have a .babelrc in the root of the project.
 * Anything that would normally go in a .babelrc for testing may go here.
 *
 * @link https://github.com/facebook/jest/issues/1468#issuecomment-276753756
 */
module.exports = require( 'babel-jest' ).createTransformer( {
	"presets": [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript"
    ]
});
