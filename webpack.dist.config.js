var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');

config.entry = {
  "sb": './src/sb/index.js',
  "stories": './src/stories-api.js',
  "ng-helper": './src/helpers/angular/helper.js',
};

config.output = {
  filename: '[name].js',
  publicPath: '',
  path: path.resolve(__dirname, 'dist')
};

config.plugins = config.plugins.concat([
  
]);

module.exports = config;
