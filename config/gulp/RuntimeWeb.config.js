module.exports = function (gulp){
    var webpack = require('webpack');
    var WebpackDevServer = require("webpack-dev-server");
    var path = require('path');

    var CompressionPlugin = require('compression-webpack-plugin');

    // TODO: Override Web?
    var developConfig = require("./../webpack/WebpackRuntimeWeb.config");
    var testConfig = require("./../webpack/WebpackRuntimeWebTest.config");
    var buildConfig = developConfig;

    gulp.task('runtime-web-watch', function() {
        console.log(path.join(__workDir, './dist/web/'));

        new WebpackDevServer(webpack(developConfig), {
            publicPath: '/',
            contentBase: path.join(__workDir, './dist/web/'),
            hot: true,
            quiet: false,
            noInfo: false,
            stats: {
                colors: true
            }
        }).listen(8080, "localhost", function(err) {
            if (err) console.error(err);
        });
    });

    gulp.task('runtime-web-build', function(done) {
        var myConfig = developConfig;
        myConfig.debug = false;
        myConfig.devtool = null;

        myConfig.entry = {
            vendor: [
                'react', 'react-dom','react-router','history','material-ui'
            ],
            app: [
                path.join(__workDir, './src/A_Web.tsx') // Your appʼs entry point
            ]
        };

        myConfig.plugins = [
            /*
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                sourceMap: false
            }),
            */
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                'process.env': { NODE_ENV: JSON.stringify('production') }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity,
                filename: 'vendor.bundle.js'
            }),
            new webpack.NoErrorsPlugin(),
            new CompressionPlugin()
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