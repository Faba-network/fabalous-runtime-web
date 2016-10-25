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

        myConfig.entry = {
            vendor: [
                'react', 'react-dom', 'react-router', 'history'
            ],

            app: [
                path.join(__workDir, './src/A_Web.ts')
            ]
        };

        myConfig.devtool = false;

        myConfig.plugins = [
            new webpack.DefinePlugin({
                CLIENT: true,
                SERVER: false,
                TEST: false,
                'process.env': JSON.stringify("production")
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

            new webpack.NoErrorsPlugin(),
            new CompressionPlugin()
            //new ExtractTextPlugin({filename: '[name].css', disable: false, allChunks: true})
        ];

        webpack(myConfig).run(onBuild(done));
    });

    function onBuild(done) {
        return function(err, stats) {
            gulp.src(__workDir+"/src/manifest.json")
                .pipe(gulp.dest(__workDir+"/dist/web/"));

            if(err)console.error('Error', err);
            else console.log(stats.toString());
            if(done) done();
        }
    }
}