var path = require('path');
var webpack = require('webpack');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractLESS = new ExtractTextPlugin({filename: '[name].css', disable: false, allChunks: true});

function root(p) {
  return path.join(__workDir, p);
}

module.exports = {
  output: {
    path: path.join(__workDir, './dist/web'),
    chunkFilename: 'bundle-[chunkhash].js'
  },

  debug: false,
  noInfo: false,
  quiet: false,

  publicPath:'http://localhost:8080/',
  devtool: 'source-map',

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.less'],
  },

  entry: {
    vendor: [
      'react', 'react-dom', 'react-router', 'history'
    ],

    app: [
      path.join(__workDir, './src/A_Web.ts'), // Your appʼs entry point
      'webpack-dev-server/client?http://localhost:8080/', // WebpackDevServer host and port
      'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors
    ]
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        include:[
          path.join(__workDir, './src/')
        ],
        loaders: [
          'react-hot',
          'babel?presets[]=es2015',
          'awesome-typescript-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json',
        exclude: /node_modules/
      },
      {
        test: /index.html/,
        loader: 'url-loader?limit=1&name=[name].[ext]',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),
    new webpack.DefinePlugin({
      //'process.env': {NODE_ENV: JSON.stringify('production')},
      CLIENT: true,
      SERVER: false,
      TEST: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      minChunkSize: 50000,
      filename: 'vendor.bundle.js'
    }),

    new webpack.NamedModulesPlugin()
  ]
};