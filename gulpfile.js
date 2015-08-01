var gulp = require('gulp');
var inject = require('gulp-inject');
var parse = require('./lib/parser.js');
var base64 = require('gulp-base64');
var rename = require('gulp-rename');
var del = require('del');
var runSequence = require('run-sequence');

var config = {
	appName: 'mplayer',
	outputFile: './mplayer.js',
	originalJsFile: './src/js/index.js',
	originalHtmlFile: './src/index.html',
	originalCssFiles: './src/css/*'
};

gulp.task('clean', function (done) {
	del([config.outputFile], done);
});

gulp.task('create-output-file', ['clean'], function (done) {
	gulp.src(config.originalJsFile)
		.pipe(rename(config.outputFile))
		.pipe(gulp.dest('./'))
		.on('end', done);
});

gulp.task('build-js', function () {
	var target = gulp.src(config.outputFile);

	var source = gulp.src(config.originalHtmlFile)
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

					if (!previous) {
						return current;
					}

					return previous + '\r+' + current;
				}, '');

			return 'return ' + htmlMarkup + ';';
		}
	}))
		.pipe(gulp.dest('./'));
});

gulp.task('build-css', function () {
	var target = gulp.src(config.outputFile);

	var sources = gulp.src(config.originalCssFiles)
		.pipe(base64({
			maxImageSize: 1000000 // bytes
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

gulp.task('build', function (done) {
	runSequence(
		'create-output-file',
		'build-js',
		'build-css',
		done
	);
});