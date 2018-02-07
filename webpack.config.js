var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');

const pug = require('./webpack/pug')
const devServer = require('./webpack/devserver')
const stylus = require('./webpack/stylus')
const css = require('./webpack/css')
const images = require('./webpack/images')

const PATHS = {
  app: path.join(__dirname, 'app'),
  prod: path.join(__dirname, 'dir') // не использую
};

const common = merge([
  {
    entry: ['./app/assets/js/index.js'],
    output: {
      path: path.resolve(__dirname, 'app'),
      filename: 'assets/js/bundle.js',
      publicPath: ''
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './app/pug/index.pug',
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  },
  pug()
]);

module.exports = function(env){
  if (env === 'production'){
      return common;
  }
  if (env === 'development'){
      return merge([
        common,
        devServer(),
        css(),
        stylus(),
        images()
      ]);
  }
}
