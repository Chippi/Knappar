var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create(),
    tasks = [];

var paths = {
    styles: {
        sass: {
            src: ["src/styles/**/*.scss"],
            output: {
                file: "default.css",
                path: "src/styles/"
            }
        }
    },
    scripts: {
        js: {
            src: ["src/scripts/**/*.js"],
            output: {
                file: "knappar.js",
                path: "dist"
            }
        }
    }
};

function createTask(name, type, options) {
    gulp.task(name, function() {
        return gulp.src(options[name].src)
            .pipe(plugins.plumber(function(error) {
                gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
                this.emit('end');
            }))
            .pipe(plugins.debug())
            .pipe(plugins.if(type == "styles", plugins.sass()))
            .pipe(plugins.if(type == "styles", plugins.autoprefixer({
                browsers: ['last 2 version']
            })))
            .pipe(gulp.dest(options[name].output.path))
            .pipe(plugins.if(type == "styles", browserSync.stream()));
    });

    gulp.task('watch:' + name, function() {
        gulp.watch(options[name].src, [name]);
    });

    tasks.push(name);
    tasks.push('watch:' + name);
}

function setupBrowserSync(htmlSrc, jsSrc, port) {
    gulp.task('browser-sync', function() {
        browserSync.init({
            // proxy: urlPath,
            port: port,
            server: {
                baseDir: "./",
                directory: true
            }
        });
    });

    tasks.push('browser-sync');

    gulp.watch(htmlSrc + "/**/*.html").on("change", browserSync.reload);
    gulp.watch(jsSrc + "/**/*.js").on("change", function() {
        browserSync.reload();
    });
}

for (var prop in paths) {
    for (var task in paths[prop]) {
        createTask(task, prop, paths[prop]);
    }
}

setupBrowserSync("src", "src", 1337);

gulp.task('default', function() {
    gulp.start(tasks);
});
