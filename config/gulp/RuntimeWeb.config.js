var path = require('path');
var HappyPack = require('happypack');

function getIndexFile(){
    var ph = path.join(__workDir, './src/common/web/index.ejs');
    var fs = require('fs');
    if (fs.existsSync(ph)) {
        return ph;
    } else {
        return './node_modules/@fabalous/runtime-web/config/webpack/index.ejs';
    }
}

function getGitHash(){
    try {
        return __gitHash;
    } catch (e){
        return "";
    }
}


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
            historyApiFallback: true,
            stats: {
                colors: true,
                chunks:false,
                assets:true,
                modules:false,
                version:true,
                errors:true
            },
            proxy: {
                "/api": {
                    "target": {
                        "host": "localhost",
                        "protocol": 'http:',
                        "port": 8081
                    },
                    ignorePath: true,
                    changeOrigin: true,
                    secure: false
                }
            }
        }).listen(getPort(), getHost(), function(err) {
            if (err) console.error(err);
        });
    });

    gulp.task('runtime-web-build', function(done) {
        var myConfig = developConfig;

        myConfig.output = {
            path: path.join(__workDir, './dist/web/'),
            chunkFilename: 'bundle-[chunkhash].js',
            filename: `[name]_${getGitHash()}.js`
        };

        myConfig.entry = {
            app: [
                path.join(__workDir, './src/A_Web.ts')
            ]
        };
        myConfig.mode = "production";
        myConfig.devtool = false;

        myConfig.plugins = [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV':  JSON.stringify("production"),
                'process.env.FABALOUS_RUNTIME': JSON.stringify("web"),
                'process.env.FABALOUS_DEBUG': JSON.stringify(1),
                'process.env.API_URL': JSON.stringify(process.env.API_URL),
                'process.env.GOOGLE_ANALYTICS': JSON.stringify(process.env.GOOGLE_ANALYTICS)
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),


            new HtmlWebpackPlugin({
                hash:true,
                template: getIndexFile(),
                chunksSortMode:"none"
            }),

            new CompressionPlugin(),
            new webpack.ExtendedAPIPlugin()
        ];

        webpack(myConfig).run(onBuild(done));
    });

    gulp.task('runtime-web-build-debug', function(done) {
        var myConfig = developConfig;

        myConfig.output = {
            path: path.join(__workDir, './dist/web/'),
            chunkFilename: 'bundle-[chunkhash].js',
            filename: `[name]_${getGitHash()}.js`
        };

        myConfig.entry = {
            app: [
                path.join(__workDir, './src/A_Web.ts')
            ]
        };

        myConfig.devtool = 'source-map';

        myConfig.plugins = [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV':  JSON.stringify("development"),
                'process.env.FABALOUS_RUNTIME': JSON.stringify("web"),
                'process.env.FABALOUS_DEBUG': JSON.stringify(1),
                'process.env.GOOGLE_ANALYTICS': JSON.stringify(process.env.GOOGLE_ANALYTICS)
            }),

            new HtmlWebpackPlugin({
                hash:true,
                template: getIndexFile(),
                chunksSortMode:"none"
            }),

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
};

function isExternal(module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('bower_components') >= 0 ||
        userRequest.indexOf('node_modules') >= 0 ||
        userRequest.indexOf('libraries') >= 0;
}