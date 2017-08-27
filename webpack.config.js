var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public/js');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: {
    // Add new entries here, will be automatically created
    // with name [name].entry.js in src/client/public/js
    createPostPage: APP_DIR + '/create_post_page.jsx',
    hotPagePostList: APP_DIR + '/hot_page_post_list.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].entry.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;
