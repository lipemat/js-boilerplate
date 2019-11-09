## The Start Of A Beautiful JS App

<p>
<a href="https://www.npmjs.com/package/@lipemat/js-boilerplate">
<img alt="npm" src="https://img.shields.io/npm/v/@lipemat/js-boilerplate.svg">
</a>
    <img alt="node" src="https://img.shields.io/node/v/@lipemat/js-boilerplate.svg">
</p>


A zero configuration starting point for a React or non React app. 

### Installation
```bash
yarn add @lipemat/js-boilerplate
```

### Usage
Add the following to your package.json. (this may also be found in the `templates` directory.

```json
{
  "theme_path": "/wp-content/themes/core/",
  "scripts": {
    "dist": "lipemat-js-boilerplate dist",
    "start": "lipemat-js-boilerplate start",
    "lint": "lipemat-js-boilerplate lint",
    "test": "lipemat-js-boilerplate test"
  },
  "devDependencies": {},
  "dependencies": {
    "@lipemat/js-boilerplate": "^5.1.0"
  }
}

```

You may adjust things as needed by be sure to leave the `scripts` as is.

### Code Completion In PHPStorm
Some `@types` have been specified in this library to assist with code completion and allow using the built in TypeScript support. Unfortunately, some typescripts still send errors to PHPStorm like "Default export is not declared in imported module". I've found that it's easier to just remove this warning by un-checking `Editor -> Inspections -> JavaScript -> General -> Validate Imports`. (this may not need to be un-checked if you enable the built in TypeScript support).

You may notice that because the modules do not exist in your project's package.json that PHP/Web Storm will mark imports and not being installed.

There are 2 ways to solve this issue:
1. Specifically copy the `@ts/package.json` folder and file to your project **(preferred)**.
2. Add dependencies to the package.json that you are using directly so PHPStorm will find them.

### ESLint
To use the built in eslint, copy the following items from `templates` into your project root:
1. `.eslintrc`

Now you may adjust the eslint configuration as desired and run the linter via `yarn run lint`.

### TypeScript
To use the built in TypeScript, copy the following items from `templates` into your project root:
1. `tsconfig.json`

TypeScript will run a validator during dev and output any errors in the console. These same errors will display within PHPStorm if you copied tsconfig.json file in step 1. You technically don't have to fix any issues to compile but it's recommended. 

Babel will automatically compile TypeScript files into the finished javascript, and will ignore errors. 

### Configuration Overrides
All configurations are found in the `config` directory and may be extended by adding a matching file within your project directory.

For instance is you want to adjust `webpack.dev.js` you may add a `config/webpack.dev.js` file in your project directory.

All declarations are merged in favor of the project config.

### Testing
To use the built in testing, copy the following items from `templates` into your project root:
1. `jest.config.js`
2. `tests`

Now you may write `jest` tests as desired and run them via `yarn run test` 
1. Tests file must have .test.js in file name
