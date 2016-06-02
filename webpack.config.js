var path = require('path');
var webpack = require('webpack');

module.exports = {

    entry: {
        main:'./resources/js/main.jsx',
        sw: "./resources/js/sw.js"
    },

    output: {filename: '[name].js' },

    devtool: 'source-map',
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
    }  ,plugins: [
        // new webpack.DefinePlugin({
        //     "process.env": {
        //         NODE_ENV: JSON.stringify("production")
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     mangle: false,
        //     compress: {warnings: false},
        //     sourceMaps:true,
        // })
    ]
};
