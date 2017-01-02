var path = require('path')
var webpack = require('webpack')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
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
  devtool: 'source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, './www'),
    publicPath: './www',
    filename: 'babyleap.js'
  },
  watch: true,
  plugins: [
    definePlugin,
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      open: false,
      server: {
        baseDir: ['./www']
      }
    }),
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
    })
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
