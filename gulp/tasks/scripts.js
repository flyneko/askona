import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import merge from 'merge-stream';

export const scripts = () => {
  const vendors = app.gulp.src([
    'node_modules/swiper/swiper-bundle.min.js',
    'node_modules/choices.js/public/assets/scripts/choices.min.js',
    'node_modules/lightgallery/lightgallery.min.js',
    'node_modules/lightgallery/plugins/thumbnail/lg-thumbnail.min.js',
    'node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js',
    'node_modules/@fancyapps/ui/dist/fancybox.umd.js',
    'node_modules/nouislider/dist/nouislider.min.js',
    'node_modules/air-datepicker/air-datepicker.js',
  ])
  .pipe(concat('vendors.min.js'))
  .pipe(uglify())
  .pipe(app.gulp.dest(app.path.build.js))

  const scripts = app.gulp.src([
    `${app.path.src.js}/*.js`
  ])
  .pipe(concat('app.js'))
  .pipe(app.gulp.dest(app.path.build.js))

  return merge(vendors, scripts)
}