var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
  },
  module: {
    rules: [
      {
        /* loader: https://github.com/pugjs/pug-loader */
        test: /\.pug$/,
        use: [
          { loader: 'pug-loader', options: { doctype: 'pug', pretty: true } }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: { name: 'assets/[name].[ext]' }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 2 } },
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //開啟MHR
    new webpack.NamedModulesPlugin(), //MHR更新時，會確實的顯示相關的名稱
    new CleanWebpackPlugin(['dist']), //每次build前清空dist
    new HtmlWebpackPlugin({
      template: './src/pages/index.pug',
      filename:'./index.html'
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    host: '0.0.0.0',
    before(app, server) {
      server._watch(`./src/pages/*.pug`);
    }
  }

};