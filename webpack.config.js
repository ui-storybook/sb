var path = require('path');
var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.md$/, loader: "html!markdown" }
    ]
  },
  plugins: []
};
