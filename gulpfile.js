import { path } from './gulp/config.js';
import gulp from "gulp";
import yargs from 'yargs';

const isDev = yargs.argv.dev;
const isProd = !isDev;

global.app = {
    path,
    gulp,
    isDev,
    isProd
}

import { clean } from './gulp/tasks/clean.js';
import { pug } from './gulp/tasks/pug.js';
import { styles } from './gulp/tasks/styles.js';
import { scripts } from './gulp/tasks/scripts.js';
import { img } from './gulp/tasks/img.js';
import { temp } from './gulp/tasks/temp.js';
import { svg } from './gulp/tasks/svg.js';
import { browsersync } from './gulp/tasks/browsersync.js';
import { watcher } from './gulp/tasks/watcher.js';
import { fonts } from './gulp/tasks/fonts.js';
import { copy } from './gulp/tasks/copy.js';

const dev = gulp.series(clean, gulp.parallel(pug, styles, scripts, img, temp, fonts, svg), copy, browsersync, watcher);
const build = gulp.series(clean, gulp.parallel(pug, styles, scripts, img, temp, fonts, svg), copy, );

gulp.task('dev', dev);
gulp.task('build', build);
gulp.task('default', dev);