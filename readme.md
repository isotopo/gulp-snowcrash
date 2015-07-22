# [gulp](http://gulpjs.com)-snowcrash

> Gulp snowcrash to create documentation with API Blueprint

## Usage

```js
gulp.task('docs', function () {
	return gulp.src(['./blueprint/**/*.md'])
		.pipe(snowcrash({ format: 'json' }))
		.pipe(gulp.dest('./_blueprint'));
});
```
