# The Start Of A Beautiful JS App

<p>
<a href="https://www.npmjs.com/package/@lipemat/js-boilerplate">
<img alt="npm" src="https://img.shields.io/npm/v/@lipemat/js-boilerplate.svg">
</a>
    <img alt="node" src="https://img.shields.io/node/v/@lipemat/js-boilerplate.svg">
</p>


A zero configuration starting point for a React or non React app. 

## Installation
```bash
yarn add @lipemat/js-boilerplate
```

## Usage
Add the following to your package.json. (this may also be found in the `templates` directory.

```json
{
  "jsPath": "./js",
  "scripts": {
    "browserslist": "lipemat-js-boilerplate browserslist",
    "dist": "lipemat-js-boilerplate dist",
    "lint": "lipemat-js-boilerplate lint",
    "postinstall": "lipemat-js-boilerplate fix-pnp",
    "start": "lipemat-js-boilerplate start",
    "test": "lipemat-js-boilerplate test"
  },
  "devDependencies": {},
  "dependencies": {
    "@lipemat/js-boilerplate": "^8.0.0"
  }
}

```
**_You may adjust things as needed but be sure to leave the `scripts` as is._**

* `brotliFiles : {bool}` Enabled generating pre-compressed .br files for CSS and JS.
* `shortCssClasses : {bool}` Enable short 1-2 character CSS classes. Recommended if you're not running multiple instances of this package on the same site.
* `jsPath : {string}` Path of JS application relative to `package.json`. If `package.json` is in same directory as the JS application, this may be omitted.

## Code Completion In PHPStorm
Some `@types` have been specified in this library to assist with code completion and allow using the built-in TypeScript support. Unfortunately, some typescripts still send errors to PHPStorm like "Default export is not declared in an imported module". I've found that it's easier to just remove this warning by un-checking `Editor -> Inspections -> JavaScript -> General -> Validate Imports`. (this may not need to be un-checked if you enable the built-in TypeScript support).


## ESLint
To use the built-in eslint, copy the following items from `templates` into your project root:
1. `.eslintrc`

Now you may adjust the eslint configuration as desired and run the linter via `yarn run lint`.

## Browserslist
To retrieve a list of all currently targeted browsers, add the following to your `package.json`
and run `yarn browserslist`.

```json
{
  "scripts": {
    "browserslist": "lipemat-js-boilerplate browserslist"
  }
}
```

The console will display a list of browsers targeted by your [browserslist configruation](https://github.com/browserslist/browserslist#config-file), or the defaults if no configuration is specified.


## TypeScript
To use the built-in TypeScript, copy the following items from `templates` into your project root:
1. `tsconfig.json`

TypeScript will run a validator during dev and output any errors in the console. These same errors will display within PHPStorm if you copied tsconfig.json file in step 1. You technically don't have to fix any issues to compile but it's recommended. 

Babel will automatically compile TypeScript files into the finished javascript, and will ignore errors. 

### Configuration Overrides
All configurations are found in the `config` directory and may be extended by adding a matching file within your project directory.
For instance is you want to adjust `webpack.dev.js` you may add a `config/webpack.dev.js` file in your project directory.

All declarations are merged in favor of the project config.

### Extensions
To create a package which extends any of the files within the `config` directory, create a package with "js-boilerplate-" somewhere in it's name. Within your package, create a `config` directory and place any overrides there. Works the same as [Configuration Overrides](#configuration-overrides)

This is useful when you have often reused overrides to support a particular library. [Here is an example](https://github.com/lipemat/js-boilerplate-gutenberg)

### Testing
To use the built in testing, copy the following items from `templates` into your project root:
1. `jest.config.ts`
2. `tests`

Now you may write `jest` tests as desired and run them via `yarn run test` 
1. Tests file must have .test.js in file name

**Alternatively you may create a [run configuration](https://www.jetbrains.com/help/phpstorm/running-unit-tests-on-jest.html#createRunConfigJest) in PHPStorm for an interactive testing experience.**
1. __Jest package__: `<project root>/node_modules/jest-cli`
2. __Working directory__: root of your app which contains the `jest.config.ts`.
3. "All tests" to run an entire directory of tests.
4. "Suite" to run a particular file of tests.

## Legacy Browsers Support

#### IE11

By default, IE11 is disabled via an internal Browserslist configuration. If you would like to support IE11, add it 
as a target to your project's Browserslist configuration and all tooling will automatically support it.

#### ES6 Modules

The app will automatically detect any packages in your `package.json` which do not support ES5 and add them to the list
of files that Babel will transform into ES5 code.

If you have a package, which has a dependency, which does not support ES5, you will need to add it to a `es6Modules` key
in your `package.json` to have it transformed.

**Example**

```JSON
{
 "es6Modules": [
    "buffer"
  ]
}
```

## Certificates
If you are using https in your local environment, you may point to the certificates in your package.json like so:

```json
{
  "certificates": {
    "cert": "<path to -crt.pem file>",
    "key": "<path to -key.pem file>"
  }
}
```

## PostCSS Custom Media

`@custom-media` declarations will automatically be loaded from the following locations.
1. `pcss/globals/media-queries.pcss`.
2. `<jsPath>/src/pcss/media-queries.pcss`.

@notice `@import` do not work inside the `media-queries` files. 
