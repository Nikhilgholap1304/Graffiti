import { resolve as resolvePath } from 'path';
import { readFileSync } from 'fs';
import {
  arch,
  cpus,
  endianness,
  freemem,
  homedir,
  hostname,
  loadavg,
  networkInterfaces,
  platform,
  release,
  tmpdir,
  totalmem,
  type as osType,
  uptime,
} from 'os';
import {
  assign as assignify,
  camelCase,
  cloneDeep,
  compact as compactify,
  every,
  flattenDeep,
  get,
  find,
  filter,
  first,
  forEach,
  isArray,
  isBoolean,
  isDate,
  isFunction,
  isNumber,
  isNaN as isNotANumber,
  isEmpty,
  isError,
  isString,
  includes,
  isPlainObject,
  join as joinify,
  map,
  merge as mergify,
  noop,
  pick,
  omit,
  omitBy,
  orderBy,
  reduce,
  size,
  some,
  snakeCase,
  startCase,
  toLower,
  toString,
  toUpper,
  trim,
  uniq as uniqify,
  words as wordify,
} from 'lodash';
import { getType as mimeTypeOf, getExtension as mimeExtensionOf } from 'mime';
import { flatten, unflatten } from 'flat';
import { message as STATUS_CODES } from 'statuses';
import inflection from 'inflection';
import generateColor from 'randomcolor';
import moment from 'moment';
import hashObject from 'object-hash';
import renderTemplate from 'string-template';
import stripTags from 'striptags';
import parseValue from 'auto-parse';

export { STATUS_CODES };

export { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from 'uuid';

export { isNode, isBrowser, isWebWorker } from 'browser-or-node';

/**
 * @name RESOURCE_ACTIONS
 * @description Default resource actions
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @private
 */
export const RESOURCE_ACTIONS = [
  // PERMISSION_SEED_ACTIONS
  // RESOURCE_ACTIONS
  'list',
  'create',
  'view',
  'edit',
  'delete',
  'share',
  'print',
  'import',
  'export',
  'download',
];

/**
 * @function isNotValue
 * @name isNotValue
 * @description Check if variable has no associated state or has empty state
 * @param {*} value variable to check
 * @returns {boolean} whether variable contain state
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.10.0
 * @version 0.3.0
 * @static
 * @public
 * @example
 *
 * const notValue = isNotValue('a');
 * // => false
 *
 * const notValue = isNotValue(null);
 * // => true
 */
export const isNotValue = (value) => {
  // handle NaN
  if (isNotANumber(value)) {
    return true;
  }
  // handle boolean, number, error and function
  if (
    isBoolean(value) ||
    isNumber(value) ||
    isError(value) ||
    isFunction(value)
  ) {
    return false;
  }
  // handle string
  if (isString(value)) {
    return !value || isEmpty(trim(value));
  }
  // handle date
  if (isDate(value)) {
    return !value || !value.getTime();
  }
  // handle other types
  return !value || isEmpty(value);
};

/**
 * @function isValue
 * @name isValue
 * @description Check if variable has associated state or has no empty state
 * @param {*} value variable to check
 * @returns {boolean} whether variable contain state
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.40.0
 * @version 0.2.0
 * @static
 * @public
 * @example
 *
 * const notValue = isValue('a');
 * // => true
 *
 * const notValue = isValue(null);
 * // => false
 */
export const isValue = (value) => {
  return !isNotValue(value);
};

/**
 * @function firstValue
 * @name firstValue
 * @description Obtain first valid value
 * @param {*} values list of values
 * @returns {*} first valid value
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.36.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * firstValue('a', 'b');
 * // => 'a'
 *
 * firstValue(undefined, 'b');
 * // => 'b'
 */
export const firstValue = (...values) => {
  return first(filter([...values], (value) => !isNotValue(value)));
};

/**
 * @function copyOf
 * @name copyOf
 * @description Recursively clone a value
 * @param {*} value valid value to clone
 * @returns {*} cloned value
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.25.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const copy = copyOf('a');
 * // => 'a'
 *
 * const copy = copyOf({ 'a': 1 });
 * // => { 'a': 1 }
 */
export const copyOf = (value) => cloneDeep(value);

/**
 * @function mapToUpper
 * @name mapToUpper
 * @description Convert list of values to upper values
 * @param {...string} values list to convert to upper
 * @returns {string[]} list of upper values
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.12.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const mapToUpper = mapToUpper('a');
 * // => ['A']
 *
 * const mapToUpper = mapToUpper(['a', 'b'], 'c');
 * // => ['A', 'B', 'C']
 */
export const mapToUpper = (...values) => {
  // convert lower to upper
  const convertToUpper = (value) => toUpper(value);
  // collect values
  const lowerValues = flattenDeep([...values]);
  // convert to upper
  const upperValues = map(lowerValues, convertToUpper);
  // return upper values
  return upperValues;
};

/**
 * @function mapToLower
 * @name mapToLower
 * @description Convert list of values to lower values
 * @param {...string} values list to convert to lower
 * @returns {string[]} list of lower values
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.12.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const mapToLower = mapToLower('A');
 * // => ['a']
 *
 * const mapToLower = mapToLower(['A', 'B'], 'C');
 * // => ['a', 'b', 'c']
 */
export const mapToLower = (...values) => {
  // convert upper to lower
  const convertToLower = (value) => toLower(value);
  // collect values
  const upperValues = flattenDeep([...values]);
  // convert to lower
  const lowerValues = map(upperValues, convertToLower);
  // return lower values
  return lowerValues;
};

/**
 * @function areNotEmpty
 * @name areNotEmpty
 * @description Check if provided values are not empty
 * @param {...string} values set of values to check for emptiness
 * @returns {boolean} whether values are not empty
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.2.0
 * @static
 * @public
 * @example
 *
 * const notEmpty = areNotEmpty('a', 'b', 'c');
 * // => true
 *
 * const notEmpty = areNotEmpty('a', 'b', null);
 * // => false
 */
export const areNotEmpty = (...values) => {
  // copy values
  const copyOfValues = [...values];
  // check for empty values so far
  const checkForEmpties = (arePreviousEmpty, nextValue) => {
    return arePreviousEmpty && !isEmpty(toString(nextValue));
  };
  // assert for emptiness
  const notEmpty = reduce(copyOfValues, checkForEmpties, true);
  // return emptiness state
  return notEmpty;
};

/**
 * @function compact
 * @name compact
 * @description Creates new array(or object) with all falsey values removed.
 * The values false, null, 0, "", undefined, and NaN are falsey.
 * @param {Array|object} value The array(or object) to compact.
 * @returns {object|Array} new array(or object) of filtered values.
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const b = compact([null, 1, "", undefined]);
 * // => [ 1 ]
 *
 * const y = compact({a: 1, b: "", c: undefined});
 * // => { a: 1 }
 */
export const compact = (value) => {
  // copy value
  const copyOfValue = copyOf(value);

  // compact array
  if (isArray(copyOfValue)) {
    return compactify(copyOfValue);
  }

  // compact object
  if (isPlainObject(copyOfValue)) {
    return omitBy(copyOfValue, isNotValue);
  }

  // return value
  return copyOfValue;
};

/**
 * @function uniq
 * @name uniq
 * @description Creates new duplicate-free version of array(or object).
 * @param {Array|object} value The array(or object) to inspect.
 * @returns {object|Array} new duplicate free array(or object).
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const b = uniq([null, 1, 1, "", undefined, 2]);
 * // => [ 1, 2 ]
 *
 * const y = uniq({a: 1, b: "", c: undefined});
 * // => { a: 1 }
 */
export const uniq = (value) => {
  // uniq
  if (value) {
    let copyOfValue = compact(value);
    copyOfValue = isArray(value) ? uniqify(copyOfValue) : copyOfValue;
    return copyOfValue;
  }

  // return value
  return value;
};

/**
 * @function sortedUniq
 * @name sortedUniq
 * @description Creates new duplicate-free version of sorted array(or object).
 * @param {Array|object} value The array(or object) to inspect.
 * @returns {object|Array} new duplicate free sorted array(or object).
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const b = sortedUniq([null, 1, 2, "", undefined, 1]);
 * // => [ 1, 2 ]
 *
 * const y = sortedUniq({a: 1, b: "", c: undefined});
 * // => { a: 1 }
 */
export const sortedUniq = (value) => {
  // sortedUniq
  if (value) {
    let copyOfValue = uniq(value);
    copyOfValue = isArray(copyOfValue) ? orderBy(copyOfValue) : copyOfValue;
    return copyOfValue;
  }

  // return value
  return value;
};

/**
 * @function assign
 * @name assign
 * @description Assign a list of objects into a single object
 *
 * Note:** This method mutates `object`.
 * @param {object} [object={}] destination object
 * @param {...object} objects list of objects
 * @returns {object} a merged object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.26.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const obj = { a: 1 };
 * assign(obj, { b: 1 }, { c: 2});
 * // => { a: 1, b: 1, c: 2 }
 */
export const assign = (object = {}, ...objects) => {
  // ensure source objects
  let sources = compactify([...objects]);
  sources = map(sources, compact);

  // assign objects
  assignify(object, ...sources);

  // return assigned object
  return object;
};

/**
 * @function mergeObjects
 * @name mergeObjects
 * @description Merge a list of objects into a single object
 * @param {...object} objects list of objects
 * @returns {object} a merged object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.10.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const obj = mergeObjects({ a: 1 }, { b: 1 }, { c: 2}, { c: 2}, {b: null})
 * // => { a: 1, b: 1, c: 2 }
 */
export const mergeObjects = (...objects) => {
  // ensure source objects
  let sources = compactify([...objects]);
  sources = map(sources, compact);

  // merged objects
  const merged = mergify({}, ...sources);

  // return merged object
  return merged;
};

/**
 * @function safeMergeObjects
 * @name safeMergeObjects
 * @description Merge a list of objects into a single object without
 * cloning sources
 * @param {...object} objects list of objects
 * @returns {object} a merged object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.31.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const obj = safeMergeObjects({ a: 1 }, { b: 1 }, { c: 2}, { c: 2}, {b: null})
 * // => { a: 1, b: 1, c: 2 }
 */
export const safeMergeObjects = (...objects) => {
  // ensure source objects
  const sources = compactify([...objects]);

  // merged objects
  const merged = mergify({}, ...sources);

  // return merged object
  return merged;
};

/**
 * @function pkg
 * @name pkg
 * @description Read package information
 * @param {string} [path] valid path to package.json file
 * @param {...string} field fields to pick from package
 * @returns {object} current process package information
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.3.0
 * @static
 * @public
 * @example
 *
 * const { name, version } = pkg();
 * // => { name: ..., version: ...}
 *
 * const { name, version } = pkg(__dirname);
 * // => { name: ..., version: ...}
 */
export const pkg = (path, ...field) => {
  // try read from path or process cwd
  const read = () => {
    try {
      const filePath = resolvePath(path, 'package.json');
      const json = JSON.parse(readFileSync(filePath, 'utf8'));
      return json;
    } catch (e) {
      const filePath = resolvePath(process.cwd(), 'package.json');
      const json = JSON.parse(readFileSync(filePath, 'utf8'));
      return json;
    }
  };

  // try read package data
  try {
    const packageInfo = mergeObjects(read());
    const fields = uniq([...field, path]);
    if (!isEmpty(fields)) {
      const info = { ...pick(packageInfo, ...fields) };
      return isEmpty(info) ? { ...packageInfo } : info;
    }
    return packageInfo;
  } catch (e) {
    // no package data found
    return {};
  }
};

/**
 * @function scopesFor
 * @name scopesFor
 * @description Generate resource scopes
 * @param {...string} resources valid resources
 * @returns {string[]} resources scopes
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.6.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const scopes = scopesFor('user')
 * // => ['user:create', 'user:view']
 */
export const scopesFor = (...resources) => {
  // initialize resources scopes
  let scopes;

  // map resource to actions
  const toActions = (resource) => {
    // map action to wildcard scopes
    const toWildcard = (action) => {
      // map action to scope(permission)
      const scope = toLower([resource, action].join(':'));
      return scope;
    };
    // create scopes(permissions) per action
    return map(RESOURCE_ACTIONS, toWildcard);
  };

  // generate resources scopes
  if (resources) {
    // copy unique resources
    const copyOfResources = uniq([...resources]);

    // create scopes(permissions) per resource
    scopes = map(copyOfResources, toActions);
    scopes = sortedUniq(flattenDeep(scopes));
  }

  // return resources scopes
  return scopes;
};

/**
 * @function permissionsFor
 * @name permissionsFor
 * @description Generate resource permissions
 * @param {...string} resources valid resources
 * @returns {object[]} resources permissions
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.28.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const permissions = permissionsFor('User')
 * // => [{resource: 'User', wildcard: 'user:create', action: ...}, ....];
 */
export const permissionsFor = (...resources) => {
  // initialize resources permissions
  let permissions = [];

  // generate resources permissions
  if (resources) {
    // copy unique resources
    const copyOfResources = uniq([...resources]);

    // create permissions(permissions) per resource
    forEach(copyOfResources, (resource) => {
      // prepare resource permissions
      const resourcePermissions = map(RESOURCE_ACTIONS, (action) => {
        return {
          resource,
          action: toLower(action),
          description: startCase(`${action} ${resource}`),
          wildcard: toLower([resource, action].join(':')),
        };
      });

      // collect resource permissions
      permissions = [...permissions, ...resourcePermissions];
    });
  }

  // return resources permissions
  return permissions;
};

/**
 * @function abbreviate
 * @name abbreviate
 * @description Generate shortened form of word(s) or phrase.
 * @param {...string} words set of words to derive abbreaviation
 * @returns {string} abbreviation
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.6.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const abbreaviation = abbreviate('Ministry of Finance')
 * // => MoF
 */
export const abbreviate = (...words) => {
  // ensure words
  let phrases = flattenDeep([...words]);
  phrases = wordify(phrases.join(' '));

  // generate abbreviation
  const pickFirstLetters = (abbr, phrase) => {
    return toUpper(abbr + first(phrase));
  };
  const abbreviation = reduce(phrases, pickFirstLetters, '');

  // return abbreviation
  return abbreviation;
};

/**
 * @function idOf
 * @name idOf
 * @description Obtain an id or a given object
 * @param {object} data object to pick id from
 * @returns {*} id of a given object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.10.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const id = idOf({ id: 1 })
 * // => 1
 *
 * const id = idOf({ _id: 1 })
 * // => 1
 */
export const idOf = (data) => get(data, '_id') || get(data, 'id');

/**
 * @function variableNameFor
 * @name variableNameFor
 * @description Produce camelize variable name based on passed strings
 * @param {...string} names list of strings to produce variable name
 * @returns {string} camelized variable name
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.10.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const name = variableNameFor('get', 'name');
 * // => getName
 *
 * const name = variableNameFor('pick', 'a', 'name');
 * // => pickAName
 */
export const variableNameFor = (...names) => camelCase([...names].join(' '));

/**
 * @function has
 * @name has
 * @description Check if value is in a collection
 * @param {Array} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @returns {boolean} whether value is in collection
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.11.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const hasValue = has([ 1, 2 ], 1);
 * // => true
 *
 * const hasValue = has([ 'a', 'b' ], 'c');
 * // => false
 */
export const has = (collection, value) => includes(collection, value);

/**
 * @function hasAll
 * @name hasAll
 * @description Check if all value are in a collection
 * @param {Array} collection The collection to inspect.
 * @param {*} values The values to search for.
 * @returns {boolean} whether values are in collection
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.11.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const hasValues = hasAll([ 1, 2 ], 1, 2);
 * // => true
 *
 * const hasValues = hasAll([ 1, 2 ], [ 1, 2 ]);
 * // => true
 *
 * const hasValues = hasAll([ 'a', 'b' ], 'c', 'd');
 * // => false
 */
export const hasAll = (collection, ...values) => {
  // check if value is in collection
  const checkIfIsInCollection = (value) => has(collection, value);

  // check if collection has all values
  const flatValues = flattenDeep([...values]);
  const areAllInCollection = every(flatValues, checkIfIsInCollection);

  // return whether collection has all value
  return areAllInCollection;
};

/**
 * @function hasAny
 * @name hasAny
 * @description Check if any value is in a collection
 * @param {Array} collection The collection to inspect.
 * @param {*} values The values to search for.
 * @returns {boolean} whether any value is in collection
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.11.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const hasValues = hasAny([ 1, 2 ], 1, 2);
 * // => true
 *
 * const hasValues = hasAny([ 1, 2 ], [ 1, 2 ]);
 * // => true
 *
 * const hasValues = hasAny([ 'a', 'b' ], 'b', 'd');
 * // => true
 *
 * const hasValues = hasAny([ 'a', 'b' ], 'c', 'd');
 * // => false
 */
export const hasAny = (collection, ...values) => {
  // check if value is in collection
  const checkIfIsInCollection = (value) => has(collection, value);

  // check if collection has all values
  const flatValues = flattenDeep([...values]);
  const isAnyInCollection = some(flatValues, checkIfIsInCollection);

  // return whether collection has any value
  return isAnyInCollection;
};

/**
 * @function normalizeError
 * @name normalizeError
 * @description Normalize error instance with name, code, status and message.
 *
 * Note:** This method mutates `object`.
 * @param {Error} error valid error instance
 * @param {object} [options] additional convert options
 * @param {string} [options.name=Error] default error name
 * @param {string} [options.code=500] default error code
 * @param {string} [options.status=500] default error status
 * @param {string} [options.message=500] default error message
 * @see {@link https://jsonapi.org/format/#errors}
 * @returns {Error} normalized error object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.26.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const body = normalizeError(new Error('Missing API Key'));
 * // => error.status = 500;
 */
export const normalizeError = (error, options = {}) => {
  // ensure options
  let { name = 'Error', code = 500, status, message } = mergeObjects(options);

  // prepare error properties
  code = error.code || error.statusCode || code;
  status = error.status || error.statusCode || status || code;
  name = error.name || name;
  message = error.message || message || STATUS_CODES[code];

  // assign values
  assign(error, { code, status, name, message });

  // return normalized error
  return error;
};

/**
 * @function bagify
 * @name bagify
 * @description Normalize errors bag to light weight object
 * @param {object} errors valid errors bag
 * @returns {object} formatted errors bag
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.14.0
 * @version 0.2.0
 * @static
 * @public
 * @example
 *
 * const body = bagify({name : new Error('Validation Error') });
 * // => { name: { name: 'Error', message: 'Name Required'}, ... }
 */
export const bagify = (errors = {}) => {
  // initialize normalize errors bag
  const bag = {};
  // iterate errors ba
  forEach(errors, (error = {}, key) => {
    // simplify error bag
    const {
      message,
      name,
      type,
      kind,
      path,
      value,
      index,
      properties = {},
    } = error;
    const normalized = mergeObjects(
      { message, name, type, kind, path, value, index },
      properties
    );
    // reset key with normalized error
    const props = ['message', 'name', 'type', 'kind', 'path', 'value', 'index'];
    bag[key] = pick(normalized, ...props);
  });
  // return errors bag
  return bag;
};

/**
 * @function mapErrorToObject
 * @name mapErrorToObject
 * @description Convert error instance to light weight object
 * @param {Error} error valid error instance
 * @param {object} [options] additional convert options
 * @param {string} [options.name=Error] default error name
 * @param {string} [options.code=500] default error code
 * @param {string} [options.stack=false] whether to include error stack
 * @param {string} [options.status=500] default error status
 * @see {@link https://jsonapi.org/format/#errors}
 * @returns {object} formatted error object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.13.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const body = mapErrorToObject(new Error('Missing API Key'));
 * // => { name:'Error', message: 'Missing API Key', ... }
 */
export const mapErrorToObject = (error, options = {}) => {
  // ensure options
  const {
    name = 'Error',
    code = 500,
    stack = false,
    status,
    message,
    description,
  } = mergeObjects(options);

  // prepare error payload
  const body = {};
  body.code = error.code || error.statusCode || code;
  body.status = error.status || error.statusCode || status || code;
  body.name = error.name || name;
  body.message = error.message || message || STATUS_CODES[code];
  body.description = error.description || description || body.message;
  body.errors = error.errors ? bagify(error.errors) : undefined;
  body.stack = stack ? error.stack : undefined;

  // support OAuth v2 error style
  // https://tools.ietf.org/html/rfc6749#page-71
  body.uri = get(error, 'error_uri', error.uri);
  body.error = error.error || body.name;
  body.error_description = body.description;
  body.error_uri = body.uri;

  // return formatted error response
  return mergeObjects(body);
};

/**
 * @function osInfo
 * @name osInfo
 * @description Obtain operating system information
 * @returns {object} os information object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.14.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const info = osInfo();
 * // => { arch:'x64', ... }
 */
export const osInfo = () => {
  // collect os information
  const info = {
    arch: arch(),
    cpus: cpus(),
    endianness: endianness(),
    freemem: freemem(),
    homedir: homedir(),
    hostname: hostname(),
    loadavg: loadavg(),
    networkInterfaces: networkInterfaces(),
    platform: platform(),
    release: release(),
    tmpdir: tmpdir(),
    totalmem: totalmem(),
    type: osType(),
    uptime: uptime(),
  };
  // return collected os information
  return info;
};

/**
 * @function processInfo
 * @name processInfo
 * @description Obtain current process information
 * @returns {object} current process information
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.15.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const info = processInfo();
 * // => { pid: 8989, ... }
 */
export const processInfo = () => {
  // collect process information
  const info = {
    arch: process.arch,
    cpuUsage: process.cpuUsage(),
    cwd: process.cwd(),
    features: process.features,
    egid: process.getegid(),
    euid: process.geteuid(),
    gid: process.getgid(),
    groups: process.getgroups(),
    uid: process.getuid(),
    hrtime: process.hrtime(),
    memoryUsage: process.memoryUsage(),
    pid: process.pid,
    platform: process.platform,
    ppid: process.ppid,
    title: process.title,
    uptime: process.uptime(),
    version: process.version,
    versions: process.versions,
  };
  // return collected process information
  return info;
};

/**
 * @function randomColor
 * @name randomColor
 * @description Generating attractive random colors
 * @param {object} [optns] valid generator options
 * @param {string} [optns.luminosity=light] controls the luminosity of the
 * generated color. you can specify a string containing `bright`, `light` or
 * `dark`.
 * @returns {string} random color
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.18.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const color = randomColor();
 * // => #C349D8
 */
export const randomColor = (optns = { luminosity: 'light' }) => {
  const options = mergeObjects(optns);
  const color = toUpper(generateColor(options));
  return color;
};

/**
 * @function formatDate
 * @name formatDate
 * @description Format a date using specified format
 * @param {Date} [date=new Date()] valid date instance
 * @param {string} [format='YYYY-MM-DD'] valid date format
 * @returns {string} formatted date string
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.19.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const date = formatDate(new Date(), 'YYYY-MM-DD');
 * // => 2019-05-30
 */
export const formatDate = (date = new Date(), format = 'YYYY-MM-DD') => {
  const formatted = moment.utc(date).format(format);
  return formatted;
};

/**
 * @function parseDate
 * @name parseDate
 * @description Parse a date in UTC from specified format
 * @param {string} date valid date string
 * @param {string} [format='YYYY-MM-DD'] valid date format
 * @returns {string} parsed date object in UTC
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.41.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const date = parseDate('2019-05-30', 'YYYY-MM-DD');
 * // => Thu May 30 2019 ...
 */
export const parseDate = (date, format = 'YYYY-MM-DD') => {
  const parsed = moment.utc(date, format).toDate();
  return parsed;
};

/**
 * @function mimeTypeOf
 * @name mimeTypeOf
 * @description Lookup a mime type based on file extension
 * @param {string} extension valid file extension or name
 * @returns {string} valid mime type
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.20.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const mime = mimeTypeOf('txt');
 * // => 'text/plain'
 */
export { mimeTypeOf };

/**
 * @function mimeExtensionOf
 * @name mimeExtensionOf
 * @description Obtain file extension associated with a mime type
 * @param {string} mimeType valid mime type
 * @returns {string} valid file extension
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.20.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const extension = mimeExtensionOf('text/plain');
 * // => txt
 */
export { mimeExtensionOf };

/**
 * @function hashOf
 * @name hashOf
 * @description Generate hash of provided object
 * @param {object} object valid object to hash
 * @param {...string} [ignore] properties to ignore
 * @returns {string} valid object hash
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.21.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const hash = hashOf({ foo: 'bar' })
 * // => '67b69634f9880a282c14a0f0cb7ba20cf5d677e9'
 */
export const hashOf = (object, ...ignore) => {
  // ensure object
  let copyOfObject = mergeObjects(object);
  copyOfObject = omit(copyOfObject, ...ignore);

  // compute hash
  const hash = hashObject(copyOfObject);

  // return computed hash
  return hash;
};

/**
 * @function parseTemplate
 * @name parseTemplate
 * @description Parse, format and render string based template
 * @param {string} template valid template
 * @param {object} data object valid object apply on template
 * @returns {string} formatted string
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.21.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const template = 'Hello {name}, you have {count} unread messages';
 * const formatted = parseTemplate(template, { name: 'John', count: 12 });
 * // => 'Hello John, you have 12 unread messages'
 */
export const parseTemplate = (template, data) => {
  // ensure copy
  const copyOfTemplate = copyOf(template);
  const copyOfData = mergeObjects(data);

  // render string template
  const formatted = renderTemplate(copyOfTemplate, copyOfData);

  // return formatted string
  return formatted;
};

/**
 * @function stripHtmlTags
 * @name stripHtmlTags
 * @description Strip HTML tags from a string
 * @param {string} html valid html string
 * @returns {string} string with no html tags
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.21.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const html = 'lorem ipsum <strong>dolor</strong> <em>sit</em> amet';
 * const formatted = stripHtmlTags(html);
 * // => 'lorem ipsum dolor sit amet'
 */
export const stripHtmlTags = (html) => {
  const copyOfHtml = copyOf(html);
  const formatted = stripTags(copyOfHtml);
  return formatted;
};

/**
 * @function stringify
 * @name stringify
 * @description Safely converts a given value to a JSON string
 * @param {*} value valid value
 * @returns {string} JSON string of a value
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.22.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const value = { x: 5, y: 6 };
 * const string = stringify(value);
 * // => '{"x":5,"y":6}'
 */
export const stringify = (value) => {
  try {
    return JSON.stringify(value);
  } catch (e) {
    return value;
  }
};

/**
 * @function parse
 * @name parse
 * @description Safely parses a JSON string to a value
 * @param {string} value JSON string of a value
 * @returns {*} valid value
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.22.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const string = '{"x":5,"y":6}';
 * const value = parse(value);
 * // => { x: 5, y: 6 }
 */
export const parse = (value) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

/**
 * @function pluralize
 * @name pluralize
 * @description Convert a given string value to its plural form
 * @param {string} value subject value
 * @returns {string} plural form of provided string
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.24.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * pluralize('person');
 * // => people
 *
 * pluralize('Hat');
 * // => Hats
 */
export const pluralize = (value) => {
  let plural = copyOf(value);
  plural = inflection.pluralize(plural);
  return plural;
};

/**
 * @function singularize
 * @name singularize
 * @description Convert a given string value to its singular form
 * @param {string} value subject value
 * @returns {string} singular form of provided string
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.24.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * singularize('people');
 * // => person
 *
 * singularize('Hats');
 * // => Hat
 */
export const singularize = (value) => {
  let singular = copyOf(value);
  singular = inflection.singularize(singular);
  return singular;
};

/**
 * @function autoParse
 * @name autoParse
 * @description Safely auto parse a given value to js object
 * @param {*} value subject to parse
 * @param {...string} [fields] subject fields to apply auto parse
 * @returns {*} valid js object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.24.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * autoParse('5');
 * // => 5
 *
 * autoParse('{"x":5,"y":6}');
 * // => { x: 5, y: 6 }
 *
 * autoParse({ a: '5', b: '6' }, 'a'))
 * // => { a: 5, b: '6' }
 */
export const autoParse = (value, ...fields) => {
  const copyOfValue = copyOf(value);
  // handle plain object
  if (isPlainObject(copyOfValue)) {
    let parsed = pick(copyOfValue, ...fields);
    parsed = isEmpty(parsed) ? copyOfValue : parsed;
    parsed = parseValue(parsed);
    return mergify(copyOfValue, parsed);
  }
  // handle others
  return parseValue(copyOfValue);
};

/**
 * @function flat
 * @name flat
 * @description Flatten a nested object
 * @param {object} value valid object to flatten
 * @returns {object} flatten object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.27.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const value = { a: { b: { c: 2 } } };
 * flat(value);
 * // => { 'a.b.c': 2 }
 */
export const flat = (value) => {
  let flattened = copyOf(value);
  flattened = flatten(flattened);
  return flattened;
};

/**
 * @function unflat
 * @name unflat
 * @description Unflatten object to nested object
 * @param {object} value valid object to un flatten
 * @returns {object} nested object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.27.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const value = { 'a.b.c': 2 };
 * unflat(value);
 * // => { a: { b: { c: 2 } } };
 */
export const unflat = (value) => {
  let unflatted = copyOf(value);
  unflatted = unflatten(unflatted);
  return unflatted;
};

/**
 * @function join
 * @name join
 * @description Converts array values into a string separated by separator
 * @param {string[]} values list to convert to string
 * @param {string} [separator=', '] valid separator
 * @param {string} [property] property to pick when value is object
 * @returns {string} joined values
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.29.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const join = join('a');
 * // => 'a'
 *
 * const join = join(['a', 'b']);
 * // => 'a, b, c'
 *
 * const join = join([{ a: 'c' }, 'b'], ', ', 'c');
 * // => 'c, b'
 */
export const join = (values = [], separator = ', ', property = '') => {
  // TODO: prefix(support number)?, suffix(support new line)?

  // copy values
  const copies = flattenDeep([].concat(values));

  // collect parts
  const parts = map(copies, (copy) => {
    if (isPlainObject(copy)) {
      return get(copy, property);
    }
    return copy;
  });

  // joined parts
  const joined = joinify(parts, separator);

  // return joined values
  return joined;
};

/**
 * @function transform
 * @name transform
 * @description Preprocess given values according to provided transformers
 * @param {*} vals value to be convert
 * @param {Function} [transformers] iteratee function which receive result
 * `value` to be transformed
 * @returns {*} resulted value
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.43.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const transform = transform(['a']);
 * // => ['a']
 *
 * const transform = transform([1, '2'], _.toNumber);
 * // => [1, 2]
 */
export const transform = (vals, ...transformers) => {
  // ensure compact values
  const values = compact([].concat(vals));

  // prepare transformers
  const defaultTransformer = (value) => value;
  const preprocessors = map(
    compact([defaultTransformer].concat(...transformers)),
    (transformer) => {
      return isFunction(transformer) ? transformer : defaultTransformer;
    }
  );

  // transform values
  let transformed = map(values, (value) => {
    let data;
    forEach(preprocessors, (transformer) => {
      data = transformer(value);
    });
    return data;
  });

  // return transformed data
  transformed = compact(transformed);
  transformed = size(transformed) === 1 ? first(transformed) : transformed;
  return transformed;
};

/**
 * @function arrayToObject
 * @name arrayToObject
 * @description Converts array values into an object
 * @param {string[]} array array to convert to object
 * @param {Function} [transformer] iteratee function which receive result
 * `object` and current `key` to be transformed
 * @returns {object} resulted object or empty
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.33.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const arrayToObject = arrayToObject(['a']);
 * // => { a: 'a' }
 *
 * const arrayToObject = arrayToObject(['a', 'b']);
 * // => { a: 'a', b: 'b' }
 */
export const arrayToObject = (array, transformer) => {
  // ensure compact keys
  const keys = compact([].concat(array));

  // prepare transformer
  const defaultTransformer = (object, value) => value;
  const valueFor = isFunction(transformer) ? transformer : defaultTransformer;

  // transform array to object
  const object = {};
  forEach(keys, (key) => {
    object[key] = valueFor(object, key);
  });

  // return object
  return object;
};

/**
 * @function parseMs
 * @name parseMs
 * @description Safely parse a given millisecond absolute value into js object
 * @param {number} ms valid millisecond value
 * @returns {object} valid js object
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.34.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * parseMs(1337000001);
 * // => {
 *     days: 15,
 *     hours: 11,
 *     minutes: 23,
 *     seconds: 20,
 *     milliseconds: 1,
 *     microseconds: 0,
 *     nanoseconds: 0,
 *   }
 */
export const parseMs = (ms) => {
  // ensure absolute value
  const value = Math.abs(ms);

  // parse milliseconds
  // credits: https://github.com/sindresorhus/parse-ms/blob/main/index.js#L6
  const parsed = {
    days: Math.trunc(value / 86400000),
    hours: Math.trunc(value / 3600000) % 24,
    minutes: Math.trunc(value / 60000) % 60,
    seconds: Math.trunc(value / 1000) % 60,
    milliseconds: Math.trunc(value) % 1000,
    microseconds: Math.trunc(value * 1000) % 1000,
    nanoseconds: Math.trunc(value * 1e6) % 1000,
  };

  // return parsed
  return parsed;
};

/**
 * @function wrapCallback
 * @name wrapCallback
 * @description Wrap callback with default args
 * @param {Function} cb valid function to wrap
 * @param {...object} [defaultArgs] default arguments to wrapped function
 * @returns {Function} wrapped function.
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.35.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * wrapCallback(cb, defaults);
 * // => fn
 */
export const wrapCallback =
  (cb, ...defaultArgs) =>
  (...replyArgs) => {
    // prepare replies
    const args = compact([...replyArgs, ...defaultArgs]);
    const error = find(args, (arg) => isError(arg));
    const replies = filter(args, (arg) => !isError(arg));

    // reply
    if (isFunction(cb)) {
      return cb(error, ...replies);
    }
    // noop
    return noop(error, ...replies);
  };

// TODO: promiseOrCallback

/**
 * @function classify
 * @name classify
 * @description Convert a given string value to its class name form
 * @param {string} value subject value
 * @returns {string} plural form of provided string
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.37.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * classify('Health Center');
 * // => HealthCenter
 */
export const classify = (value) => {
  let className = snakeCase(copyOf(value));
  className = inflection.classify(className);
  return className;
};

/**
 * @function tryCatch
 * @name tryCatch
 * @description Attempts to invoke `func`, returning either the result or
 * `defaultValue` on error
 * @param {Function} func The function to attempt.
 * @param {*} defaultValue value to return on error
 * @returns {*} `func` result or `defaultValue`.
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.38.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * tryCatch(() => 1, 0);
 * //=> 1
 *
 * tryCatch(() => { throw new Error('Failed'); }, {});
 * // => {}
 */
export const tryCatch = (func, defaultValue) => {
  try {
    return func();
  } catch (e) {
    return defaultValue;
  }
};
