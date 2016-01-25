/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');

module.exports = {
  output: {
    filename: 'main.js',
    publicPath: '/assets/'
  },

  cache: true,
  debug: true,
  devtool: false,
  entry: [
      'webpack/hot/only-dev-server',
      './src/app/Main.jsx'
  ],

  stats: {
    colors: true,
    reasons: true
  },

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
      loaders: ['react-hot', 'babel?presets[]=react&presets[]=es2015']
    }, {
      test: /\.(sass|scss)$/,
      loaders: ['style', 'css', 'sass?outputStyle=expanded']
    }, {
      test: /\.css$/,
      loaders: ['style', 'css']
    }, {
      test: /\.(png|jpg)$/,
      loaders: [ 'url?limit=8192' ]
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      'console': 'imports?this=>global!exports?global.console!console-polyfill'
    })
  ]

};
