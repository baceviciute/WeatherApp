const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [{
           loader: 'file-loader',
           options: {
             outputPath: 'images',
             name: '[name].[ext]'
           },
         },

         ]
       }
     ]
   },
   plugins: [
     new webpack.ProvidePlugin({
       Popper: ['popper.js', 'default']
     })
   ]
  };
