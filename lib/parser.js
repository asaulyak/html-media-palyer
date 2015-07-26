var through = require('through2');

function Parser(options) {
	return through.obj(function (chunk, enc, done) {
		var content = chunk.contents.toString('utf-8');

		var matches = content.match(buildRegexp(options.startTag, options.endTag));

		content = matches.reduce(function (previous, current) {
			return previous + stripHtmlComments(current);
		}, '').trim();

		chunk.contents = new Buffer(content, 'binary');

		this.push(chunk);

		done();
	});
}

function buildRegexp(starttag, endtag) {
	return new RegExp('(' + makeWhiteSpaceOptional(escapeForRegExp(starttag)) + ')(\\s*)(\\n|\\r|.)*?(' + makeWhiteSpaceOptional(escapeForRegExp(endtag)) + ')', 'gi');
}

function makeWhiteSpaceOptional(str) {
	return str.replace(/\s+/g, '\\s*');
}

function escapeForRegExp(str) {
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function stripHtmlComments(html) {
	return html.replace(/<!--[\s\S]*?-->/g, '');
}

module.exports = Parser;