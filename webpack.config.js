var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var BUILD_BUNDLE_DIR = './dist/extension/browser/chrome/js-gen';
var APP_SRC_DIR = './src/extension/browser/core';

var config = {

  entry: {

    vendor: ["mobx","mobx-react","react","react-dom", "react-router","typescript-logging"],
    index: [APP_SRC_DIR + '/index.tsx'],
  },
   output: {
     library: "RCT",
     path: BUILD_BUNDLE_DIR,
     filename: "[name].react.js"
   },


  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.config.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loaders: ["ts-loader"] }
    ],

    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity
    })
  ],

};

module.exports = config;
