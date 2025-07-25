// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`webpack.dist.test.ts Browserslist config: Chrome 72, Firefox 65 1`] = `
{
  "devtool": false,
  "entry": {},
  "externals": {
    "jquery": "jQuery",
  },
  "mode": "production",
  "module": {
    "rules": [
      {
        "exclude": /node_modules/,
        "loader": "babel-loader",
        "options": {
          "cacheDirectory": true,
          "plugins": [
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
                "development": false,
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
          "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
          "css-loader",
          {
            "loader": "clean-css-loader",
            "options": {
              "level": 2,
              "sourceMap": false,
            },
          },
        ],
      },
      {
        "test": /\\\\\\.pcss\\$/,
        "use": [
          "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
          {
            "loader": "css-loader",
            "options": {
              "importLoaders": 1,
              "modules": {
                "exportLocalsConvention": "camelCase",
                "localIdentName": "[contenthash:base64:5]",
                "mode": [Function],
              },
              "sourceMap": false,
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
                    "postcssPlugin": "clean",
                  },
                ],
              },
            },
          },
        ],
      },
    ],
    "strictExportPresence": true,
  },
  "optimization": {
    "moduleIds": "deterministic",
  },
  "output": {
    "chunkFilename": "[name].[contenthash].js",
    "crossOriginLoading": "anonymous",
    "filename": "[name].js",
    "path": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\dist",
    "publicPath": "auto",
  },
  "performance": {
    "hints": "warning",
  },
  "plugins": [
    ProvidePlugin {
      "definitions": {
        "$": "jquery",
        "jQuery": "jquery",
      },
    },
    MiniCssExtractPlugin {
      "_sortedModulesCache": WeakMap {},
      "options": {
        "chunkFilename": "[name].[contenthash].css",
        "experimentalUseImportModule": undefined,
        "filename": "[name].css",
        "ignoreOrder": false,
        "runtime": true,
      },
      "runtimeOptions": {
        "attributes": undefined,
        "insert": undefined,
        "linkType": "text/css",
      },
    },
    CleanWebpackPlugin {
      "apply": [Function],
      "cleanAfterEveryBuildPatterns": [],
      "cleanOnceBeforeBuildPatterns": [
        "**/*",
        "!.running",
      ],
      "cleanStaleWebpackAssets": true,
      "currentAssets": [],
      "dangerouslyAllowCleanPatternsOutsideProject": false,
      "dry": false,
      "handleDone": [Function],
      "handleInitial": [Function],
      "initialClean": false,
      "outputPath": "",
      "protectWebpackAssets": true,
      "removeFiles": [Function],
      "verbose": false,
    },
    SubresourceIntegrityPlugin {
      "options": {
        "enabled": "auto",
        "hashFuncNames": [
          "sha384",
        ],
        "hashLoading": "eager",
      },
      "setup": [Function],
      "validateHashFuncName": [Function],
      "validateHashFuncNames": [Function],
      "validateHashLoading": [Function],
      "validateOptions": [Function],
      "warnStandardHashFunc": [Function],
    },
    WebpackAssetsHash {
      "assets": {},
      "manifest": {},
    },
    {},
    ForkTsCheckerWebpackPlugin {
      "options": {
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
  "stats": {
    "assets": true,
    "assetsSort": "size",
    "assetsSpace": 100,
    "cachedAssets": true,
    "cachedModules": false,
    "children": false,
    "colors": {
      "green": "[93m",
    },
    "groupAssetsByChunk": false,
    "groupAssetsByEmitStatus": false,
    "groupAssetsByExtension": false,
    "groupAssetsByInfo": false,
    "groupAssetsByPath": false,
    "hash": false,
    "modules": false,
    "timings": false,
    "version": false,
  },
  "target": "browserslist:> 1%, last 1 Android versions, last 1 ChromeAndroid versions, last 2 Chrome versions, last 2 Firefox versions, last 2 Safari versions, last 2 iOS versions, last 2 Edge versions, last 2 Opera versions",
}
`;

exports[`webpack.dist.test.ts Browserslist config: Default Browsers 1`] = `
{
  "devtool": false,
  "entry": {},
  "externals": {
    "jquery": "jQuery",
  },
  "mode": "production",
  "module": {
    "rules": [
      {
        "exclude": /node_modules/,
        "loader": "babel-loader",
        "options": {
          "cacheDirectory": true,
          "plugins": [
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
                "development": false,
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
          "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
          "css-loader",
          {
            "loader": "clean-css-loader",
            "options": {
              "level": 2,
              "sourceMap": false,
            },
          },
        ],
      },
      {
        "test": /\\\\\\.pcss\\$/,
        "use": [
          "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
          {
            "loader": "css-loader",
            "options": {
              "importLoaders": 1,
              "modules": {
                "exportLocalsConvention": "camelCase",
                "localIdentName": "[contenthash:base64:5]",
                "mode": [Function],
              },
              "sourceMap": false,
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
                    "postcssPlugin": "clean",
                  },
                ],
              },
            },
          },
        ],
      },
    ],
    "strictExportPresence": true,
  },
  "optimization": {
    "moduleIds": "deterministic",
  },
  "output": {
    "chunkFilename": "[name].[contenthash].js",
    "crossOriginLoading": "anonymous",
    "filename": "[name].js",
    "path": "E:\\SVN\\the-boilerplate\\packages\\js-boilerplate\\dist",
    "publicPath": "auto",
  },
  "performance": {
    "hints": "warning",
  },
  "plugins": [
    ProvidePlugin {
      "definitions": {
        "$": "jquery",
        "jQuery": "jquery",
      },
    },
    MiniCssExtractPlugin {
      "_sortedModulesCache": WeakMap {},
      "options": {
        "chunkFilename": "[name].[contenthash].css",
        "experimentalUseImportModule": undefined,
        "filename": "[name].css",
        "ignoreOrder": false,
        "runtime": true,
      },
      "runtimeOptions": {
        "attributes": undefined,
        "insert": undefined,
        "linkType": "text/css",
      },
    },
    CleanWebpackPlugin {
      "apply": [Function],
      "cleanAfterEveryBuildPatterns": [],
      "cleanOnceBeforeBuildPatterns": [
        "**/*",
        "!.running",
      ],
      "cleanStaleWebpackAssets": true,
      "currentAssets": [],
      "dangerouslyAllowCleanPatternsOutsideProject": false,
      "dry": false,
      "handleDone": [Function],
      "handleInitial": [Function],
      "initialClean": false,
      "outputPath": "",
      "protectWebpackAssets": true,
      "removeFiles": [Function],
      "verbose": false,
    },
    SubresourceIntegrityPlugin {
      "options": {
        "enabled": "auto",
        "hashFuncNames": [
          "sha384",
        ],
        "hashLoading": "eager",
      },
      "setup": [Function],
      "validateHashFuncName": [Function],
      "validateHashFuncNames": [Function],
      "validateHashLoading": [Function],
      "validateOptions": [Function],
      "warnStandardHashFunc": [Function],
    },
    WebpackAssetsHash {
      "assets": {},
      "manifest": {},
    },
    {},
    ForkTsCheckerWebpackPlugin {
      "options": {
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
  "stats": {
    "assets": true,
    "assetsSort": "size",
    "assetsSpace": 100,
    "cachedAssets": true,
    "cachedModules": false,
    "children": false,
    "colors": {
      "green": "[93m",
    },
    "groupAssetsByChunk": false,
    "groupAssetsByEmitStatus": false,
    "groupAssetsByExtension": false,
    "groupAssetsByInfo": false,
    "groupAssetsByPath": false,
    "hash": false,
    "modules": false,
    "timings": false,
    "version": false,
  },
  "target": "browserslist:> 1%, last 1 Android versions, last 1 ChromeAndroid versions, last 2 Chrome versions, last 2 Firefox versions, last 2 Safari versions, last 2 iOS versions, last 2 Edge versions, last 2 Opera versions",
}
`;
