import svgSprite from 'gulp-svg-sprite';

export const svg = () => {
	return app.gulp.src(`${app.path.src.svgIcons}/**/*.svg`)
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../assets/icons/icons.svg"
				}
			}
		}))
		.pipe(app.gulp.dest(app.path.buildFolder))
}