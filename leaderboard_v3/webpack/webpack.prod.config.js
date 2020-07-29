const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: {
    'leaderboard.v3.js': './src/javascript/leaderboard.v3.js',
    'loader.js': './src/javascript/loader.js'
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, '../build/javascript')
  },
  mode: 'production', // production | development
  optimization: {
    minimize: true
  },
  watch: false,
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader'
      // },
      {
        test: /\.js$/,
        exclude: /(node_modules|tests)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { debug: false }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/css', to: '../css' },
        { from: 'src/i18n', to: '../i18n' },
        { from: 'src/images', to: '../images' }
      ]
    })
  ]
};
