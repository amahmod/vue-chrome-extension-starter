const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

const config = {
  context: path.resolve(__dirname, './src'),
  entry: {
    options: ['./option/option.js'],
    background: ['./background/background.js'],
    content: ['./content/content.js'],
  },
  resolve: {
    alias: {
      vue$: prod ? 'vue/dist/vue.runtime.min.js' : 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', 'vue'],
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
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'sass-loader',
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
      filename: 'options.html',
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
