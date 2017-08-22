var gulp = require("gulp");
var less = require("gulp-less");
var browserSync = require("browser-sync").create();
var header = require("gulp-header");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var pkg = require("./package.json");
var concat = require('gulp-concat');

// Set the banner content
var banner = "";

// Compile LESS files from /less into /css
gulp.task("less", function () {
    return gulp.src("less/sb-admin-2.less")
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Minify compiled CSS
gulp.task("minify-css", ["less"], function () {

    var files = [
        "dist/css/sb-admin-2.css"
    ];

    return gulp.src(files)
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Copy JS to dist
gulp.task("js",
    function () {

        var files = [
            "js/sb-admin-2.js"
        ];

        return gulp.src(files)
            .pipe(header(banner, { pkg: pkg }))
            .pipe(gulp.dest("dist/js"))
            .pipe(browserSync.reload({
                stream: true
            }));
    });

gulp.task("js-mvc",
    function () {

        var files = [
            "JavaScript-Mvc-framework/Prototype/Array.js",
            "JavaScript-Mvc-framework/app.js",

            "JavaScript-Mvc-framework/app/*.js",
            "JavaScript-Mvc-framework/app/service.js",

            "JavaScript-Mvc-framework/service/*.js",
            "JavaScript-Mvc-framework/extensions/*.js",
            "JavaScript-Mvc-framework/controllers/*.js",
            "JavaScript-Mvc-framework/component/*.js",
            "JavaScript-Mvc-framework/events/*.js",
            "JavaScript-Mvc-framework/schema/*.js",

            "JavaScript-Mvc-framework/jQueryCaching.js",
            "JavaScript-Mvc-framework/libs/jquery.blockUI.js", // required
            "JavaScript-Mvc-framework/libs/toastr.js", // required
            "JavaScript-Mvc-framework/libs/FrontEnd/wow.js",
            "JavaScript-Mvc-framework/app.run.js"


        ];

        return gulp.src(files)
            //.pipe(uglify())
            .pipe(concat("js-mvc.js"))
            .pipe(rename({ suffix: ".min" }))
            .pipe(gulp.dest("dist/js"))
            .pipe(browserSync.reload({
                stream: true
            }));
    });

// Minify JS
gulp.task("minify-js", ["js"], function () {
    var files = [
        "js/*.js",
    ];

    return gulp.src(files)
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Copy vendor libraries from /bower_components into /vendor
gulp.task("copy",
    function () {
        gulp.src(["bower_components/bootstrap/dist/**/*", "!**/npm.js", "!**/bootstrap-theme.*", "!**/*.map"])
            .pipe(gulp.dest("vendor/bootstrap"));

        gulp.src([
            "bower_components/bootstrap-social/*.css", "bower_components/bootstrap-social/*.less",
            "bower_components/bootstrap-social/*.scss"
        ])
            .pipe(gulp.dest("vendor/bootstrap-social"));

        gulp.src(["bower_components/datatables/media/**/*"])
            .pipe(gulp.dest("vendor/datatables"));

        gulp.src(["bower_components/datatables-plugins/integration/bootstrap/3/*"])
            .pipe(gulp.dest("vendor/datatables-plugins"));

        gulp.src(["bower_components/datatables-responsive/css/*", "bower_components/datatables-responsive/js/*"])
            .pipe(gulp.dest("vendor/datatables-responsive"));

        gulp.src(["bower_components/flot/*.js"])
            .pipe(gulp.dest("vendor/flot"));

        gulp.src(["bower_components/flot.tooltip/js/*.js"])
            .pipe(gulp.dest("vendor/flot-tooltip"));

        gulp.src([
            "bower_components/font-awesome/**/*", "!bower_components/font-awesome/*.json",
            "!bower_components/font-awesome/.*"
        ])
            .pipe(gulp.dest("vendor/font-awesome"));

        gulp.src(["bower_components/jquery/dist/jquery.js", "bower_components/jquery/dist/jquery.min.js"])
            .pipe(gulp.dest("vendor/jquery"));

        gulp.src(["bower_components/metisMenu/dist/*"])
            .pipe(gulp.dest("vendor/metisMenu"));

        gulp.src([
            "bower_components/morrisjs/*.js", "bower_components/morrisjs/*.css",
            "!bower_components/morrisjs/Gruntfile.js"
        ])
            .pipe(gulp.dest("vendor/morrisjs"));

        gulp.src(["bower_components/raphael/raphael.js", "bower_components/raphael/raphael.min.js"])
            .pipe(gulp.dest("vendor/raphael"));

    });

// Run everything
gulp.task("default", ["minify-css", "minify-js", "copy", "js-mvc"]);

// Configure the browserSync task
gulp.task("browserSync",
    function () {
        browserSync.init({
            server: {
                baseDir: ""
            }
        });

    });

// Dev task with browserSync
gulp.task("dev", ["browserSync", "less", "minify-css", "js", "minify-js", "js-mvc"], function () {
    gulp.watch("less/*.less", ["less"]);
    gulp.watch("dist/css/*.css", ["minify-css"]);
    gulp.watch("js/*.js", ["minify-js"]);
    gulp.watch("JavaScript-Mvc-framework/*.js", ["js-mvc"]);
    gulp.watch("JavaScript-Mvc-framework/**/*.js", ["js-mvc"]);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch("views/*.html", browserSync.reload);
    gulp.watch("dist/js/*.js", browserSync.reload);
});
