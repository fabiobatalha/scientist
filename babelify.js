var Babelify = require('babelify');

function _shouldIgnore(opts) {
  var _util = require('babel-core/lib/util');
  return _util.shouldIgnore(opts.filename, opts.ignore, opts.only);
};

var _flush = Babelify.prototype._flush;

Babelify.prototype._flush = function (callback) {
  if (this._opts.ignore) {
    var _util = require('babel-core/lib/util');
    if (_shouldIgnore({
      filename: this._opts.filename,
      ignore: _util.arrayify(this._opts.ignore, util.regexify),
    }) {
      this.push(this._data);
      callback();
      return;
    }
  }
  return _flush.apply(this, arguments);
};

module.exports = Babelify;
