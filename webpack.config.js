const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

new webpack.DefinePlugin({
  __VUE_PROD_DEVTOOLS__: false,
})

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

const config = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? 'source-map' : 'eval-cheap-module-source-map',
  context: path.resolve(__dirname, './src'),
  entry: {
    options: ['./option/option.js'],
    background: ['./background/background.js'],
    content: ['./content/content.js'],
  },
  resolve: {
    alias: {
      vue: '@vue/runtime-dom',
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: prod,
        },
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: !prod },
          },
          'css-loader',
        ],
      },
    ],
  },
  mode,
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      title: 'Options',
      template: './index.html',
      filename: 'option.html',
      chunks: ['options'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets', to: 'assets' },
        { from: 'manifest.json', to: 'manifest.json' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  stats: {
    assetsSort: '!size',
    children: false,
    usedExports: false,
    modules: false,
    entrypoints: false,
    // Hide source maps from output
    excludeAssets: [/\.*\.map/],
  },
}

module.exports = config
