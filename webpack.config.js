var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');

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
      filename: 'js/bundle.js',
    },
  }
]);

const developPath = merge([
  {
    output: {
      path: PATHS.dev,
      filename: 'assets/js/bundle.js',
    },
  }
]);

const common = merge([
  {
    entry: ['./app/assets/js/index.js'],
    plugins: [
      new HtmlWebpackPlugin({
        template: './app/pug/index.pug',
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
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
