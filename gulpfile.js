let gulp = require('gulp');
let pug = require('gulp-pug');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let cleanCss = require('gulp-clean-css');
let purgecss = require('gulp-purgecss');
let rcs = require('gulp-rcs');
let cachebust = require('gulp-cache-bust');
let rename = require('gulp-rename');
let headerFooter = require('gulp-headerfooter');
let htmlmin = require('gulp-htmlmin');
let replace = require('gulp-replace');
let terser = require('gulp-terser');
let browserSync = require('browser-sync');
let modRewrite = require('connect-modrewrite');
let htmltopug = require('gulp-html2pug');

let base_href = "https://kimyahavuz.itu.edu.tr/";
let async_server = "https://otm.kimya.itu.edu.tr";

//base_href = "http://localhost:3000/";
//async_server = "http://160.75.18.250/otmnew";

let gascript = '<script async src="https://www.googletagmanager.com/gtag/js?id=G-FTRXZNV7C4"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "G-FTRXZNV7C4");</script>';


gulp.task('sass', function () {
    return gulp.src('kimyahavuz.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browserlist: [">= 1%", "last 1 major version", "not dead", "Chrome >= 60", "Firefox >= 60", "Edge >= 16", "iOS >= 10", "Safari >= 10", "Android >= 6", "not Explorer <= 11"]
        }))
        .pipe(rename('kimyahavuz.css'))
        .pipe(gulp.dest('dev'));
});

gulp.task('pugTask', function () {
    return gulp.src('src/*.pug')
        .pipe(pug({pretty:true}))
        .pipe(replace('###base_href###', function () {
            return base_href;
        }))
        .pipe(gulp.dest('dev'));
});

gulp.task('buildJS', function () {
    return gulp.src('./src/js/*.js')
        .pipe(replace('###async_server###', function () {
            return async_server;
        }))
        .pipe(gulp.dest('./dev/'))
});

gulp.task('purgeCSS', function () {
    return gulp.src('dev/*.css')
        .pipe(purgecss({
            content: ['dev/*.html', 'dev/*.js']
        }))
        .pipe(gulp.dest('dist/pre_dist'));
});

gulp.task('rcs', function () {
    return gulp.src(['./dist/pre_dist/**/*.css', './dev/**/*.js', './dev/**/*.html'])
        .pipe(rcs())
        .pipe(gulp.dest('./dist/pre_dist'));
});

gulp.task('minifyHTML', function () {
    return gulp.src('dist/pre_dist/*.html')
        .pipe(replace('<!--###GASSCRIPT###-->', function (){
            return gascript;
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(cachebust())
        .pipe(gulp.dest('dist'));
});

gulp.task('minifyCSS', function () {
    return gulp.src(['dist/pre_dist/*.css'])
        .pipe(cleanCss())
        .pipe(gulp.dest('dist'));
});

gulp.task('minifyJS', function () {
    return gulp.src('./dist/pre_dist/*.js')
        //.pipe(sourcemaps.init())
        .pipe(terser({
            ecma:8,
            keep_fnames: false,
            mangle: {
                toplevel: true
            }
        }))
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});



gulp.task('html2pug', function () {
    return gulp.src('./src/**/*.html')
        .pipe(htmltopug())
        .pipe(gulp.dest('src/src_pug'));
});

let modrew = require("./src/modrew");
gulp.task('browserSync_DEV', function () {
    browserSync.init({
        server: {
            baseDir: ["./dev/", "./assets/"],
            watchEvents: ["add", "change", 'unlink'],
            middleware: [
                modRewrite(modrew)
            ]
        }
    });
});

gulp.task('browserSync_DIST', function () {
    browserSync.init({
        server: {
            baseDir: ["./dist/", "./assets/"],
            middleware: [
                modRewrite(modrew)
            ]
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('*.scss', gulp.series('sass'));
    gulp.watch("./src/**/*.pug", gulp.series('pugTask'));
    gulp.watch("./src/js/*.js", gulp.series('buildJS'));
    gulp.watch("./assets/*.*").on("change", browserSync.reload);
    gulp.watch("./dev/*.*").on("change", browserSync.reload);
});

gulp.task('build_dev', gulp.series('sass', 'pugTask', 'buildJS'));
gulp.task('dev_test', gulp.parallel('browserSync_DEV', 'watch'));

gulp.task('build_dist', gulp.series('purgeCSS', 'rcs', 'minifyHTML', 'minifyCSS', 'minifyJS'));
gulp.task('dist_test', gulp.parallel('browserSync_DIST'));
