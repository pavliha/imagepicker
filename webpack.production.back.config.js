var path = require('path');
var webpack = require('webpack');

module.exports = {

    entry: {
        main:'./resources/main.jsx',
        sw: "./resources/sw.js",
        preload: "./resources/preload.js",
        react: ["react","react-dom"],
    },

    progress:true,

    output: {
        filename: '[name].js'
    },

    devtool: 'cheap-module-source-map',

    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,


            },
            {
                // I want to uglify with mangling only app files, not thirdparty libs
                test: /.*\/app\/.*\.js$/,
                exclude: /.spec.js/, // excluding .spec files
                loader: "uglify"
            }

        ]
    },

    plugins: [

        new webpack.optimize.CommonsChunkPlugin('react', 'react.js', Infinity),
        new webpack.optimize.CommonsChunkPlugin('sw', 'sw.js', Infinity),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true
            },
            comments: false,
            sourceMap: false
        })
    ]
};
