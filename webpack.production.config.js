var path = require('path')
var webpack = require('webpack')

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
})

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/main.js'),
      path.resolve(__dirname, 'src/main.sass')
    ]
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, './www/js'),
    publicPath: './www/js',
    filename: 'babyleap.js'
  },
  plugins: [
    definePlugin,
    new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      minimize: true,
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'src') },
      { test: /\.sass$/, loaders: ['style', 'css', 'sass'] }
    ]
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
    }
  }
}
