'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = copy;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mkdir = (0, _pify2.default)(_mkdirp2.default);
var writeFile = (0, _pify2.default)(_fs2.default.writeFile);
var readFile = (0, _pify2.default)(_fs2.default.readFile);
var stat = (0, _pify2.default)(_fs2.default.stat);
var cacheReader = {};
var cacheWriter = {};

function checkOutput(file) {
    if (cacheWriter[file]) {
        return cacheWriter[file].then(function () {
            return stat(file);
        });
    }

    return stat(file);
}

function write(file, contents) {
    cacheWriter[file] = mkdir(_path2.default.dirname(file)).then(function () {
        return writeFile(file, contents);
    });

    return cacheWriter[file];
}

function copy(input, output) {
    var transform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (contents) {
        return contents;
    };

    var isModified = void 0;
    var mtime = void 0;

    return stat(input).catch(function () {
        throw Error('Can\'t read the file in ' + input);
    }).then(function (stats) {
        var item = cacheReader[input];
        mtime = stats.mtime.getTime();

        if (item && item.mtime === mtime) {
            return item.contents.then(transform);
        }

        isModified = true;
        var fileReaded = readFile(input).then(function (contents) {
            return transform(contents, isModified);
        });

        cacheReader[input] = {
            mtime: mtime,
            contents: fileReaded
        };

        return fileReaded;
    }).then(function (contents) {
        if (typeof output === 'function') {
            output = output();
        }

        if (isModified) {
            return write(output, contents);
        }

        return checkOutput(output).then(function () {
            return;
        }, function () {
            return write(output, contents);
        });
    });
}
module.exports = exports['default'];