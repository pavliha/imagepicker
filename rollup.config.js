import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    // The entry and destination need to be specified
    entry: 'resources/js/main.jsx',
    dest: 'public/js/main.js',
    format: 'iife',
    intro: '/* Author: Sunjay Varma <varma.sunjay@gmail.com> */',
    sourceMap: 'inline',
    plugins: [
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: ["react", "es2015-rollup"]
        }),
        nodeResolve({
            jsnext: true,
            main: true,
            browser: true,
            extensions: ['.js', '.jsx']
        }),
        commonjs({
            include: 'node_modules/**'
        })
    ]
};