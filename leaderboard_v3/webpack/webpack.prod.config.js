const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const filename = 'leaderboard.v3.js';

module.exports = {
  entry: `./src/javascript/${filename}`,
  output: {
    filename,
    path: path.resolve(__dirname, '../build'),
  },
  mode: 'production',
  optimization: {
    minimize: true,
  },
  watch: false,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /(tests)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {"debug": false}]
            ],
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/css', to: '../css' },
        { from: 'src/i18n', to: '../i18n' },
        { from: 'src/images', to: '../images' },
      ],
    }),
  ]
};
