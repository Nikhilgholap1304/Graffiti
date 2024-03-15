'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findBasePath = findBasePath;
exports.defineCSSDestPath = defineCSSDestPath;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Quick function to find a basePath where the
 * the asset file belongs.
 *
 * @param paths
 * @param pathname
 * @returns {string|boolean}
 */
function findBasePath(paths, pathname) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (pathname.indexOf(item) === 0) {
                return item;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return false;
}

/**
 * Function to define the dest path of your CSS file
 *
 * @param dirname
 * @param basePath
 * @param result
 * @param opts
 * @returns {string}
 */
function defineCSSDestPath(dirname, basePath, result, opts) {
    var from = _path2.default.resolve(result.opts.from);
    var to = void 0;

    if (result.opts.to) {
        /**
         * if to === from we can't use it as a valid dest path
         * e.g: gulp-postcss comes with this problem
         *
         */
        to = _path2.default.resolve(result.opts.to) === from ? opts.dest : _path2.default.dirname(result.opts.to);
    } else {
        to = opts.dest;
    }

    if (opts.preservePath) {
        var srcPath = void 0;
        var realBasePath = void 0;

        if (dirname === _path2.default.dirname(from)) {
            srcPath = dirname;
            realBasePath = basePath;
        } else {
            /**
             * dirname !== path.dirname(result.opts.from) means that
             * postcss-import is grouping different css files in
             * only one destination, so, the relative path must be defined
             * based on the CSS file where we read the @imports
             */
            srcPath = _path2.default.dirname(from);
            realBasePath = findBasePath(opts.basePath, from);
        }

        return _path2.default.join(to, _path2.default.relative(realBasePath, srcPath));
    }

    return to;
}