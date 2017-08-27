// Webpack 2 config

const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, './public');

const Webpack = require('webpack');

const plugins = [
  new Webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new Webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];

module.exports = {
  entry: {
    bundle: ['whatwg-fetch', SRC_PATH + '/app']
  },
  output: {
    path: BUILD_PATH,
    publicPath: '',
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: SRC_PATH,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ["relay", "transform-runtime"]
        }
      }
    ]
  },
  plugins: plugins
}