var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');

config.devtool = 'source-map';

config.entry = {
  "sb": './src/sb',
  "stories": './src/stories-api.js',
  "app": './src/app',
  "user-stories": './src/stories'
};

config.output = {
  publicPath: '/',
  path: path.join(__dirname, "js"),
  filename: "[name].min.js",
  library: ["min", "[name]"]
};

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;
