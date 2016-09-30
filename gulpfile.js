var gulp = require('gulp');
var clean = require('gulp-clean');
var replace = require('gulp-replace');

gulp.task('replace', function() {
    return gulp.src('lib/**')
        .pipe(replace(/\.\/\.\.\/typings\/index.d.ts/g, './typings/index.d.ts'))
        .pipe(replace(/\.\.\/typings\/index.d.ts/g, './typings/index.d.ts'))
        .pipe(gulp.dest('lib/'));
});


gulp.task('clean', function() {
    return gulp.src('lib/')
        .pipe(clean());
});

gulp.task('copy_src_to_lib', function() {
    return gulp.src('lib/src/**')
        .pipe(gulp.dest('lib/'));
});

gulp.task('remove_src_folder', function() {
    return gulp.src('lib/src', {read: false})
        .pipe(clean());
});

gulp.task('remove_node_modules_folder', function() {
    return gulp.src('lib/node_modules', {read: false})
        .pipe(clean());
});

gulp.task('copy_config_folder', function() {
    return gulp.src('config/**')
        .pipe(gulp.dest('lib/config/'));
});

gulp.task('copy_package_json', function() {
    return gulp.src('package.json')
        .pipe(gulp.dest('lib/'));
});
var babel = require('gulp-babel');
var path = require('path');

var absolutePath = path.join(__dirname, '../../');

gulp.task('babel', function(){
    return gulp.src('lib/**/**.js')
        .pipe(babel({
            presets: ['es2015'],
            plugins: ["transform-async-to-generator"]
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('copy_to_lingua', function() {
    return gulp.src('./lib/**/**')
        .pipe(gulp.dest("./../lingua/node_modules/@fabalous/runtime-web/"));
});