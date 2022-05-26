import spritesmith from 'gulp.spritesmith';
import merge from 'merge-stream';

export const pngSprite = () => {
  const spriteData = app.gulp.src(app.path.src.pngIcons + '/*.png')
    .pipe(spritesmith({
      retinaSrcFilter: `${app.path.src.pngIcons}/*@2x.png`,
      retinaImgName: 'spritesheet@2x.png',
      imgName: 'spritesheet.png',
      cssName: '_sprite-png.sass',
      cssTemplate: 'gulp/tasks/png-sprite/sass.template.mustache'
    }))

    // Deliver spritesheets to `dist/` folder as they are completed
    const imgStream = spriteData.img.pipe(app.gulp.dest(app.path.build.img + '/'));
    // Deliver CSS to `./` to be imported by `index.scss`
    const cssStream = spriteData.css.pipe(app.gulp.dest(app.path.src.sassGen + '/'));

    return merge(imgStream, cssStream);
}