var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //開啟MHR
    new webpack.NamedModulesPlugin(), //MHR更新時，會確實的顯示相關的名稱
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('dev') }),
    new HtmlWebpackPlugin({
      template: './src/layout.pug',
      filename:'./layout.html'
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    host: '0.0.0.0',
    before(app, server) {
      server._watch(`./src/**.pug`);
    }
  }

};