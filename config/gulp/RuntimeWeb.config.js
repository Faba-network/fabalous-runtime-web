module.exports = function (gulp){
    var webpack = require('webpack');
    var WebpackDevServer = require("webpack-dev-server");
    var path = require('path');
    var CompressionPlugin = require('compression-webpack-plugin');

    var developConfig = require("./../webpack/WebpackRuntimeWeb.config");

    gulp.task('runtime-web-watch', function() {
        new WebpackDevServer(webpack(developConfig), {
            publicPath: '/',
            contentBase: path.join(__workDir, './dist/web/'),
            hot: true,
            stats: {
                colors: true,
                chunks:false,
                assets:true,
                modules:false,
                version:true,
                errors:true
            }
        }).listen(8080, 'localhost', function(err) {
            if (err) console.error(err);
        });
    });

    gulp.task('runtime-web-build', function(done) {
        var myConfig = developConfig;
        myConfig.devtool = false;

        myConfig.plugins = [
            new ForkCheckerPlugin(),
            new webpack.DefinePlugin({
                CLIENT: true,
                SERVER: false,
                TEST: false
            }),

            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity,
                minChunkSize: 50000,
                filename: 'vendor.bundle.js'
            }),

            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                sourceMap: false
            }),

            new webpack.NamedModulesPlugin(),
            new webpack.NoErrorsPlugin(),
            new CompressionPlugin()
            //new ExtractTextPlugin({filename: '[name].css', disable: false, allChunks: true})
        ];

        webpack(myConfig).run(onBuild(done));
    });

    function onBuild(done) {
        return function(err, stats) {
            if(err)console.error('Error', err);
            else console.log(stats.toString());
            if(done) done();
        }
    }
}