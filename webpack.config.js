var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [];

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: './app/pug/index.pug',
  })
);

module.exports = {
  entry: ['./app/assets/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'assets/js/bundle.js',
    publicPath: ''
  },
  module: {
    rules: [
        {
            test : /\.css$/, 
            loader: 'style-loader!css-loader'
        },
        {
            test : /\.styl$/, 
            loader: 'style-loader!css-loader!stylus-loader?resolve url'
        },
        { 
          test: /\.html$/, 
          loader: "html-loader" 
        },
        {
          test: /\.(pug|jade)$/, 
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        },
        {
          test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
          loader: 'file-loader?name=app/assets/[name].[ext]'
        }
    ]
  },
  plugins: plugins,
  devServer:{
  }
}
