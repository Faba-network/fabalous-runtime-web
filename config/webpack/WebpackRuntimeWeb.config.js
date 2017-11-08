var path = require('path');
var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
new webpack.ExtendedAPIPlugin();
var HappyPack = require('happypack');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function getGitHash(){
    try {
        return __gitHash;
    } catch (e){
        return "";
    }
}

function getMaxFileSize(){
    try {
        return __maxAssetSize;
    } catch (e){
        return 1000;
    }
}

function getDevTool(){
    try {
        return __devTool;
    } catch(e){
        return 'source-map';
    }
}

function getHost(){
    try {
        return __host;
    } catch (e){
        return 'localhost'
    }
}

function getPort(){
    try{
        return __port;
    } catch (e){
        return '8080';
    }
}

function getAlias(){
    try {
        return __alias;
    } catch (e){
        return {};
    }
}

//path.join(__workDir, './src/common/web/index.ejs')
function getIndexFile(){
    var ph = path.join(__workDir, './src/common/web/index.ejs');
    var fs = require('fs');
    if (fs.existsSync(ph)) {
        return ph;
    } else {
        return './node_modules/@fabalous/runtime-web/config/webpack/index.ejs';
    }
}

function getDebugMode(){
    try {
        return __debugMode;
    } catch (e){
        return 0;
    }
}

function getCache(){
    try {
        if (__cache == false){
            return './node_modules/@fabalous/runtime-web/config/tsconfig.nocache.web.json'
        }
    } catch (e){
        return './node_modules/@fabalous/runtime-web/config/tsconfig.web.json';
    }
}

module.exports = {
    output: {
        path: path.join(__workDir, './dist/web/debug'),
        chunkFilename: 'bundle-[chunkhash].js',
        filename: `[name]_${getGitHash()}.js`
    },
    performance: { hints: false },
    devtool: getDevTool(),

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: getAlias()
    },

    entry: {
        app: [
            "react-hot-loader/patch",            
            path.join(__workDir, './src/A_Web.ts'), // Your appʼs entry point
            'webpack-dev-server/client?http://'+getHost()+':'+getPort()+'/', // WebpackDevServer host and port
            'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'happypack/loader?id=ts'
            },
            {
                test: /\.(eot|woff|woff2|ttf|png|jpg|mp4|mp3)$/,
                loader: `url-loader?limit=${getMaxFileSize()}&name=assets/[name]_${getGitHash()}.[ext]`,
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },

    plugins: [
        new HappyPack({
            id: 'ts',
            threads: require('os').cpus().length - 3,
            loaders: [
                {
                    path:"react-hot-loader/webpack"
                },
                {
                    path: 'ts-loader',
                    query: {
                        transpileOnly: true,
                        happyPackMode: true,
                        configFile:path.join(__workDir, getCache())
                    }
                }
            ]
        }),
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':  JSON.stringify("development"),
            'process.env.FABALOUS_RUNTIME': JSON.stringify("web"),
            'process.env.FABALOUS_DEBUG': JSON.stringify(1),
            'process.env.API_URL': JSON.stringify(process.env.API_URL),
            'process.env.GOOGLE_ANALYTICS': JSON.stringify(process.env.GOOGLE_ANALYTICS)
        }),
        new HtmlWebpackPlugin({
            hash:true,
            template: getIndexFile()
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
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