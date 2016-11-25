var path = require('path');
var webpack = require('webpack');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var extractLESS = new ExtractTextPlugin({filename: '[name].css', disable: false, allChunks: true});
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

function root(p) {
    return path.join(__workDir, p);
}

module.exports = {
    output: {
        path: path.join(__workDir, './dist/web'),
        chunkFilename: 'bundle-[chunkhash].js'
    },

    cache: true,

    // TODO: eval on fast develop
    // devtool: __devTool | 'source-map',
    devtool: 'source-map',

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.less'],
    },

    entry: {
        vendor: [
            'react', 'react-dom', 'history'
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
                test: /\.tsx?$/,
                include: [
                    path.join(__workDir, './src/')
                ],
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]',
                include: [
                    path.join(__workDir, './src/')
                ],
            },

            {
                test: /index.html/,
                loader: 'url-loader?limit=1&name=[name].[ext]',
                include: [
                    path.join(__workDir, './src/')
                ],
            }
        ]
    },

    plugins: [
        new ForkCheckerPlugin(),
        new webpack.DefinePlugin({
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
        new ProgressBarPlugin(),

        new webpack.NamedModulesPlugin()
    ]
};