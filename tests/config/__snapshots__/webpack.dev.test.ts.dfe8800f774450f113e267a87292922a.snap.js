// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`webpack.dev.test.ts Browserslist config: Chrome 71 1`] = `
{
  "devtool": "eval-source-map",
  "entry": {},
  "externals": {
    "jquery": "jQuery",
  },
  "mode": "development",
  "module": {
    "rules": [
      {
        "exclude": /node_modules/,
        "include": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\src",
        "loader": "babel-loader",
        "options": {
          "cacheDirectory": true,
          "plugins": [
            "react-refresh/babel",
            "@babel/plugin-transform-react-jsx-source",
            "@babel/plugin-syntax-dynamic-import",
          ],
          "presets": [
            [
              "@babel/preset-env",
              {
                "bugfixes": true,
                "corejs": {
                  "version": "3.31.1",
                },
                "debug": false,
                "shippedProposals": true,
                "targets": {
                  "browsers": [
                    "> 1%",
                    "last 1 Android versions",
                    "last 1 ChromeAndroid versions",
                    "last 2 Chrome versions",
                    "last 2 Firefox versions",
                    "last 2 Safari versions",
                    "last 2 iOS versions",
                    "last 2 Edge versions",
                    "last 2 Opera versions",
                    "not and_uc 15.5",
                  ],
                },
                "useBuiltIns": "usage",
              },
            ],
            [
              "@babel/preset-react",
              {
                "development": true,
                "runtime": "automatic",
              },
            ],
            "@babel/preset-typescript",
          ],
        },
        "test": /\\\\\\.\\[jt\\]sx\\?\\$/,
      },
      {
        "include": /node_modules/,
        "test": /\\\\\\.\\[jt\\]sx\\?\\$/,
      },
      {
        "test": /\\\\\\.css\\$/,
        "use": [
          "style-loader",
          "css-loader",
        ],
      },
      {
        "test": /\\\\\\.pcss\\$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "importLoaders": 1,
              "modules": {
                "exportLocalsConvention": "camelCase",
                "localIdentName": "Ⓜ[name]__[local]__[contenthash:base64:2]",
                "mode": [Function],
              },
              "sourceMap": true,
              "url": false,
            },
          },
          {
            "loader": "postcss-loader",
            "options": {
              "postcssOptions": {
                "parser": "postcss-scss",
                "plugins": [
                  {
                    "postcssPlugin": "postcss-global-data",
                    "prepare": [Function],
                  },
                  {
                    "Once": [Function],
                    "postcssPlugin": "postcss-import",
                  },
                  [Function],
                  [Function],
                  {
                    "plugins": [
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-color-function",
                      },
                      {
                        "postcssPlugin": "postcss-normalize-display-values",
                        "prepare": [Function],
                      },
                      {
                        "AtRule": [Function],
                        "postcssPlugin": "postcss-font-format-keywords",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-oklab-function",
                      },
                      {
                        "postcssPlugin": "postcss-text-decoration-shorthand",
                        "prepare": [Function],
                      },
                      {
                        "AtRule": [Function],
                        "Once": [Function],
                        "postcssPlugin": "postcss-custom-media",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-image-set-function",
                      },
                      {
                        "AtRule": {
                          "custom-media": [Function],
                          "media": [Function],
                        },
                        "postcssPlugin": "postcss-media-minmax",
                      },
                      {
                        "Rule": [Function],
                        "postcssPlugin": "postcss-nesting",
                      },
                      {
                        "Rule": [Function],
                        "postcssPlugin": "postcss-focus-visible",
                      },
                      {
                        "Rule": [Function],
                        "postcssPlugin": "postcss-dir-pseudo-class",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-lab-function",
                      },
                      {
                        "Rule": [Function],
                        "postcssPlugin": "css-blank-pseudo",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-page-break",
                      },
                      {
                        "Once": [Function],
                        "postcssPlugin": "postcss-font-variant",
                      },
                      {
                        "Rule": [Function],
                        "postcssPlugin": "css-has-pseudo",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-stepped-value-functions",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-trigonometric-functions",
                      },
                      {
                        "browsers": [
                          "> 1%",
                          "last 1 Android versions",
                          "last 1 ChromeAndroid versions",
                          "last 2 Chrome versions",
                          "last 2 Firefox versions",
                          "last 2 Safari versions",
                          "last 2 iOS versions",
                          "last 2 Edge versions",
                          "last 2 Opera versions",
                          "not and_uc 15.5",
                        ],
                        "info": [Function],
                        "options": {
                          "overrideBrowserslist": [
                            "> 1%",
                            "last 1 Android versions",
                            "last 1 ChromeAndroid versions",
                            "last 2 Chrome versions",
                            "last 2 Firefox versions",
                            "last 2 Safari versions",
                            "last 2 iOS versions",
                            "last 2 Edge versions",
                            "last 2 Opera versions",
                            "not and_uc 15.5",
                          ],
                        },
                        "postcssPlugin": "autoprefixer",
                        "prepare": [Function],
                      },
                      {
                        "RuleExit": [Function],
                        "postcssPlugin": "postcss-progressive-custom-properties",
                      },
                      {
                        "OnceExit": [Function],
                        "postcssPlugin": "postcss-preset-env",
                      },
                    ],
                    "postcssPlugin": "postcss-preset-env",
                  },
                  [Function],
                  [Function],
                  [Function],
                ],
                "sourceMap": true,
              },
            },
          },
        ],
      },
    ],
  },
  "optimization": {
    "emitOnErrors": false,
    "moduleIds": "named",
  },
  "output": {
    "chunkFilename": "[name].js",
    "filename": "[name].js",
    "path": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\dist",
    "publicPath": "http://localhost:3000/js/dist/",
  },
  "plugins": [
    ProvidePlugin {
      "definitions": {
        "$": "jquery",
        "jQuery": "jquery",
      },
    },
    ReactRefreshPlugin {
      "options": {
        "exclude": /node_modules/i,
        "include": /\\\\\\.\\(\\[cm\\]js\\|\\[jt\\]sx\\?\\|flow\\)\\$/i,
        "overlay": {
          "entry": "E:\\SVN\\the-boilerplate\\node_modules\\@pmmmwh\\react-refresh-webpack-plugin\\client\\ErrorOverlayEntry.js",
          "module": "E:\\SVN\\the-boilerplate\\node_modules\\@pmmmwh\\react-refresh-webpack-plugin\\overlay\\index.js",
          "sockIntegration": "wds",
        },
      },
    },
    ForkTsCheckerWebpackPlugin {
      "options": {
        "devServer": false,
        "formatter": "basic",
        "typescript": {
          "configFile": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\tsconfig.json",
        },
      },
    },
  ],
  "resolve": {
    "extensions": [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json",
      ".pcss",
    ],
    "modules": [
      "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\src",
      "node_modules",
    ],
  },
  "stats": "minimal",
  "target": "browserslist:> 1%, last 1 Android versions, last 1 ChromeAndroid versions, last 2 Chrome versions, last 2 Firefox versions, last 2 Safari versions, last 2 iOS versions, last 2 Edge versions, last 2 Opera versions, not and_uc 15.5",
}
`;

exports[`webpack.dev.test.ts Browserslist config: Default Browsers 1`] = `
{
  "devtool": "eval-source-map",
  "entry": {},
  "externals": {
    "jquery": "jQuery",
  },
  "mode": "development",
  "module": {
    "rules": [
      {
        "exclude": /node_modules/,
        "include": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\src",
        "loader": "babel-loader",
        "options": {
          "cacheDirectory": true,
          "plugins": [
            "react-refresh/babel",
            "@babel/plugin-transform-react-jsx-source",
            "@babel/plugin-syntax-dynamic-import",
          ],
          "presets": [
            [
              "@babel/preset-env",
              {
                "bugfixes": true,
                "corejs": {
                  "version": "3.31.1",
                },
                "debug": false,
                "shippedProposals": true,
                "targets": {
                  "browsers": [
                    "> 1%",
                    "last 1 Android versions",
                    "last 1 ChromeAndroid versions",
                    "last 2 Chrome versions",
                    "last 2 Firefox versions",
                    "last 2 Safari versions",
                    "last 2 iOS versions",
                    "last 2 Edge versions",
                    "last 2 Opera versions",
                    "not and_uc 15.5",
                  ],
                },
                "useBuiltIns": "usage",
              },
            ],
            [
              "@babel/preset-react",
              {
                "development": true,
                "runtime": "automatic",
              },
            ],
            "@babel/preset-typescript",
          ],
        },
        "test": /\\\\\\.\\[jt\\]sx\\?\\$/,
      },
      {
        "include": /node_modules/,
        "test": /\\\\\\.\\[jt\\]sx\\?\\$/,
      },
      {
        "test": /\\\\\\.css\\$/,
        "use": [
          "style-loader",
          "css-loader",
        ],
      },
      {
        "test": /\\\\\\.pcss\\$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "importLoaders": 1,
              "modules": {
                "exportLocalsConvention": "camelCase",
                "localIdentName": "Ⓜ[name]__[local]__[contenthash:base64:2]",
                "mode": [Function],
              },
              "sourceMap": true,
              "url": false,
            },
          },
          {
            "loader": "postcss-loader",
            "options": {
              "postcssOptions": {
                "parser": "postcss-scss",
                "plugins": [
                  {
                    "postcssPlugin": "postcss-global-data",
                    "prepare": [Function],
                  },
                  {
                    "Once": [Function],
                    "postcssPlugin": "postcss-import",
                  },
                  [Function],
                  [Function],
                  {
                    "plugins": [
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-color-function",
                      },
                      {
                        "postcssPlugin": "postcss-normalize-display-values",
                        "prepare": [Function],
                      },
                      {
                        "AtRule": [Function],
                        "postcssPlugin": "postcss-font-format-keywords",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-oklab-function",
                      },
                      {
                        "postcssPlugin": "postcss-text-decoration-shorthand",
                        "prepare": [Function],
                      },
                      {
                        "AtRule": [Function],
                        "Once": [Function],
                        "postcssPlugin": "postcss-custom-media",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-image-set-function",
                      },
                      {
                        "AtRule": {
                          "custom-media": [Function],
                          "media": [Function],
                        },
                        "postcssPlugin": "postcss-media-minmax",
                      },
                      {
                        "Rule": [Function],
                        "postcssPlugin": "postcss-nesting",
                      },
                      {
                        "Rule": [Function],
                        "postcssPlugin": "postcss-focus-visible",
                      },
                      {
                        "Rule": [Function],
                        "postcssPlugin": "postcss-dir-pseudo-class",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-lab-function",
                      },
                      {
                        "Rule": [Function],
                        "postcssPlugin": "css-blank-pseudo",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-page-break",
                      },
                      {
                        "Once": [Function],
                        "postcssPlugin": "postcss-font-variant",
                      },
                      {
                        "Rule": [Function],
                        "postcssPlugin": "css-has-pseudo",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-stepped-value-functions",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-trigonometric-functions",
                      },
                      {
                        "browsers": [
                          "> 1%",
                          "last 1 Android versions",
                          "last 1 ChromeAndroid versions",
                          "last 2 Chrome versions",
                          "last 2 Firefox versions",
                          "last 2 Safari versions",
                          "last 2 iOS versions",
                          "last 2 Edge versions",
                          "last 2 Opera versions",
                          "not and_uc 15.5",
                        ],
                        "info": [Function],
                        "options": {
                          "overrideBrowserslist": [
                            "> 1%",
                            "last 1 Android versions",
                            "last 1 ChromeAndroid versions",
                            "last 2 Chrome versions",
                            "last 2 Firefox versions",
                            "last 2 Safari versions",
                            "last 2 iOS versions",
                            "last 2 Edge versions",
                            "last 2 Opera versions",
                            "not and_uc 15.5",
                          ],
                        },
                        "postcssPlugin": "autoprefixer",
                        "prepare": [Function],
                      },
                      {
                        "RuleExit": [Function],
                        "postcssPlugin": "postcss-progressive-custom-properties",
                      },
                      {
                        "OnceExit": [Function],
                        "postcssPlugin": "postcss-preset-env",
                      },
                    ],
                    "postcssPlugin": "postcss-preset-env",
                  },
                  [Function],
                  [Function],
                  [Function],
                ],
                "sourceMap": true,
              },
            },
          },
        ],
      },
    ],
  },
  "optimization": {
    "emitOnErrors": false,
    "moduleIds": "named",
  },
  "output": {
    "chunkFilename": "[name].js",
    "filename": "[name].js",
    "path": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\dist",
    "publicPath": "http://localhost:3000/js/dist/",
  },
  "plugins": [
    ProvidePlugin {
      "definitions": {
        "$": "jquery",
        "jQuery": "jquery",
      },
    },
    ReactRefreshPlugin {
      "options": {
        "exclude": /node_modules/i,
        "include": /\\\\\\.\\(\\[cm\\]js\\|\\[jt\\]sx\\?\\|flow\\)\\$/i,
        "overlay": {
          "entry": "E:\\SVN\\the-boilerplate\\node_modules\\@pmmmwh\\react-refresh-webpack-plugin\\client\\ErrorOverlayEntry.js",
          "module": "E:\\SVN\\the-boilerplate\\node_modules\\@pmmmwh\\react-refresh-webpack-plugin\\overlay\\index.js",
          "sockIntegration": "wds",
        },
      },
    },
    ForkTsCheckerWebpackPlugin {
      "options": {
        "devServer": false,
        "formatter": "basic",
        "typescript": {
          "configFile": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\tsconfig.json",
        },
      },
    },
  ],
  "resolve": {
    "extensions": [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json",
      ".pcss",
    ],
    "modules": [
      "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\src",
      "node_modules",
    ],
  },
  "stats": "minimal",
  "target": "browserslist:> 1%, last 1 Android versions, last 1 ChromeAndroid versions, last 2 Chrome versions, last 2 Firefox versions, last 2 Safari versions, last 2 iOS versions, last 2 Edge versions, last 2 Opera versions, not and_uc 15.5",
}
`;
