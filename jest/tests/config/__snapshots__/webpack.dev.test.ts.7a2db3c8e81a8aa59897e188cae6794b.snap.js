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
                  "proposals": false,
                  "version": "3.44.0",
                },
                "debug": false,
                "ignoreBrowserslistConfig": true,
                "shippedProposals": false,
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
                        "Rule": [Function],
                        "postcssPlugin": "postcss-nesting",
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
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-stepped-value-functions",
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
                  {
                    "OnceExit": [Function],
                    "postcssPlugin": "postcss-sort-media-queries",
                  },
                  {
                    "OnceExit": [Function],
                    "postcssPlugin": "js-boilerplate/postcss-pretty",
                  },
                ],
                "sourceMap": true,
              },
            },
          },
        ],
      },
    ],
    "strictExportPresence": true,
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
          "entry": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\node_modules\\@pmmmwh\\react-refresh-webpack-plugin\\client\\ErrorOverlayEntry.js",
          "module": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\node_modules\\@pmmmwh\\react-refresh-webpack-plugin\\overlay\\index.js",
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
  "target": "browserslist:> 1%, last 1 Android versions, last 1 ChromeAndroid versions, last 2 Chrome versions, last 2 Firefox versions, last 2 Safari versions, last 2 iOS versions, last 2 Edge versions, last 2 Opera versions",
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
                  "proposals": false,
                  "version": "3.44.0",
                },
                "debug": false,
                "ignoreBrowserslistConfig": true,
                "shippedProposals": false,
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
                        "Rule": [Function],
                        "postcssPlugin": "postcss-nesting",
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
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-stepped-value-functions",
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
                  {
                    "OnceExit": [Function],
                    "postcssPlugin": "postcss-sort-media-queries",
                  },
                  {
                    "OnceExit": [Function],
                    "postcssPlugin": "js-boilerplate/postcss-pretty",
                  },
                ],
                "sourceMap": true,
              },
            },
          },
        ],
      },
    ],
    "strictExportPresence": true,
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
          "entry": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\node_modules\\@pmmmwh\\react-refresh-webpack-plugin\\client\\ErrorOverlayEntry.js",
          "module": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\node_modules\\@pmmmwh\\react-refresh-webpack-plugin\\overlay\\index.js",
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
  "target": "browserslist:> 1%, last 1 Android versions, last 1 ChromeAndroid versions, last 2 Chrome versions, last 2 Firefox versions, last 2 Safari versions, last 2 iOS versions, last 2 Edge versions, last 2 Opera versions",
}
`;

exports[`webpack.dev.test.ts cssTsFiles: cssTsFiles 1`] = `
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
                  "proposals": false,
                  "version": "3.44.0",
                },
                "debug": false,
                "ignoreBrowserslistConfig": true,
                "shippedProposals": false,
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
        "test": /\\\\\\.css\\$/,
        "use": [
          "style-loader",
          "css-loader",
        ],
      },
    ],
    "strictExportPresence": true,
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
          "entry": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\node_modules\\@pmmmwh\\react-refresh-webpack-plugin\\client\\ErrorOverlayEntry.js",
          "module": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\node_modules\\@pmmmwh\\react-refresh-webpack-plugin\\overlay\\index.js",
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
  "target": "browserslist:> 1%, last 1 Android versions, last 1 ChromeAndroid versions, last 2 Chrome versions, last 2 Firefox versions, last 2 Safari versions, last 2 iOS versions, last 2 Edge versions, last 2 Opera versions",
}
`;
