var path    = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    "sb": './src/sb',
    "stories": './src/stories-api.js',
  },
  module: {
    loaders: [
       { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
       { test: /\.html$/, loader: 'raw' },
       { test: /\.less$/, loader: 'style!css!less' },
       { test: /\.css$/, loader: 'style!css' }
    ]
  },
  plugins: []
};
