let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let cleanCss = require('gulp-clean-css');
let rename = require('gulp-rename');
let headerFooter = require('gulp-headerfooter');
let htmlMin = require('gulp-htmlmin');
let replace = require('gulp-replace');
let browserSync = require('browser-sync');
let modRewrite = require('connect-modrewrite');

//let base_href = "https://kimyahavuz.itu.edu.tr/";
let base_href = "http://localhost:3000/";

//let async_server = "https://otm.kimya.itu.edu.tr";
let async_server = "http://160.75.18.250/otmnew";


gulp.task('sass', function () {
    return gulp.src('kimyahavuz.scss')
        .pipe(sass())
        .pipe(autoprefixer({browserlist: [">= 1%", "last 1 major version", "not dead", "Chrome >= 60", "Firefox >= 60", "Edge >= 16", "iOS >= 10", "Safari >= 10", "Android >= 6", "not Explorer <= 11"]}))
        .pipe(rename('kimyahavuz.css'))
        .pipe(gulp.dest('dev'));
});

gulp.task('buildHTML', function () {
    return gulp.src('./src/*.html')
        .pipe(headerFooter.header('./src/header_footer/header.html'))
        .pipe(headerFooter.footer('./src/header_footer/footer.html'))
        .pipe(replace('###base_href###', function () {
            return base_href;
        }))
        .pipe(replace('###async_server###', function () {
            return async_server;
        }))
        .pipe(gulp.dest('./dev/'))
});

gulp.task('buildJS', function () {
    return gulp.src('./src/js/*.js')
        .pipe(replace('###async_server###', function () {
            return async_server;
        }))
        .pipe(gulp.dest('./dev/'))
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

gulp.task('watch', function () {
    gulp.watch('*.scss', gulp.series('sass'));
    gulp.watch("src/**/*.html", gulp.series('buildHTML'));
    gulp.watch("src/js/*.js", gulp.series('buildJS'));
    gulp.watch("assets/*.*").on("change", browserSync.reload);
    gulp.watch("dev/*.*").on("change", browserSync.reload);
});

gulp.task('bulid_dev', gulp.series('buildHTML', 'buildJS'));

gulp.task('dev_test', gulp.parallel('browserSync_DEV', 'watch'));
