let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let cleanCss = require('gulp-clean-css');
let rename = require('gulp-rename');
let headerFooter = require('gulp-headerfooter');
let htmlMin = require('gulp-htmlmin');
let browserSync = require('browser-sync');


gulp.task('sass', function () {
    return gulp.src('kimyahavuz.scss')
        .pipe(sass())
        .pipe(autoprefixer({browserlist: [">= 1%", "last 1 major version", "not dead", "Chrome >= 60", "Firefox >= 60", "Edge >= 16", "iOS >= 10", "Safari >= 10", "Android >= 6", "not Explorer <= 11"]}))
        .pipe(rename('kimyahavuz.css'))
        .pipe(gulp.dest('assets'));
});

gulp.task('buildHtml', function () {
    return gulp.src('./src/*.html')
        .pipe(headerFooter.header('./src/header_footer/header.html'))
        .pipe(headerFooter.footer('./src/header_footer/footer.html'))
        .pipe(gulp.dest('./dev/'))
});

gulp.task('browserSync_DEV', function () {
    browserSync.init({
        server: {
            baseDir: ["./dev/", "./assets/"],
            watchEvents: ["add", "change", 'unlink']
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('*.scss', gulp.series('sass'));
    gulp.watch("src/**/*.html", gulp.series('buildHtml'));
    gulp.watch("assets/*.*").on("change", browserSync.reload);
    gulp.watch("dev/*.*").on("change", browserSync.reload);
});

gulp.task('dev_test', gulp.parallel('browserSync_DEV', 'watch'));
