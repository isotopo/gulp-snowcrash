'use strict';

var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var through = require('through2');
var protagonist = require('protagonist');


module.exports = function (options) {
	options = options || {};

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
		}

		if (file.isStream()) {
			return this.emit('error', new PluginError('gulp-snowcrash',  'Streaming not supported'));
		}

		var self = this;

		protagonist.parse(file.contents.toString(), function (error, result) {
			try {

				var newfile = new gutil.File({
					base: file.base,
					cwd: file.cwd,
					path: gutil.replaceExtension(file.path, '.' + options.format),
					contents: new Buffer(JSON.stringify(result.ast, null, 2))
				});

				self.push(newfile);

				cb();

			} catch (e) {

				throw new PluginError('gulp-snowcrash', error);
				cb(error);

			}

		});
	});
};
