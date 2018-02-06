var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [];

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build') // не использую
};

plugins.push(
  new HtmlWebpackPlugin({
    template: './app/pug/index.pug',
  }),
  new webpack.HotModuleReplacementPlugin()
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
          test: /\.(pug|jade)$/, 
          exclude: /node_modules/,
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        },
        {
          test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
          loader: 'file-loader?name=app/assets/[name].[ext]'
        },
        {
          test : /\.styl$/, 
          loader: 'style-loader!css-loader!stylus-loader',
          exclude: /node_modules/
        },
        {
            test : /\.css$/, 
            loader: 'style-loader!css-loader'
        },
    ]
  },
  plugins: plugins,
  devServer:{
    stats: 'errors-only',
    port: 9000
  }
}
