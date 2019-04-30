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
	'plugins': [
		'react-hooks'
	],
	'extends': [
		'wordpress',
		'plugin:react/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 7,
		'sourceType': 'module'
	},
	"overrides": [ {
		'files': [ '**/*.ts', '**/*.tsx' ],
		'plugins': [
			'@typescript-eslint'
		],
		//Rules to override the standard JS ones when we get undesired results for TypeScript may be found here
		//@link https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
		'rules': {
			'@typescript-eslint/no-unused-vars': 'error',
			'semi': [ 0 ],
			'no-magic-numbers': [ 0 ]
		}
	} ],
	'rules': {
		'camelcase': [ 2, {'properties': 'never'} ],
		"indent": [1, "tab", {"SwitchCase": 1}]
		'lines-around-comment': [ 0 ],
		'react/no-unescaped-entities': [ 2, {'forbid': [ '>', '}' ]} ],
		'react/display-name': [ 0 ],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/prop-types': [ 2, {'skipUndeclared': true} ],
		'space-in-parens': [ 2, 'always' ],
		'yoda': [ 2, 'always', {'onlyEquality': true} ],
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
} catch (e) {
}

module.exports = config;
