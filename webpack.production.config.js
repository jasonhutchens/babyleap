var path = require('path')
var webpack = require('webpack')
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')

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
    path: path.resolve(__dirname, './www'),
    publicPath: './www',
    filename: 'babyleap.js'
  },
  plugins: [
    definePlugin,
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/main.png'),
      prefix: 'icons/',
      statsFilename: 'icons.json',
      persistentCache: true,
      inject: false,
      background: '#FFFFFF',
      title: 'BabyLeap',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: true
      }
    }),
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
