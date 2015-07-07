var gulp = require('gulp');

var addStream = require('add-stream');
var angularTemplatecache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var header = require('gulp-header');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var bower = require('./bower.json');
var banner = ['/**',
    ' * <%= bower.name %> - <%= bower.description %>',
    ' * @version v<%= bower.version %>',
    ' * @link <%= bower.homepage %>',
    ' * @license <%= bower.license %>',
    ' */',
    ''].join('\n');

gulp.task('build-app-dev', function() {
    return gulp.src('./src/schema-form-repeat.js')
        .pipe(sourcemaps.init())

        .pipe(sourcemaps.write())
        .pipe(header(banner, { bower : bower } ))
        .pipe(rename('schema-form-repeat.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-app-prod', function() {
    return gulp.src('./src/schema-form-repeat.js')
        .pipe(uglify())

        .pipe(header(banner, { bower : bower } ))
        .pipe(rename('schema-form-repeat.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build-app-dev', 'build-app-prod']);

// connect local server
gulp.task('connect', function() {
    connect.server({
        port: 8080,
        fallback: 'index.html'
    });
});
