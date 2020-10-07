const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: {
    'leaderboard.v3.js': process.env.INLINE_CSS ? [
      './src/javascript/leaderboard.v3.js',
    ] : [
      './src/javascript/leaderboard.v3.js',
      './src/scss/' + process.env.THEME + '/style.scss'
    ],
    'leaderboard.v3-selfinit.js': './src/javascript/leaderboard.v3-selfinit.js',
    'loader.js': './src/javascript/loader.js'
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, '../build/javascript')
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    port: 9000,
    contentBase: path.join(__dirname, '../..'),
    openPage: process.env.INLINE_CSS
      ? '/examples/leaderboard_v3_inline_css.html'
      : 'examples/leaderboard_v3.html',
    writeToDisk: true
  },
  optimization: {
    minimize: false
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
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|tests)/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/i,
        use: process.env.INLINE_CSS
          ? [
            {
              loader: 'style-loader',
              options: { injectType: 'styleTag' }
            },
            'css-loader',
            'sass-loader'
          ]
          : [
            {
              loader: 'file-loader',
              options: {
                name: '../css/theme/[name].css'
              }
            },
            'sass-loader'
          ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'svg-url-loader',
        query: {
          limit: 8192,
          mimetype: 'application/svg+xml'
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        query: {
          limit: 8192
        }
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.LANG': JSON.stringify(process.env.LANG),
      'process.env.INLINE_CSS': JSON.stringify(process.env.INLINE_CSS),
      'process.env.THEME': JSON.stringify(process.env.THEME)
    }),
    // new BundleAnalyzerPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/i18n', to: '../i18n' },
        { from: 'src/images', to: '../images' },
        { from: 'src/cl-black-theme/images', to: '../cl-black-theme/images' }
      ]
    })
  ]
};
