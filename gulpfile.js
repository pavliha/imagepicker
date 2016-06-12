"use strict";

var _gulp = require("gulp");

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpLoadPlugins = require("gulp-load-plugins");

var _gulpLoadPlugins2 = _interopRequireDefault(_gulpLoadPlugins);

var _autoprefixer = require("autoprefixer");

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _cssnano = require("cssnano");

var _cssnano2 = _interopRequireDefault(_cssnano);

var _lost = require("lost");

var _lost2 = _interopRequireDefault(_lost);

var _browserify = require("browserify");

var _browserify2 = _interopRequireDefault(_browserify);

var _browserSync = require("browser-sync");

var _browserSync2 = _interopRequireDefault(_browserSync);

var _webpackStream = require("webpack-stream");

var _webpackStream2 = _interopRequireDefault(_webpackStream);

var _mergeStream = require("merge-stream");

var _mergeStream2 = _interopRequireDefault(_mergeStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browserSync = _browserSync2.default.create();
var $ = (0, _gulpLoadPlugins2.default)();
var JS = {
    watch: 'resources/**/*.{jsx,js}',
    src: 'resources/main.jsx',
    dest: 'public/',
    browSync: 'public/*.js'
};
var STYLES = {
    src: 'resources/styles/**/*.styl',
    dest: 'public/styles',
    browSync: 'public/styles/*.css'
};
var IMAGES = {
    src: 'resources/images/**/*',
    dest: 'public/images'
};
var BLADE = {
    src: "resources/**/*.blade.php"
};
var FONTS = {
    src: "resources/fonts/**/*",
    dest: 'public/fonts'
};

_gulp2.default.task('watch', ['webpack', 'styles', "sw"], function () {

    $.livereload.listen();

    _gulp2.default.watch(JS.watch, ['webpack']);
    _gulp2.default.watch("resources/sw.js", ['sw']);
    _gulp2.default.watch(IMAGES.src, ['images']);
    _gulp2.default.watch(STYLES.src, ['styles']);
    _gulp2.default.watch(BLADE.src, ['blade']);
    _gulp2.default.watch(FONTS.src, ['fonts']);
    _gulp2.default.watch("resources/*.blade.php");
});

_gulp2.default.task('watch:browserSync', ['browserify', 'styles'], function () {

    $.livereload.listen();

    browserSync.init({
        proxy: "cherry.dev"

    });
    _gulp2.default.watch(JS.watch, ['browserify']).on('change', browserSync.reload);
    _gulp2.default.watch(IMAGES.src, ['images']).on('change', browserSync.reload);
    _gulp2.default.watch(STYLES.src, ['styles']).on('change', browserSync.reload);
    _gulp2.default.watch(BLADE.src, ['blade']).on('change', browserSync.reload);
    _gulp2.default.watch(FONTS.src, ['fonts']).on('change', browserSync.reload);
    _gulp2.default.watch("resources/*.blade.php").on('change', browserSync.reload);
});

_gulp2.default.task("blade", function () {
    _gulp2.default.src(BLADE.src).pipe($.livereload()).pipe(browserSync.stream({ match: BLADE.src }));
});

_gulp2.default.task("fonts", function () {
    _gulp2.default.src(FONTS.src).pipe(_gulp2.default.dest(FONTS.dest)).pipe($.livereload());
});

_gulp2.default.task('images', function () {
    _gulp2.default.src(IMAGES.src).pipe($.cache($.imagemin({
        progressive: true,
        interlaced: true
    }))).pipe(_gulp2.default.dest(IMAGES.dest)).pipe($.size({ title: 'images' }));
});

_gulp2.default.task("styles", function () {
    _gulp2.default.src(STYLES.src).pipe($.stylus()).pipe($.postcss([(0, _autoprefixer2.default)({ browsers: ['last 2 versions'] }), (0, _lost2.default)()])).pipe(_gulp2.default.dest(STYLES.dest)).pipe($.livereload());
});

_gulp2.default.task("styles:minify", function () {
    _gulp2.default.src(STYLES.src).pipe($.stylus()).pipe($.postcss([(0, _autoprefixer2.default)({ browsers: ['last 1 version'] }), (0, _cssnano2.default)(), (0, _lost2.default)()])).pipe($.cleanCss()).pipe(_gulp2.default.dest(STYLES.dest));
});

_gulp2.default.task("html", function () {
    var opts = {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        minifyJS: true
    };

    return _gulp2.default.src('./storage/framework/views/*').pipe($.htmlmin(opts)).pipe(_gulp2.default.dest('./storage/framework/views/'));
});

_gulp2.default.task("webpack", function () {
    _gulp2.default.src(JS.src).pipe((0, _webpackStream2.default)(require('./webpack.config.js'))).pipe(_gulp2.default.dest(JS.dest));
});

_gulp2.default.task("sw", function () {
    var sw = _gulp2.default.src("resources/sw.js").pipe($.babel()).pipe(_gulp2.default.dest("public/"));

    var preload = _gulp2.default.src("resources/preload.js").pipe($.babel()).pipe(_gulp2.default.dest("public/"));

    (0, _mergeStream2.default)(sw, preload);
});

_gulp2.default.task("webpack:production", function () {
    _gulp2.default.src(JS.src).pipe((0, _webpackStream2.default)(require('./webpack.production.config'))).pipe(_gulp2.default.dest(JS.dest));
});

_gulp2.default.task('apply-prod-environment', function () {
    process.env.NODE_ENV = 'production';
});

_gulp2.default.task("build", ["apply-prod-environment", "sw", 'webpack:production', "styles:minify", "html"]);
