var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
//var uglify = require('uglify-js');
var pump = require('pump');
//var UglifyJS = require("uglify-es");
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var del = require('del');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');
var uncss = require('gulp-uncss');
var gulpConcat = require('gulp-concat');
var concatcss = require('gulp-concat-css');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');
var prefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');
var rimraf = require('rimraf');
var reload = browserSync.reload;
var pngquant = require('imagemin-pngquant');
var watch = require('gulp-watch');
var gulpSequence = require('gulp-sequence');

var path = {
    deploy: { //Тут мы укажем куда складывать готовые после сборки файлы
        directory: './deploy',
        html: 'deploy/',
        js: 'deploy/js/',
        css: 'deploy/css/',
        img: 'deploy/img/',
        fonts: 'deploy/fonts/'
    },
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        directory: './build',
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        scss: 'src/css/main.scss',
        css: 'src/css/main.css',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/inuse/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    }
};

var config = {
    build: {
        server: {
            baseDir: "./build"
            },
        tunnel: true,
        host: 'localhost',
        port: 9000,
        logPrefix: "Frontend_Devil"
    },
    deploy: {
        server: {
            baseDir: "./deploy"
            },
        tunnel: true,
        host: 'localhost',
        port: 9001,
        logPrefix: "Frontend_Devil"
    }
};


/* ---------- DEFAULT ---------- */

gulp.task('default', gulpSequence('clean:build', 'build', 'webserver:build', 'watch:build'));

gulp.task('html:deploy', function (cb) {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.deploy.html)) //Выплюнем их в папку build
        //добавить компрессор html
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
    cb();
});

gulp.task('html:build', function (cb) {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
    cb();
});

/* ---------- JS ---------- */

gulp.task('js:deploy', function (cb) {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
//выключен потомучто ES6 не поддержывается, надо разбираться, либо другая библиотека либо трансполер использовать        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.deploy.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
    cb();
});

gulp.task('js:build', function (cb) {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
    cb();
});

/* ---------- CSS ---------- */

gulp.task('css:deploy', function (cb) {
    gulp.src(path.src.scss) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cleanCSS({debug: true}, 
                 function(details) {
                    console.log(details.name + ' before: ' + details.stats.originalSize);
                    console.log(details.name + ' after: ' + details.stats.minifiedSize);}
                )) //Сожмем
        .pipe(uncss({ 
            html: [ path.src.html
            ]}, {report:true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.deploy.css)) //И в build
        .pipe(reload({stream: true}));
    cb();
});

gulp.task('css:build', function (cb) {
    
    pump([
        gulp.src([path.src.scss]),
        sass().on('error', sass.logError),
        prefixer(),
        cleanCSS({debug: true},
                 function(details) {
                    console.log(details.name + ' before: ' + details.stats.originalSize);
                    console.log(details.name + ' after: ' + details.stats.minifiedSize);}
                ),
        reload({stream: true}),
        gulp.dest(path.build.css),
        reload({stream: true})
    ],
        cb
    );
    
//    gulp.src(path.src.css) //Выберем наш main.scss
//        .pipe(rigger())
//        .pipe(sass()) //Скомпилируем
//        .pipe(prefixer()) //Добавим вендорные префиксы
//        .pipe(cleanCSS({debug: true},
//                 function(details) {
//                    console.log(details.name + ' before: ' + details.stats.originalSize);
//                    console.log(details.name + ' after: ' + details.stats.minifiedSize);}
//                )) //Сожмем
//        .pipe(gulp.dest(path.build.css)) //И в build
//        .pipe(reload({stream: true}));
//    cb();
});

/* ---------- IMAGE ---------- */

gulp.task('image:deploy', function (cb) {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true,
            verbose: true
            //TODO ииспользовать tinypng!!! он отлично сжимает!!!
        }))
        .pipe(gulp.dest(path.deploy.img)) //И бросим в build
        .pipe(reload({stream: true}));
    cb();
});

gulp.task('image:build', function (cb) {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
    cb();
});

/* ---------- FONTS ---------- */

gulp.task('fonts:deploy', function(cb) {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.deploy.fonts));
    cb();
});

gulp.task('fonts:build', function(cb) {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
    cb();
});

/* ---------- BUILD AND CLEAN ---------- */

gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'fonts:build',
    'image:build'
]);

gulp.task('deploy', [
    'html:deploy',
    'js:deploy',
    'css:deploy',
    'fonts:deploy',
    'image:deploy'
]);

gulp.task('clean:deploy', function (cb) {
    rimraf(path.deploy.directory, cb);
});

gulp.task('clean:build', function (cb) {
    rimraf(path.build.directory, cb);
});

/* ---------- WEBSERVER ---------- */

gulp.task('webserver:build', function (cb) {
    browserSync(config.build);
    cb();
});

gulp.task('webserver:deploy', function (cb) {
    browserSync(config.deploy);
    cb();
});

/* ---------- WATCH ---------- */

gulp.task('watch:build', function(cb){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});