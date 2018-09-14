const utils = require('svg-mixer-test/utils');
const supports = utils.webpackFeatureDetector(require('webpack'));
const ExtractCssPlugin = !supports.miniCssExtractPlugin && require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = supports.miniCssExtractPlugin && require('mini-css-extract-plugin');
const SpritePlugin = require('extract-svg-sprite-webpack-plugin');

module.exports = utils.createBaseWebpackConfig({
  entry: './main.css',

  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: SpritePlugin.loader
      },
      {
        test: /\.css$/,
        use: supports.miniCssExtractPlugin
          ? [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
          : ExtractCssPlugin.extract({use: [
              'css-loader'
            ]
          })
      }
    ]
  },

  plugins: [
    supports.miniCssExtractPlugin
      ? new MiniCssExtractPlugin()
      : new ExtractCssPlugin('[name].css'),

    new SpritePlugin({
      spriteType: 'stack'
    })
  ]
}, {
  remove: ['main.js']
});
