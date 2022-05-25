import browserSync from 'browser-sync';

export const browsersync = done => {
  browserSync.init({
    server: {
      baseDir: app.path.buildFolder
    },
    notify: false
  });

  done();
};