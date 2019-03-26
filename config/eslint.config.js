const packageConfig = require( '../helpers/package-config' );
const path = require( 'path' );

/**
 * To create a custom config to extend, eslint requires a node module starting with
 * the name `eslint-config-`.
 * To get around this requirement we pass the full path to the `extends` declaration in
 * our project's `.eslintrc`.
 *
 * We are then able to make project specific adjustments to the `.eslintrc`.
 *
 * @see ../templates/.eslintrc
 *
 */

let config = {
	'extends': [
		'wordpress',
		'plugin:react/recommended'
	],
	'parser': 'babel-eslint',
	'parserOptions': {
		'ecmaVersion': 7,
		'sourceType': 'module'
	},
	'rules': {
		'camelcase': [ 2, {'properties': 'never'} ],
		'lines-around-comment': [ 0 ],
		'react/no-unescaped-entities': [ 2, {'forbid': [ '>', '}' ]} ],
		'space-in-parens': [ 2, 'always' ],
		'react/display-name': [ 0 ],
		'react/prop-types': [ 2, {'skipUndeclared': true} ],
		'yoda': [ 2, 'always', {'onlyEquality': true} ]
	},
	'settings': {
		'react': {
			'version': '16.8'
		}
	}
};

/**
 * Allows overriding configurations in the project `/config/eslint.config.js` file.
 * We don't actually need to do this because .eslintrc is already an override of this
 * file but we support it anyway to keep things consistent.
 *
 */
try {
	let localConfig = require( path.resolve( packageConfig.workingDirectory + '/config', 'eslint.config.js' ) );
	config = {...config, ...localConfig};
} catch ( e ) {
}

module.exports = config;
