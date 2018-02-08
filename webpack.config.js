var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const pug = require('./webpack/pug')
const devServer = require('./webpack/devserver')
const stylus = require('./webpack/stylus')
const css = require('./webpack/css')
const files = require('./webpack/files')
const extractCSS = require('./webpack/css.extract')

const PATHS = {
  dev: path.join(__dirname, 'app'),
  prod: path.join(__dirname, 'dist') 
};

const productionPath = merge([
  {
    output: {
      path: PATHS.prod,
      filename: 'js/[name].js',
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        test: /\.js$/,
        minimize: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      }),
      new HardSourceWebpackPlugin()
    ]
  }
]);

const developPath = merge([
  {
    output: {
      path: PATHS.dev,
      filename: 'assets/js/[name].js',
    },
  }
]);

const common = merge([
  {
    entry: {
      'bundle': './app/assets/js/index.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './app/pug/index.pug',
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
  },
  pug(),
  files()
]);

module.exports = function(env){
  if (env === 'production'){
    return merge([
      productionPath,
      common,
      extractCSS()
    ]);
  }
  if (env === 'development'){
    return merge([
      developPath,
      common,
      devServer(),
      css(),
      stylus()
    ]);
  }
}
