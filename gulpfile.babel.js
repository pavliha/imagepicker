"use strict";
import gulp from "gulp";
import gulpLoadPlugins from 'gulp-load-plugins';
import autoprefixer from "autoprefixer";
import {rollup} from "rollup";
import babelify from 'babelify';
import cssnano from "cssnano";
import lost from 'lost';
import browserify from "browserify";
import vinylBuffer from 'vinyl-buffer';
import vinylSource from 'vinyl-source-stream'

const $ = gulpLoadPlugins();

const JS = {
    watch: 'resources/js/**/*.jsx',
    src: 'resources/js/main.jsx',
    dest: 'public/js'
};

const STYLES = {
    src: 'resources/styles/**/*.styl',
    dest: 'public/styles'
};


const IMAGES = {
    src: 'resources/images/**/*',
    dest: 'public/images'
};
const BLADE = {
    src:"resources/**/*.blade.php"
};


gulp.task('watch', ['browserify', 'styles'], ()=> {

    $.livereload.listen();
    gulp.watch(JS.watch, ['browserify']);
    gulp.watch(IMAGES.src, ['images']);
    gulp.watch(STYLES.src, ['styles']);
    gulp.watch(BLADE.src, ['blade']);
});










gulp.task("blade",()=>{
    gulp.src(BLADE.src)
        .pipe($.livereload())
});

gulp.task("browserify", ()=> {

    return $.sourcemaps.init()
        .pipe(browserify({
        entries: [JS.src],
        debug: true
    })
        .on('error', (err) => {
            console.error(err);
            this.emit('end')
        })

        .transform("babelify")
        .bundle())
        .pipe(vinylSource('main.js')) // generated output file
        .pipe(vinylBuffer())         // required for sourcemaps
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest(JS.dest))
        .pipe($.livereload());

});

gulp.task("rollup", ()=> {

    gulp.src(JS.src, {read: false})
        .pipe($.rollup({
            sourceMap: true,
            plugins: [
                babel({
                    presets: ["react", 'es2015-rollup'],
                    babelrc: false,
                    exclude: 'node_modules/**'
                })
            ]
        }))
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest(JS.dest))
});

gulp.task('images', () => {
    gulp.src(IMAGES.src)
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(IMAGES.dest))
        .pipe($.size({title: 'images'}))
});

gulp.task("styles", ()=> {
    gulp.src(STYLES.src)
        .pipe($.stylus())
        .pipe($.postcss([
            autoprefixer({browsers: ['last 2 versions']}),
            lost()
        ]))

        .pipe(gulp.dest(STYLES.dest))
        .pipe($.livereload());
});

gulp.task("styles:production", ()=> {
    gulp.src(STYLES.src)
        .pipe($.postcss([
            autoprefixer({browsers: ['last 1 version']}),
            cssnano(),
            lost()
        ]))
        .pipe($.stylus())
        .pipe(gulp.dest(STYLES.dest))
});

gulp.task('rollup:es6', () => {
    return rollup({
        entry: JS.src,
        sourceMap: true,
        plugins: [
            babel({
                presets: ["react", 'es2015-rollup'],
                babelrc: false,
                exclude: 'node_modules/**'
            })
        ]
    }).then(bundle => {
        return bundle.write({
            format: "iife",
            dest: JS.dest
        })
    });
});





