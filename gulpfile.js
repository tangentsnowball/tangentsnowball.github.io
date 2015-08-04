var basePaths = {
        src: 'static/',
        dest: '_site/static/dist/'
    },
    paths = {
        images: {
            src: basePaths.src + 'img/',
            dest: basePaths.dest + 'img/'
        },
        scripts: {
            src: basePaths.src + 'js/',
            dest: basePaths.dest + 'js/'
        },
        styles: {
            src: basePaths.src + 'css/less/',
            dest: basePaths.dest + 'css/'
        },
        templates: {
            src: basePaths.src + '',
            dest: basePaths.dest + ''
        }
    };

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
        pattern: '*',
        camelize: true
    });

var cp = require('child_process');
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    plugins.browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    plugins.browserSync.reload();
});

/**
 * Deploy changes to Github/server
 */

gulp.task('deploy', ['jekyll-build'], function () {
    return gulp.src(['./**/*', '!./node_modules/**/*'], {dot:true})
        .pipe(plugins.ghPages({
            branch: 'master'
        }));
});

/* CSS - LESS */
function processCss(inputStream, taskType) {
    return inputStream
        .pipe(plugins.plumber())
        .pipe(plugins.less({ paths: [plugins.path.join(__dirname, 'less', 'includes')] }))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(gulp.dest('static/dist/css/'))
        .pipe(plugins.browserSync.reload({stream:true}))
        .pipe(plugins.notify({ message: taskType + ' task complete' }));
}

gulp.task('styles', ['less:main', 'less:responsive']);
gulp.task('less:main', function() {
    return processCss(gulp.src(paths.styles.src + 'styles.less'), 'Styles');
});
gulp.task('less:responsive', function() {
    return processCss(gulp.src(paths.styles.src + 'styles-responsive.less'), 'Responsive styles');
});

/* JS */
gulp.task('scripts', function() {
  return gulp.src(paths.scripts.src + '*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(gulp.dest('static/dist/js/'))
    .pipe(plugins.browserSync.reload({stream:true}))
    .pipe(plugins.notify({ message: 'Scripts task complete' }));
});

/* Images */
gulp.task('images', function() {
  return gulp.src(paths.images.src + '**/*')
    .pipe(plugins.plumber())
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(gulp.dest('static/dist/img/'))
    .pipe(plugins.browserSync.reload({stream:true}))
    .pipe(plugins.notify({ message: 'Images task complete' }));
});

/* BrowserSync */
gulp.task('browser-sync', ['styles', 'jekyll-build'], function() {
    plugins.browserSync({
        server: {
            baseDir: '_site'
        }
        //Use if you don't want BS to open a tab in your browser when it starts up
        //open: false
        // Will not attempt to determine your network status, assumes you're OFFLINE
        //online: false
    });
});

gulp.task('watch', function() {
    gulp.watch(paths.styles.src + '*.less', ['styles']);
    gulp.watch(paths.scripts.src + '*.js', ['scripts']);
    gulp.watch(paths.images.src + '**/*', ['images']);
    gulp.watch(['index.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/* Clean up stray files */
// gulp.task('clean', function(cb) {
//     plugins.del([paths.styles.dest, paths.scripts.dest, paths.images.dest], cb)
// });


/* Default task */
gulp.task('default', function() {
    gulp.start('browser-sync', 'watch');
});
