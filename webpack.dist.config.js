/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');

module.exports = {

  output: {
    publicPath: '/assets/',
    path: 'dist/assets/',
    filename: 'main.js'
  },

  debug: false,
  devtool: false,
  entry: './src/app/Main.jsx',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      'console': 'imports?this=>global!exports?global.console!console-polyfill'
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
        'vendor': __dirname + '/src/vendor',
        'styles': __dirname + '/src/styles',
        'app': __dirname + '/src/app'
    }
  },

  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: [ /node_modules/, /vendor/ ],
      loaders: [ 'eslint' ]
    }],

    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: [ 'babel' ]
    }, {
      test: /\.(sass|scss|css)$/,
      loaders: [ 'style', 'css', 'sass' ]
    }, {
      test: /\.(png|jpg)$/,
      loaders: [ 'url?limit=8192' ]
    }]
  }
};
