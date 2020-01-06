// import path from 'path';

// // only use loaders on our src dir
// const include = path.resolve(__dirname, 'src');

// export default {
//     entry: './src/index',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         // libraryTarget:'umd',
//         library:'p5mimicry', // this is what it will be called on window object
//         filename: 'p5mimicry.min.js'
//     },
//     devtool:'source-map',
//     mode:'production'
// }

import merge from 'webpack-merge';
import common from './webpack.common.babel';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'p5mimicry.min.js'
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
})
