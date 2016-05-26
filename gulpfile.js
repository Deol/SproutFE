var gulp = require('gulp');
var connect = require('gulp-connect');
var del = require('del');
var less = require('gulp-less');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var lessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new lessAutoprefix({browsers: ['last 2 versions'], cascade: false});

// 删除 css
gulp.task('clean:css', function () {
    del.sync('./src/assets/css/*.css');
})

// 启动本地服务
gulp.task('connect', function () {
    connect.server({
        root: ['src/', './'],
        port: 8080,
        livereload: true
    });
});

gulp.task('connect:build', function () {
    connect.server({
        root: './dist/',
        port: 8081,
        livereload: true
    });
})

// 编译 less
gulp.task('less', function () {
    return gulp.src('./src/assets/less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/assets/css/'))
	    .pipe(connect.reload());
});

// 处理 js
gulp.task('script', function () {
    return gulp.src('./src/assets/js/*.js')
        .pipe(connect.reload());
});

gulp.task('html', function () {
    return gulp.src(['./src/*.html', './src/views/**/*.html'])
        .pipe(connect.reload());
})

// 监控文件
gulp.task('watch', function () {
    gulp.watch('./src/assets/less/*.less', ['less']);
    gulp.watch(['./src/*.html', './src/views/**/*.html'], ['html']);
    gulp.watch(['./src/assets/js/**/*.js'], ['script']);
});

gulp.task('clean:build', function () {
    del.sync('dist/', {force: true});
});

gulp.task('copy', function () {
    gulp.src('./src/assets/images/**')
        .pipe(gulp.dest('./dist/assets/images/'));
});

gulp.task('minify', ['clean:build', 'less'], function () {
    gulp.src('./src/views/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/views'));

    gulp.src('index.html')
        .pipe(usemin({
            libjs: [],
            js: [uglify({mangle: false}), rev()],
            css: [minifyCss(), 'concat', rev()]
        }))
        .pipe(gulp.dest('dist/'));
});

// 本地开发
gulp.task('server', ['less', 'connect', 'watch']);

// build 上线代码
gulp.task('build', ['clean:build', 'copy', 'minify']);

gulp.task('default', ['server']);