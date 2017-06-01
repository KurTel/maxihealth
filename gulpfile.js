var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
//var uglify = require('uglify-js');
var pump = require('pump');
//var UglifyJS = require("uglify-es");
var cleanCSS = require('gulp-clean-css');
var imageMin = require('gulp-imagemin');
var del = require('del');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');
var uncss = require('gulp-uncss');
var gulpConcat = require('gulp-concat');
var concatcss = require('gulp-concat-css');

gulp.task('default', function(callback){
    runSequence(
        `build`, 
        'watch', 
        callback
    );
});

gulp.task('build', function (callback){
    runSequence(
        `clean:dist`, 
        [`sass`, `useref`, `fonts-copy`], 
        callback
    );
    console.log('Building files');
})


gulp.task('clean', function(callback){
    del('dist');
    return cache.clearAll(callback);
});

gulp.task('clean:dist', function(callback){
    return del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback)
});

gulp.task('useref', ['minify-css','minify-img'], function(cb){

    pump([
        gulp.src('app/*.html'),
        useref(),
        gulp.dest('dist')
    ],
    cb
    );
});

gulp.task('unminconcss', function(cb){
    runSequence(
        `uncss`, 
        'minify-css',
        'concatcss',
        cb
    );
    console.log('All css are cleared, compressed and concatenated to main.css');
});

gulp.task('concatcss', function(cb){
    pump([
        gulp.src('app/css/mincss/*.css'),
        concatcss('lol.css'),
        gulp.dest('dist/css/')
    ],
    cb
    );
});

gulp.task('uncss', function(cb){
    pump([
        gulp.src('app/css/*.css'),
        uncss({ 
            html: ['app/index.html'
            ]}, {report:true}
        ),
        gulp.dest('app/css/uncss/')
    ],
    cb
    );
});

gulp.task('minify-css',  function(cb) {
    console.log("start minfy-css");
    cache.clearAll();
    pump([
        gulp.src('app/css/uncss/*.css'),
        cleanCSS({debug: true}, 
                 function(details) {
                    console.log(details.name + ' before: ' + details.stats.originalSize);
                    console.log(details.name + ' after: ' + details.stats.minifiedSize);}
                ),
        gulp.dest('app/css/mincss/')
    ],
    cb
    );
});



gulp.task('minify-img:clean', function(cb){
    cache.clearAll();
    pump([
        gulp.src('app/images/**/*.+(png|jpg|gif|svg)'),
        cache(imageMin([imageMin.gifsicle(), 
                        imageMin.jpegtran(), 
                        imageMin.optipng({optimizationLevel:7}), 
                        imageMin.svgo()
                       ],
                       {verbose: true,
                       })),
        gulp.dest('dist/images')
    ],
    cb
    );
});


gulp.task('minify-img', function(cb){
    pump([
        gulp.src('app/images/**/*.+(png|jpg|gif|svg)'),
        cache(imageMin({
            verbose: true,
            progressive: true,
            optimizationLevel: 7
        })),
        gulp.dest('dist/images')
    ],
    cb
    );
});

gulp.task('fonts-copy', function(cb){
    pump([
        gulp.src('app/fonts'),
        gulp.dest('dist/fonts')
    ],
    cb
    );
});

gulp.task('sass', function(cb){
   pump([
       gulp.src('app/css/scss/**/*.scss'),
       sass(),
       gulp.dest('app/css/'),
       browserSync.reload({
                stream: true
                }
       )
   ],
    cb
    ); 
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch('app/css/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
});