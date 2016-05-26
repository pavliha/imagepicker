var path = require('path');
var webpack = require('webpack');

module.exports = {

    entry: './resources/js/main.jsx',

    output: { path: __dirname, filename: 'public/js/main.js' },

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
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            compress: {warnings: false},
            sourceMaps:true,
        })
    ]
};
