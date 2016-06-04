var path = require('path');
var webpack = require('webpack');
var config = require("./webpack.config");

config.debugTool = "cheap-module-source-map";

config.plugins = [

    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            screw_ie8: true
        },
        comments: false,
        sourceMap: false
    })
];

module.exports = config;
