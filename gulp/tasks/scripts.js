import webpack from 'webpack-stream';
import named from 'vinyl-named';

export const scripts = () => {
  return app.gulp.src(`${app.path.src.js}/app.js`)
    .pipe(named())
    .pipe(webpack({
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ["@babel/preset-env"]
              }
            }
          }
        ]
      },
      mode: app.isProd ? 'production' : 'development',
      devtool: app.isDev ? 'inline-source-map' : false,
      output: {
        filename: '[name].js'
      }
    }))
    .pipe(app.gulp.dest(app.path.build.js))
}