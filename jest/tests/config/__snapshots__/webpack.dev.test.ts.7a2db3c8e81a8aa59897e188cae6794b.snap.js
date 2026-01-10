// Jest Snapshot v1, https://jestjs.io/docs/snapshot-testing

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
            "loader": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\lib\\css-module-types.js",
          },
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

exports[`webpack.dev.test.ts Chrome 71: Chrome 71 1`] = `
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
                    "chrome 71",
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
            "loader": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\lib\\css-module-types.js",
          },
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
                        "postcssPlugin": "postcss-clamp",
                      },
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
                        "postcssPlugin": "postcss-ic-unit",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-oklab-function",
                      },
                      {
                        "Declaration": {
                          "opacity": [Function],
                        },
                        "postcssPlugin": "postcss-opacity-percentage",
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
                        "AtRule": {
                          "custom-media": [Function],
                          "media": [Function],
                        },
                        "postcssPlugin": "postcss-media-minmax",
                      },
                      {
                        "AtRule": [Function],
                        "postcssPlugin": "postcss-prefers-color-scheme",
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
                        "postcssPlugin": "postcss-selector-not",
                      },
                      {
                        "Declaration": {
                          "block-size": [Function],
                          "border-block": [Function],
                          "border-block-color": [Function],
                          "border-block-end": [Function],
                          "border-block-end-color": [Function],
                          "border-block-end-style": [Function],
                          "border-block-end-width": [Function],
                          "border-block-start": [Function],
                          "border-block-start-color": [Function],
                          "border-block-start-style": [Function],
                          "border-block-start-width": [Function],
                          "border-block-style": [Function],
                          "border-block-width": [Function],
                          "border-color": [Function],
                          "border-end-end-radius": [Function],
                          "border-end-start-radius": [Function],
                          "border-inline": [Function],
                          "border-inline-color": [Function],
                          "border-inline-end": [Function],
                          "border-inline-end-color": [Function],
                          "border-inline-end-style": [Function],
                          "border-inline-end-width": [Function],
                          "border-inline-start": [Function],
                          "border-inline-start-color": [Function],
                          "border-inline-start-style": [Function],
                          "border-inline-start-width": [Function],
                          "border-inline-style": [Function],
                          "border-inline-width": [Function],
                          "border-start-end-radius": [Function],
                          "border-start-start-radius": [Function],
                          "border-style": [Function],
                          "border-width": [Function],
                          "clear": [Function],
                          "float": [Function],
                          "inline-size": [Function],
                          "inset": [Function],
                          "inset-block": [Function],
                          "inset-block-end": [Function],
                          "inset-block-start": [Function],
                          "inset-inline": [Function],
                          "inset-inline-end": [Function],
                          "inset-inline-start": [Function],
                          "margin": [Function],
                          "margin-block": [Function],
                          "margin-block-end": [Function],
                          "margin-block-start": [Function],
                          "margin-inline": [Function],
                          "margin-inline-end": [Function],
                          "margin-inline-start": [Function],
                          "max-block-size": [Function],
                          "max-inline-size": [Function],
                          "min-block-size": [Function],
                          "min-inline-size": [Function],
                          "padding": [Function],
                          "padding-block": [Function],
                          "padding-block-end": [Function],
                          "padding-block-start": [Function],
                          "padding-inline": [Function],
                          "padding-inline-end": [Function],
                          "padding-inline-start": [Function],
                          "resize": [Function],
                          "text-align": [Function],
                          "transition": [Function],
                          "transition-property": [Function],
                        },
                        "postcssPlugin": "postcss-logical-properties",
                      },
                      {
                        "Rule": [Function],
                        "postcssPlugin": "postcss-dir-pseudo-class",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-double-position-gradients",
                      },
                      {
                        "Declaration": [Function],
                        "postcssPlugin": "postcss-hwb-function",
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
                        "Once": [Function],
                        "postcssPlugin": "postcss-font-variant",
                      },
                      {
                        "Rule": [Function],
                        "postcssPlugin": "postcss-is-pseudo-class",
                      },
                      {
                        "Rule": [Function],
                        "postcssPlugin": "css-has-pseudo",
                      },
                      {
                        "OnceExit": [Function],
                        "postcssPlugin": "postcss-cascade-layers",
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
                          "chrome 71",
                        ],
                        "info": [Function],
                        "options": {
                          "overrideBrowserslist": [
                            "chrome 71",
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
  "target": "browserslist:chrome 71",
}
`;

exports[`webpack.dev.test.ts cssTsFiles Enabled: cssTsFiles 1`] = `
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
            "loader": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\lib\\css-module-types.js",
          },
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
