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
    src: 'resources/js/main.js',
    dest: 'public/js'
};

const STYLES = {
    src: 'resources/styles/main.styl',
    dest: 'public/styles'
};


const IMAGES = {
    src: 'resources/images/**/*',
    dest: 'public/styles'
};


gulp.task('watch', ()=> {
    $.livereload.listen();
    gulp.watch(JS.src, ['browserify']);
    gulp.watch(IMAGES.src, ['images']);
    gulp.watch(STYLES.src, ['styles']);
});

gulp.task("browserify", ()=> {
    return browserify({
        entries: [JS.src],
        debug: true
    })
        .on('error', (err) => {
            console.error(err);
            this.emit('end')
        })
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .pipe(vinylSource('main.js')) // generated output file
        .pipe(vinylBuffer())         // required for sourcemaps
        .pipe($.sourcemaps.init())
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
    gulp.src('resources/images/**/*')
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
            autoprefixer({browsers: ['last 1 version']}),
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





