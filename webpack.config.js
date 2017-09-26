const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'humble-modal.js',
    path: path.resolve(__dirname, '.'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["env", "react"]
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        warnings: false
      }
    })
  ]
};
