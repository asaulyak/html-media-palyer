var gulp = require('gulp');
var inject = require('gulp-inject');
var parse = require('./lib/parser.js');
var base64 = require('gulp-base64');
var rename = require('gulp-rename');

var config = {
	appName: 'mplayer',
	appPath: './mplayer.js'
};

gulp.task('build', function () {
	var target = gulp.src('./src/js/index.js');

	var source = gulp.src('./src/index.html')
		.pipe(parse({
			startTag: '<!-- build:markup -->',
			endTag: '<!-- endbuild -->'
		}));

	return target.pipe(inject(source, {
		starttag: '<!-- build:markup -->',
		endtag: '<!-- endbuild -->',
		transform: function (filepath, file) {
			var htmlMarkup = file.contents.toString('utf-8').split('\r\n')
				.reduce(function (previous, current) {
					current = '\'' + current + '\'';

					if(!previous) {
						return current;
					}

					return previous + '\r+' + current;
				}, '');

			return 'return ' + htmlMarkup + ';';
		}
	}))
		.pipe(rename(function (path) {
			path.basename = config.appName;
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('build-inline-css', ['build'], function () {
	var target = gulp.src(config.appPath);
	var sources = gulp.src('./src/css/*')
		.pipe(base64({
			maxImageSize: 1000000 // bytes,
		}));

	target.pipe(inject(sources, {
		starttag: '<!-- build:css -->',
		endtag: '<!-- endbuild -->',
		transform: function (filepath, file) {
			var cssContent = file.contents.toString('utf-8').split('\r\n').join('\\\r');

			return 'css = \'' + cssContent + '\';';
		}
	}))
		.pipe(gulp.dest('./'));
});