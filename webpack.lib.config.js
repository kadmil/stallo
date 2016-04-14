var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/lib'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'stallo.js',
    library: 'lib',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(ttf|woff|eot)$/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      }
    ]
  },

  externals: {
    'jquery': 'jQuery',
    'react': 'react',
    'react-dom': 'react-dom'
  }
};
