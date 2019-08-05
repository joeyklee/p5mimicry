// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { join, resolve } from 'path';

const include = join(__dirname, 'src');

export default {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    libraryTarget: 'umd',
    filename: 'nocjs.js',
    library: 'nocjs',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include,
      },
    ],
  },
  node: {
    fs: "empty"
  }
};
