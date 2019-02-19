## The Start Of  A Beautiful JS App

A zero configuration starting point for  a React or non React app. 

### Installation
```bash
yarn add lipemat-js-boilerplate
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
    "lipemat-js-boilerplate": "1.0.0"
  }
}

```

You may adjust things as needed by be sure to leave the `scripts` as is.

### ESLint
To use the built in eslint, copy the following items from `templates` into your project root:
1. `.eslintrc`

Now you may adjust the eslint configuration as desired and run the linter via `yarn run lint`.


### Testing
To use the built in testing, copy the following items from `templates` into your project root:
1. `jest.config.js`
2. `tests`

Now you may write `jest` tests as desired and run them via `yarn run test` 
