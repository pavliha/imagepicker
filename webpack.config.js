var path = require('path');
var webpack = require('webpack');

module.exports = {

    entry: {
        main:'./resources/main.jsx',
        react: ["react","react-dom"],
    },

    progress:true,

    output: {
        filename: '[name].js'
    },

    devtool: 'cheap-source-map',

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
        new webpack.optimize.CommonsChunkPlugin('react', 'react.js',Infinity),

        new webpack.optimize.DedupePlugin(),

    ]
};
