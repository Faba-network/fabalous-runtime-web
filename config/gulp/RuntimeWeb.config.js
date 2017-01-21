module.exports = function (gulp){
    var webpack = require('webpack');
    var WebpackDevServer = require("webpack-dev-server");
    var path = require('path');
    var CompressionPlugin = require('compression-webpack-plugin');
    var HtmlWebpackPlugin = require('html-webpack-plugin');

    var developConfig = require("./../webpack/WebpackRuntimeWeb.config");

    function getHost(){
        if (__host) return __host;
        else return 'localhost';
    }

    function getPort(){
        if (__port) return __port;
        else return '8080';
    }

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
        }).listen(getPort(), getHost(), function(err) {
            if (err) console.error(err);
        });
    });

    gulp.task('runtime-web-build', function(done) {
        var myConfig = developConfig;

        myConfig.entry = {
            app: [
                path.join(__workDir, './src/A_Web.ts')
            ]
        };

        myConfig.devtool = false;

        myConfig.plugins = [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV':  JSON.stringify("production"),
                'process.env.FABALOUS_RUNTIME': JSON.stringify("web"),
                'process.env.FABALOUS_DEBUG': JSON.stringify("1")
            }),

            new webpack.optimize.CommonsChunkPlugin({
                name: 'app',
                minChunks: Infinity,
                minChunkSize: 50000,
                filename: 'app.js'
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

            new HtmlWebpackPlugin({
                hash:true,
                template: path.join(__workDir, './src/common/web/index.ejs')
            }),

            new webpack.NoErrorsPlugin(),
            new CompressionPlugin(),
            new webpack.ExtendedAPIPlugin()

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