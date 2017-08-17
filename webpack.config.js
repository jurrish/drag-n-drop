'use strict';

require('dotenv').config({path:`${__dirname}/.env`})

//if NODE_ENV is set to 'production', our const production variable will have a truthy value. else it'll be falsy.
const production = process.env.NODE_ENV === 'production'

const { DefinePlugin, EnvironmentPlugin } = require('webpack')
const HTMLPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');


let plugins = [
  new EnvironmentPlugin(['NODE_ENV']),
  new ExtractPlugin('bundle-[hash].css'),
  new HTMLPlugin({ template: `${__dirname}/src/index.html` }),
  new DefinePlugin({
    __DEBUG__: JSON.stringify(!production),
  }),
]

if(production)
  plugins = plugins.concat([ new CleanPlugin(), new UglifyPlugin() ])


module.exports = {
  devtool: 'eval',
  entry: `${__dirname}/src/main.js`,
  devServer: { historyApiFallback: true },
  output: {
    //what to name the bundle
    filename: `bundle-[hash].js`,
    //where to put the file when it's done
    path: `${__dirname}/build`,
    //appends all of our src tags with this string. ie - <i src="locallySavedImage/useThis.jpg"> gets an appended local source
    publicPath: process.env.CDN_URL,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.(woff|woff2|ttf|eot|glyph\.svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'font/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|gif|png|tiff|svg)$/,
        exclude: /\.glyph.svg/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 60000,
              name: 'image/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp3|aac|aiff|wav|flac|m4a|ogg)$/,
        exclude: /\.glyph.svg/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'audio/[name].[ext]' },
          },
        ],
      },
    ],
  },
}
