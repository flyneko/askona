import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';

export const temp = () => {
  return app.gulp.src(`${app.path.src.temp}/**/*.{jpg,jpeg,png,svg,gif}`)
    .pipe(gulpif(app.isProd, imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 95, progressive: true }),
      imagemin.optipng({ optimizationLevel: 7 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ])))
    .pipe(app.gulp.dest(app.path.build.temp));
}