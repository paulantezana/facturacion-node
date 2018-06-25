const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
 
gulp.task('scss', () =>
    gulp.src('assets/src/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets'))
);

gulp.task('default',()=>{
    gulp.watch('./assets/src/**/*.scss',['scss'])
});