const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const filename = 'leaderboard.v3.js';

module.exports = {
  entry: `./src/javascript/${filename}`,
  output: {
    filename,
    path: path.resolve(__dirname, '../build/javascript'),
  },
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    minimize: false,
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 600
  },
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
        exclude: /(node_modules|tests)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {"debug": true}]
            ],
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
        { from: 'src/images', to: '../images' },
      ],
    }),
  ]
};

