const path = require('path');

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: ['./dist'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
