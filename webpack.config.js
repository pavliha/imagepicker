var path = require('path');
var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {

    entry: {
        main:'./resources/js/main.jsx',
        react: ["react","react-dom"],
        fabric: ["fabric"],
    },

    progress:true,

    output: {
        filename: '[name].js'
    },

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
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            minChunks: Infinity,
            filename: 'react.js'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        //new webpack.optimize.CommonsChunkPlugin('react', 'react.js',Infinity),
        new webpack.optimize.DedupePlugin(),
        new LiveReloadPlugin({port:4014})

    ]
};
