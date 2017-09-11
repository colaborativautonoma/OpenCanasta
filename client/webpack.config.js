const path = require('path');
const APP_DIR = path.join(__dirname, 'src');
const BUILD_DIR = path.join(__dirname, 'dist');

const CONFIG = {
  resolve: {
    extensions: ['.js', '.css']
  },
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: APP_DIR,
        loaders: ['style-loader', 'css-loader'],
      },
    ]
  },
};

module.exports = CONFIG