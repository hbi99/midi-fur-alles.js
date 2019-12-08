
const fs = require("fs")
const gulp = require("gulp")
const uglify = require("gulp-uglify-es").default;
const $ = require("gulp-load-plugins")()
const src = "./src/midi-fur-alles.js"
const dest = "./src/"

const minify = () => gulp.src(src)
					.pipe(uglify())
					.pipe($.rename({suffix: ".min"}))
					.pipe(gulp.dest(dest))
					.pipe($.size({title: "minified"}))

gulp.task("minify", minify)
