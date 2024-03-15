'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _micromatch = require('micromatch');

var _micromatch2 = _interopRequireDefault(_micromatch);

var _copy = require('./lib/copy');

var _copy2 = _interopRequireDefault(_copy);

var _toolsPath = require('./lib/tools-path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tags = ['path', 'name', 'hash', 'ext', 'query', 'qparams', 'qhash'];

/**
 * Helper function to ignore files
 *
 * @param  {string} filename
 * @param  {string} extra
 * @param  {Object} opts plugin options
 * @return {boolean}
 */
function ignore(fileMeta, opts) {
    if (typeof opts.ignore === 'function') {
        return opts.ignore(fileMeta, opts);
    }

    if (typeof opts.ignore === 'string' || Array.isArray(opts.ignore)) {
        return _micromatch2.default.any(fileMeta.sourceValue, opts.ignore);
    }

    return false;
}

/**
 * Helper function that reads the file ang get some helpful information
 * to the copy process.
 *
 * @param  {string} dirname path of the read file css
 * @param  {string} sourceInputFile path to the source input file css
 * @param  {string} value url
 * @param  {Object} opts plugin options
 * @return {Promise} resolve => fileMeta | reject => error message
 */
function getFileMeta(dirname, sourceInputFile, value, opts) {
    var parsedUrl = _url2.default.parse(value, true);
    var filename = decodeURI(parsedUrl.pathname);
    var pathname = _path2.default.resolve(dirname, filename);
    var params = parsedUrl.search || '';
    var hash = parsedUrl.hash || '';

    // path between the basePath and the filename
    var basePath = (0, _toolsPath.findBasePath)(opts.basePath, pathname);
    if (!basePath) {
        throw Error('"basePath" not found in ' + pathname);
    }

    var ext = _path2.default.extname(pathname);
    var fileMeta = {
        sourceInputFile: sourceInputFile,
        sourceValue: value,
        filename: filename,
        // the absolute path without the #hash param and ?query
        absolutePath: pathname,
        fullName: _path2.default.basename(pathname),
        path: _path2.default.relative(basePath, _path2.default.dirname(pathname)),
        // name without extension
        name: _path2.default.basename(pathname, ext),
        // extension without the '.'
        ext: ext.slice(1),
        query: params + hash,
        qparams: params.length > 0 ? params.slice(1) : '',
        qhash: hash.length > 0 ? hash.slice(1) : '',
        basePath: basePath
    };

    return fileMeta;
}

/**
 * process to copy an asset based on the css file, destination
 * and the url value
 *
 * @param {Object} result
 * @param {Object} decl postcss declaration
 * @param {Object} node postcss-value-parser
 * @param {Object} opts plugin options
 * @return {Promise}
 */
function processUrl(result, decl, node, opts) {
    // ignore from the css file by `!`
    if (node.value.indexOf('!') === 0) {
        node.value = node.value.slice(1);
        return Promise.resolve();
    }

    if (node.value.indexOf('/') === 0 || node.value.indexOf('data:') === 0 || node.value.indexOf('#') === 0 || /^[a-z]+:\/\//.test(node.value)) {
        return Promise.resolve();
    }

    /**
     * dirname of the read file css
     * @type {String}
     */
    var dirname = _path2.default.dirname(decl.source.input.file);

    var fileMeta = getFileMeta(dirname, decl.source.input.file, node.value, opts);

    // ignore from the fileMeta config
    if (ignore(fileMeta, opts)) {
        return Promise.resolve();
    }

    return (0, _copy2.default)(fileMeta.absolutePath, function () {
        return fileMeta.resultAbsolutePath;
    }, function (contents, isModified) {
        fileMeta.contents = contents;

        return Promise.resolve(isModified ? opts.transform(fileMeta) : fileMeta).then(function (fileMetaTransformed) {
            fileMetaTransformed.hash = opts.hashFunction(fileMetaTransformed.contents);
            var tpl = opts.template;
            if (typeof tpl === 'function') {
                tpl = tpl(fileMetaTransformed);
            } else {
                tags.forEach(function (tag) {
                    tpl = tpl.replace('[' + tag + ']', fileMetaTransformed[tag] || opts[tag] || '');
                });
            }

            var resultUrl = _url2.default.parse(tpl);
            fileMetaTransformed.resultAbsolutePath = decodeURI(_path2.default.resolve(opts.dest, resultUrl.pathname));
            fileMetaTransformed.extra = (resultUrl.search || '') + (resultUrl.hash || '');

            return fileMetaTransformed;
        }).then(function (fileMetaTransformed) {
            return fileMetaTransformed.contents;
        });
    }).then(function () {
        var destPath = (0, _toolsPath.defineCSSDestPath)(dirname, fileMeta.basePath, result, opts);

        node.value = _path2.default.relative(destPath, fileMeta.resultAbsolutePath).split('\\').join('/') + fileMeta.extra;
    });
}

/**
 * Processes each declaration using postcss-value-parser
 *
 * @param {Object} result
 * @param {Object} decl postcss declaration
 * @param {Object} opts plugin options
 * @return {Promise}
 */
function processDecl(result, decl, opts) {
    var promises = [];

    decl.value = (0, _postcssValueParser2.default)(decl.value).walk(function (node) {
        if (node.type !== 'function' || node.value !== 'url' || node.nodes.length === 0) {
            return;
        }

        var promise = Promise.resolve().then(function () {
            return processUrl(result, decl, node.nodes[0], opts);
        }).catch(function (err) {
            decl.warn(result, err.message);
        });

        promises.push(promise);
    });

    return Promise.all(promises).then(function () {
        return decl;
    });
}

/**
 * Initialize the postcss-copy plugin
 * @param  {Object} plugin options
 * @return {plugin}
 */
function init() {
    var userOpts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var opts = _extends({
        template: '[hash].[ext][query]',
        preservePath: false,
        hashFunction: function hashFunction(contents) {
            return _crypto2.default.createHash('sha1').update(contents).digest('hex').substr(0, 16);
        },
        transform: function transform(fileMeta) {
            return fileMeta;
        },

        ignore: []
    }, userOpts);

    return function (style, result) {
        if (opts.basePath) {
            if (typeof opts.basePath === 'string') {
                opts.basePath = [_path2.default.resolve(opts.basePath)];
            } else {
                opts.basePath = opts.basePath.map(function (elem) {
                    return _path2.default.resolve(elem);
                });
            }
        } else {
            opts.basePath = [process.cwd()];
        }

        if (opts.dest) {
            opts.dest = _path2.default.resolve(opts.dest);
        } else {
            throw new Error('Option `dest` is required in postcss-copy');
        }

        var promises = [];
        style.walkDecls(function (decl) {
            if (decl.value && decl.value.indexOf('url(') > -1) {
                promises.push(processDecl(result, decl, opts));
            }
        });
        return Promise.all(promises).then(function (decls) {
            return decls.forEach(function (decl) {
                decl.value = String(decl.value);
            });
        });
    };
}

exports.default = _postcss2.default.plugin('postcss-copy', init);
module.exports = exports['default'];