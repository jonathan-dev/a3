var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    app: './src/main.jsx'
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: ''
  },
  // resolve: {
  //   modules: [resolve('node_modules')],
  //   extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx']    
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: resolve('node_modules'),
        // options: {
        //   presets: ['env']
        // }
        // include: resolve('src')
      },
      {
        test: /\.sass$/,
        use: ["style", "css", "sass"],
        include: resolve('src')
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html',
    inject: 'body'
  })],
  devServer: {
    contentBase: resolve('dist'),
    compress: true,
    port: 9000
  }
}
