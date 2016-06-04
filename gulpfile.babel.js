"use strict";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import lost from "lost";
import browserify from "browserify";
import broWserSync from "browser-sync";
import webpack from "webpack-stream";
import merge from "merge-stream";


const browserSync = broWserSync.create();
const $ = gulpLoadPlugins();
const JS = {
    watch: 'resources/**/*.jsx',
    src: 'resources/main.jsx',
    dest: 'public/',
    browSync: 'public/*.js'
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


gulp.task('watch', ['webpack', 'styles',"sw"], ()=> {

    $.livereload.listen();

    gulp.watch(JS.watch, ['webpack']);
    gulp.watch("resources/sw.js", ['sw']);
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
    var opts = {
        collapseWhitespace:    true,
        removeAttributeQuotes: true,
        removeComments:        true,
        minifyJS:              true
    };

    return gulp.src('./storage/framework/views/*')
        .pipe($.htmlmin(opts))
        .pipe(gulp.dest('./storage/framework/views/'));
});

gulp.task("webpack", ()=> {
    gulp.src(JS.src)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(JS.dest));
});

gulp.task("sw", ()=> {
    let sw = gulp.src("resources/sw.js")
        .pipe($.babel())
        .pipe(gulp.dest("public/"));

    let preload = gulp.src("resources/preload.js")
        .pipe($.babel())
        .pipe(gulp.dest("public/"));

    merge(sw, preload);

});

gulp.task("webpack:production", ()=> {
    gulp.src(JS.src)
        .pipe(webpack(require('./webpack.production.config')))
        .pipe(gulp.dest(JS.dest));
});

gulp.task('apply-prod-environment', function () {
    process.env.NODE_ENV = 'production';
});

gulp.task("build", ["apply-prod-environment","sw",'webpack:production', "styles:minify", "html"]);

