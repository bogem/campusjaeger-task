var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");
var gulp = require("gulp");

gulp.task("css:main", function() {
  return gulp
    .src([
      "./node_modules/bootstrap/dist/css/bootstrap.min.css",
      "./node_modules/react-select/dist/react-select.css",
      "./src/main.css",
    ])
    .pipe(concat("main.css"))
    .pipe(
      autoprefixer({
        browsers: ["ie >= 10", "> 10%"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("./dist"));
});

gulp.task("default", ["css:main"]);
