var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('default', function() {
    return gulp.src('dist/node_modules', {read: false})
        .pipe(clean());
});