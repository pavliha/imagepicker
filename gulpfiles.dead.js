"use strict";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import autoprefixer from "autoprefixer";
import babelify from "babelify";
import cssnano from "cssnano";
import lost from "lost";
import browserify from "browserify";
import vinylBuffer from "vinyl-buffer";
import vinylSource from "vinyl-source-stream";
import debowerify from "debowerify";
import broWserSync from "browser-sync";
import webpack from "webpack-stream";


const browserSync = broWserSync.create();
const $ = gulpLoadPlugins();
const JS = {
    watch: 'resources/js/**/*.jsx',
    src: 'resources/js/main.jsx',
    dest: 'public/js/',
    browSync: 'public/js/*.js'
};
const STYLES = {
    src: 'resources/styles/**/*.styl',
    dest: 'public/styles',
    browSync: 'public/styles/*.css'
};
const IMAGES = {
    src: 'resources/images/**/*',
    dest: 'public/images'
};
const BLADE = {
    src: "resources/**/*.blade.php"
};
const FONTS = {
    src: "resources/fonts/**/*",
    dest: 'public/fonts'
};


gulp.task('watch', ['webpack', 'styles'], ()=> {

    $.livereload.listen();

    gulp.watch(JS.watch, ['webpack']);
    gulp.watch(IMAGES.src, ['images']);
    gulp.watch(STYLES.src, ['styles']);
    gulp.watch(BLADE.src, ['blade']);
    gulp.watch(FONTS.src, ['fonts']);
    gulp.watch("resources/*.blade.php");

});

gulp.task('watch:browserSync', ['browserify', 'styles'], ()=> {

    $.livereload.listen();

    browserSync.init({
        proxy: "cherry.dev"

    });
    gulp.watch(JS.watch, ['browserify']).on('change', browserSync.reload);
    gulp.watch(IMAGES.src, ['images']).on('change', browserSync.reload);
    gulp.watch(STYLES.src, ['styles']).on('change', browserSync.reload);
    gulp.watch(BLADE.src, ['blade']).on('change', browserSync.reload);
    gulp.watch(FONTS.src, ['fonts']).on('change', browserSync.reload);
    gulp.watch("resources/*.blade.php").on('change', browserSync.reload);

});

gulp.task("blade", ()=> {
    gulp.src(BLADE.src)
        .pipe($.livereload())
        .pipe(browserSync.stream({match: BLADE.src}));
});

gulp.task("fonts", ()=> {
    gulp.src(FONTS.src)
        .pipe(gulp.dest(FONTS.dest))
        .pipe($.livereload())
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

gulp.task("styles:minify", ()=> {
    gulp.src(STYLES.src)
        .pipe($.stylus())
        .pipe($.postcss([
            autoprefixer({browsers: ['last 1 version']}),
            cssnano(),
            lost()
        ]))
        .pipe($.cleanCss())
        .pipe(gulp.dest(STYLES.dest))
});

gulp.task("html", ()=> {
    gulp.src("storage/framework/views/**/*.php")
        .pipe($.htmlmin({collapseWhitespace: true}));
    gulp.dest("storage/framework/views")
});

gulp.task("webpack", ()=> {
    gulp.src(JS.src)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(JS.dest));
});

gulp.task('apply-prod-environment', function () {
    process.env.NODE_ENV = 'production';
});

gulp.task("production", ["apply-prod-environment", 'browserify:uglifyjs', "styles:minify", "html"]);




//Dead code


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
            .transform(debowerify)
            .bundle())
        .on('error', (err) => {
            console.error(err);
            this.emit('end')
        })
        .pipe(vinylSource('main.js')) // generated output file
        .pipe(vinylBuffer())         // required for sourcemaps
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest(JS.dest))
        .pipe($.livereload())
        .pipe(browserSync.stream({match: JS.browSync}));

});

gulp.task("browserify:serviceWorker", ()=> {

    return $.sourcemaps.init()
        .pipe(browserify({
            entries: [JS.sw.src],
            debug: true
        })
            .on('error', (err) => {
                console.error(err);
                this.emit('end')
            })

            .transform("babelify")
            .transform(debowerify)
            .bundle())
        .on('error', (err) => {
            console.error(err);
            this.emit('end')
        })
        .pipe(vinylSource('sw.js')) // generated output file
        .pipe(vinylBuffer())         // required for sourcemaps
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest(JS.dest))
        .pipe($.livereload())
        .pipe(browserSync.stream({match: JS.browSync}));

});

gulp.task("browserify:uglifyjs", ()=> {

    return browserify({
        entries: [JS.src],
        debug: true
    })
        .on('error', (err) => {
            console.error(err);
            this.emit('end')
        })

        .transform("babelify")
        .transform(debowerify)
        .bundle()
        .on('error', (err) => {
            console.error(err);
            this.emit('end')
        })
        .pipe(vinylSource('main.js')) // generated output file
        .pipe(vinylBuffer())         // required for sourcemaps
        .pipe($.uglify())
        .pipe(gulp.dest(JS.dest))
        .pipe($.livereload());

});

gulp.task("uglifyjs", ()=> {

    return gulp.src("public/js/main.js")
        .pipe(vinylSource('main.min.js')) // generated output file
        .pipe(vinylBuffer())         // required for sourcemaps
        .pipe($.uglify())
        .pipe(gulp.dest(JS.dest))
        .pipe($.livereload());

});
