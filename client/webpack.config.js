/**
 * Webpack configuration file for transpiling languages to supported ones (ES6 -> ES5, SASS -> CSS, ...)
 * */

var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    app: './src/main.jsx'
  },
  output: {
    path: resolve('../server/dist'),
    filename: 'bundle.js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'src': resolve('src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: resolve('node_modules'),
      },
      {
        test: /\.sass$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },
  plugins: [
    function() {
        this.plugin('watch-run', function(watching, callback) {
            console.log('=====STARTED COMPILING AT ' + new Date().toTimeString() + '=====================================');
            callback();
        })
    },
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body'
    })
  ],
  devServer: {
    contentBase: resolve('dist'),
    historyApiFallback: true,
    compress: true,
    port: 9000
  },
  devtool:'source-map'
};
