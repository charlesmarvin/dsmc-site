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
  entry: './app/src/components/App.jsx',

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
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
        'vendor': __dirname + '/app/vendor',
        'styles': __dirname + '/app/styles',
        'components': __dirname + '/app/src/components',
        'utils': __dirname + '/app/src/utils'
    }
  },

  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: [ /node_modules/, /vendor/ ],
      loader: 'eslint-loader'
    }],

    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(sass|scss)$/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader?outputStyle=expanded'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }, { 
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "url-loader?limit=10000&minetype=application/font-woff" 
    }, { 
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "file-loader" 
    }]
  }
};
