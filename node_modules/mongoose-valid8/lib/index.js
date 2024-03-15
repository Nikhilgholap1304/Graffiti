'use strict';

const mongoose = require('mongoose');
const lodash = require('lodash');
const validator = require('validator');
const env = require('@lykmapipo/env');
const phone = require('@lykmapipo/phone');

const MongooseError$2 = mongoose.Error;
const SchemaString = mongoose.Schema.Types.String;

/* custom validations error message */
MongooseError$2.messages.String.email =
  '`{VALUE}` is not a valid email address for path `{PATH}`.';
MongooseError$2.messages.String.macaddress =
  '`{VALUE}` is not a valid mac address for path `{PATH}`.';
MongooseError$2.messages.String.ip =
  '`{VALUE}` is not a valid ip address for path `{PATH}`.';
MongooseError$2.messages.String.fqdn =
  '`{VALUE}` is not a valid fully qualified domain name for path `{PATH}`.';
MongooseError$2.messages.String.alpha =
  '`{VALUE}` is not a valid alpha value for path `{PATH}`.';
MongooseError$2.messages.String.alphanumeric =
  '`{VALUE}` is not a valid alphanumeric value for path `{PATH}`.';
MongooseError$2.messages.String.md5 =
  '`{VALUE}` is not a valid md5 value for path `{PATH}`.';
MongooseError$2.messages.String.creditcard =
  '`{VALUE}` is not a valid credit card value for path `{PATH}`.';
MongooseError$2.messages.String.base64 =
  '`{VALUE}` is not a valid base64 value for path `{PATH}`.';
MongooseError$2.messages.String.datauri =
  '`{VALUE}` is not a valid Data URI value for path `{PATH}`.';
MongooseError$2.messages.String.mimetype =
  '`{VALUE}` is not a valid mimetype value for path `{PATH}`.';
MongooseError$2.messages.String.url =
  '`{VALUE}` is not a valid URL value for path `{PATH}`.';
MongooseError$2.messages.String.phone =
  '`{VALUE}` is not a valid phone number value for path `{PATH}`.';
MongooseError$2.messages.String.mobile =
  '`{VALUE}` is not a valid mobile phone number value for path `{PATH}`.';
MongooseError$2.messages.String.fixedline =
  '`{VALUE}` is not a valid fixedline phone number value for path `{PATH}`.';
MongooseError$2.messages.String.jwt =
  '`{VALUE}` is not a valid json web token for path `{PATH}`.';
MongooseError$2.messages.String.hexadecimal =
  '`{VALUE}` is not a valid hexadecimal value for path `{PATH}`.';
MongooseError$2.messages.String.hexacolor =
  '`{VALUE}` is not a valid hexacolor value for path `{PATH}`.';

/**
 * Sets email validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, email: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'a@b' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 'a@b.com';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options email validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.email = function email(options, message) {
  if (this.emailValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.emailValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$2.messages.String.email;
    this.validators.push({
      validator: (this.emailValidator = function emailValidator(v) {
        return validator.isEmail(String(v));
      }),
      message: msg,
      type: 'email',
    });
  }

  return this;
};

/**
 * Sets macaddress validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, macaddress: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'abc' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 'FF:FF:FF:FF:FF:FF';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options macaddress validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.macaddress = function macaddress(options, message) {
  if (this.macaddressValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.macaddressValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$2.messages.String.macaddress;
    this.validators.push({
      validator: (this.macaddressValidator = function macaddressValidator(v) {
        return validator.isMACAddress(String(v));
      }),
      message: msg,
      type: 'macaddress',
    });
  }

  return this;
};

/**
 * Sets ip validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, ip: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'abc' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = '127.0.0.1';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options ip validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.ip = function ip(options, message) {
  if (this.ipValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.ipValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg = options.message || message || MongooseError$2.messages.String.ip;
    this.validators.push({
      validator: (this.ipValidator = function ipValidator(v) {
        return validator.isIP(String(v));
      }),
      message: msg,
      type: 'ip',
    });
  }

  return this;
};

/**
 * Sets fqdn validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, fqdn: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'abc' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 'domain.com';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options fqdn validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.fqdn = function fqdn(options, message) {
  if (this.fqdnValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.fqdnValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$2.messages.String.fqdn;
    this.validators.push({
      validator: (this.fqdnValidator = function fqdnValidator(v) {
        return validator.isFQDN(String(v));
      }),
      message: msg,
      type: 'fqdn',
    });
  }

  return this;
};

/**
 * Sets alpha validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, alpha: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'abc1' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 'abc';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options alpha validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.alpha = function alpha(options, message) {
  if (this.alphaValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.alphaValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$2.messages.String.alpha;
    this.validators.push({
      validator: (this.alphaValidator = function alphaValidator(v) {
        return validator.isAlpha(String(v));
      }),
      message: msg,
      type: 'alpha',
    });
  }

  return this;
};

/**
 * Sets alphanumeric validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, alphanumeric: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'abc' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 'abc1';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options alphanumeric validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.alphanumeric = function alphanumeric(options, message) {
  if (this.alphanumericValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.alphanumericValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$2.messages.String.alphanumeric;
    this.validators.push({
      validator: (this.alphanumericValidator = function alphanumericValidator(
        v
      ) {
        return validator.isAlphanumeric(String(v));
      }),
      message: msg,
      type: 'alphanumeric',
    });
  }

  return this;
};

/**
 * Sets md5 validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, md5: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'abc' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 'd94f3f016ae679c3008de268209132f2';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options md5 validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.md5 = function md5(options, message) {
  if (this.md5Validator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.md5Validator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg = options.message || message || MongooseError$2.messages.String.md5;
    this.validators.push({
      validator: (this.md5Validator = function md5Validator(v) {
        return validator.isMD5(String(v));
      }),
      message: msg,
      type: 'md5',
    });
  }

  return this;
};

/**
 * Sets uuid validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, uuid: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'abc' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 'A987FBC9-4BED-5078-AF07-9141BA07C9F3';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options uuid validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.uuid = function uuid(options, message) {
  if (this.uuidValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.uuidValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$2.messages.String.uuid;
    this.validators.push({
      validator: (this.uuidValidator = function uuidValidator(v) {
        return validator.isUUID(String(v));
      }),
      message: msg,
      type: 'uuid',
    });
  }

  return this;
};

/**
 * Sets creditcard validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, creditcard: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'abc' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = '4716-2210-5188-5662';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options creditcard validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.creditcard = function creditcard(options, message) {
  if (this.creditcardValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.creditcardValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$2.messages.String.creditcard;
    this.validators.push({
      validator: (this.creditcardValidator = function creditcardValidator(v) {
        return validator.isCreditCard(String(v));
      }),
      message: msg,
      type: 'creditcard',
    });
  }

  return this;
};

/**
 * Sets base64 validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, base64: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'abc' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 'Zm9vYmE=';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options base64 validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.base64 = function base64(options, message) {
  if (this.base64Validator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.base64Validator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$2.messages.String.base64;
    this.validators.push({
      validator: (this.base64Validator = function base64Validator(v) {
        return validator.isBase64(String(v));
      }),
      message: msg,
      type: 'base64',
    });
  }

  return this;
};

/**
 * Sets data uri validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, datauri: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'abc' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 'Zm9vYmE=';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options datauri validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.datauri = function datauri(options, message) {
  if (this.datauriValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.datauriValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$2.messages.String.datauri;
    this.validators.push({
      validator: (this.dataUriValidator = function dataUriValidator(v) {
        return validator.isDataURI(String(v));
      }),
      message: msg,
      type: 'datauri',
    });
  }

  return this;
};

/**
 * Sets mimetype validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, mimetype: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'abc' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 'application/json';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options mimetype validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.mimetype = function mimetype(options, message) {
  if (this.mimetypeValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.mimetypeValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$2.messages.String.mimetype;
    this.validators.push({
      validator: (this.mimetypeValidator = function mimetypeValidator(v) {
        return validator.isMimeType(String(v));
      }),
      message: msg,
      type: 'mimetype',
    });
  }

  return this;
};

/**
 * Sets url validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, url: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'abc' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 'https://www.npmjs.com';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options url validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.url = function url(options, message) {
  if (this.urlValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.urlValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg = options.message || message || MongooseError$2.messages.String.url;
    this.validators.push({
      validator: (this.urlValidator = function urlValidator(v) {
        return validator.isURL(String(v));
      }),
      message: msg,
      type: 'url',
    });
  }

  return this;
};

/**
 * Converts the first character of string to upper case and the remaining to
 * lower case.
 *
 * ####Example:
 *
 *     var s = new Schema({ name: { type: String, capitalize: true }})
 *     var M = db.model('M', s);
 *     var m = new M({ name: 'fred'});
 *     console.log(m.name) // 'Fred'
 *
 * @public
 * @returns {object} valid mongoose validator
 */

SchemaString.prototype.capitalize = function capitalize(shouldApply) {
  if (arguments.length > 0 && !shouldApply) {
    return this;
  }
  return this.set(function setValue(v /* , self */) {
    const value = lodash.capitalize(v);
    return value;
  });
};

/**
 * Converts string to start case(or title case).
 *
 * ####Example:
 *
 *     var s = new Schema({ name: { type: String, startcase: true }})
 *     var M = db.model('M', s);
 *     var m = new M({ name: 'fred fuga'});
 *     console.log(m.name) // 'Fred Fuga'
 *
 * @public
 * @returns {object} valid mongoose validator
 */

SchemaString.prototype.startcase = function startcase(shouldApply) {
  if (arguments.length > 0 && !shouldApply) {
    return this;
  }
  return this.set(function setValue(v /* , self */) {
    const value = lodash.startCase(lodash.toLower(v));
    return value;
  });
};

/**
 * Sets phone validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, phone: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'abc' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = '255714676767';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options phone validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.phone = function phone$1(options, message) {
  if (this.phoneValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.phoneValidator;
    }, this);
  }

  // obtain path name
  const pathName = this.path;

  if (options !== null && options !== undefined) {
    // collect validator options
    const { mobile, fixedline, e164 } = options;
    const countries = lodash.compact(
      [env.getString('DEFAULT_COUNTRY_CODE')].concat(options.countries)
    );
    let msg = message || MongooseError$2.messages.String.phone;
    msg = options.message || msg;
    msg = mobile ? MongooseError$2.messages.String.mobile : msg;
    msg = fixedline ? MongooseError$2.messages.String.fixedline : msg;
    // collect validator
    this.validators.push({
      validator: (this.phoneValidator = function phoneValidator(v) {
        const phoneNumber = phone.parsePhoneNumber(String(v), ...countries);
        const { isMobile, isFixedLine, isTollFree } = phoneNumber || {};
        let isValid = phoneNumber ? phoneNumber.isValid : false;
        isValid = mobile ? isValid && isMobile : isValid;
        isValid = fixedline ? isValid && (isFixedLine || isTollFree) : isValid;
        // transform
        if (this.constructor.name === 'model') {
          if (isValid && e164) {
            this[pathName] = phoneNumber.e164NoPlus;
          }
        }
        // return validation status
        return isValid;
      }),
      message: msg,
      type: 'phone',
    });
  }

  return this;
};

/**
 * Sets jwt validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, jwt: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'a@b' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
 *       eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2Mj
 *       M5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options jwt validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.jwt = function jwt(options, message) {
  if (this.jwtValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.jwtValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg = options.message || message || MongooseError$2.messages.String.jwt;
    this.validators.push({
      validator: (this.jwtValidator = function jwtValidator(v) {
        return validator.isJWT(String(v));
      }),
      message: msg,
      type: 'jwt',
    });
  }

  return this;
};

/**
 * Sets hexadecimal validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, hexadecimal: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'a@b' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 'FF0044';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options hexadecimal validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.hexadecimal = function hexadecimal(options, message) {
  if (this.hexadecimalValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.hexadecimalValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$2.messages.String.hexadecimal;
    this.validators.push({
      validator: (this.hexadecimalValidator = function hexadecimalValidator(v) {
        return validator.isHexadecimal(String(v));
      }),
      message: msg,
      type: 'hexadecimal',
    });
  }

  return this;
};

/**
 * Sets hexacolor validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: String, hexacolor: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'a@b' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = '#FF0044';
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options hexacolor validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */
SchemaString.prototype.hexacolor = function hexacolor(options, message) {
  if (this.hexacolorValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.hexacolorValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$2.messages.String.hexacolor;
    this.validators.push({
      validator: (this.hexacolorValidator = function hexacolorValidator(v) {
        return validator.isHexColor(String(v));
      }),
      message: msg,
      type: 'hexacolor',
    });
  }

  return this;
};

const MongooseError$1 = mongoose.Error;
const SchemaNumber = mongoose.Schema.Types.Number;

/* custom validations error message */
MongooseError$1.messages.Number.numeric =
  '`{VALUE}` is not a valid numeric value for path `{PATH}`.';
MongooseError$1.messages.Number.integer =
  '`{VALUE}` is not a valid integer value for path `{PATH}`.';
MongooseError$1.messages.Number.float =
  '`{VALUE}` is not a valid float value for path `{PATH}`.';

/**
 * Sets numeric validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: Number, numeric: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'a' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 1;
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options numeric validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */

SchemaNumber.prototype.numeric = function numeric(options, message) {
  if (this.numericValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.numericValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$1.messages.Number.numeric;
    this.validators.push({
      validator: (this.numericValidator = function numericValidator(v) {
        return validator.isNumeric(String(v));
      }),
      message: msg,
      type: 'numeric',
    });
  }

  return this;
};

/**
 * Sets integer validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: Number, integer: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'a' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 1;
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options integer validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */

SchemaNumber.prototype.integer = function integer(options, message) {
  if (this.integerValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.integerValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$1.messages.Number.integer;
    this.validators.push({
      validator: (this.integerValidator = function integerValidator(v) {
        return validator.isInt(String(v));
      }),
      message: msg,
      type: 'integer',
    });
  }

  return this;
};

/**
 * Sets float validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: Number, float: true })
 *     var M = db.model('M', s)
 *     var m = new M({ n: 'fa' })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = 123.123;
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options float validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */

SchemaNumber.prototype.float = function float(options, message) {
  if (this.floatValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.floatValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError$1.messages.Number.float;
    this.validators.push({
      validator: (this.floatValidator = function floatValidator(v) {
        return validator.isFloat(String(v));
      }),
      message: msg,
      type: 'float',
    });
  }

  return this;
};

const MongooseError = mongoose.Error;
const SchemaArray = mongoose.Schema.Types.Array;

/* custom validations error message */
MongooseError.messages.Array = MongooseError.messages.Array || {};
MongooseError.messages.Array.empty = 'Path `{PATH}` can not be empty.';

/**
 * Sets empty validator.
 *
 * ####Example:
 *
 *     var s = new Schema({ n: { type: [String], empty: false })
 *     var M = db.model('M', s)
 *     var m = new M({ n: [] })
 *     m.save(function (err) {
 *       console.error(err) // validator error
 *       m.n = ['a'];
 *       m.save() // success
 *     })
 *
 * @param {boolean | object} options empty validation options
 * @param {string} [message] optional custom error message
 * @returns {object} valid mongoose validator
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @public
 */

SchemaArray.prototype.empty = function empty(options, message) {
  if (this.emptyValidator) {
    this.validators = this.validators.filter(function filter(v) {
      return v.validator !== this.emptyValidator;
    }, this);
  }

  if (options !== null && options !== undefined) {
    const msg =
      options.message || message || MongooseError.messages.Array.empty;
    const shouldAllowEmpty = options;
    this.validators.push({
      validator: (this.emptyValidator = function emptyValidator(v) {
        return shouldAllowEmpty ? true : !lodash.isEmpty(v);
      }),
      message: msg,
      type: 'empty',
    });
  }

  return this;
};

/**
 * Remove falsey values. The values false, null, 0, "", undefined, and NaN
 * are falsey.
 *
 * ####Example:
 *
 *     var s = new Schema({ caps: { type: [String], compact: true }})
 *     var M = db.model('M', s);
 *     var m = new M({ caps: [null, 'a', undefined, 'b']});
 *     console.log(m.caps) // 'a', 'b'
 *
 * @public
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @returns {object} valid mongoose validator
 */

SchemaArray.prototype.compact = function compact(shouldApply) {
  if (arguments.length > 0 && !shouldApply) {
    return this;
  }
  return this.set(function setValue(v /* , self */) {
    let value = [].concat(v);
    value = lodash.compact(value);
    return value;
  });
};

/**
 * Creates a duplicate-free version of an array
 *
 * ####Example:
 *
 *     var s = new Schema({ caps: { type: [String], duplicate: false }})
 *     var M = db.model('M', s);
 *     var m = new M({ caps: ['a', 'a', 'b', 'b']});
 *     console.log(m.caps) // 'a', 'b'
 *
 * @public
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @returns {object} valid mongoose validator
 */

SchemaArray.prototype.duplicate = function duplicate(shouldApply) {
  if (arguments.length > 0 && shouldApply && !lodash.isFunction(shouldApply)) {
    return this;
  }
  return this.set(function setValue(v /* , self */) {
    let value = [].concat(v);
    value = lodash.compact(value);
    value = lodash.isFunction(shouldApply)
      ? lodash.uniqWith(value, shouldApply)
      : lodash.uniq(value);
    return value;
  });
};

/**
 * Creates sorted array of elements
 *
 * ####Example:
 *
 *     var s = new Schema({ caps: { type: [String], sort: true }})
 *     var M = db.model('M', s);
 *     var m = new M({ caps: ['b', 'a', 'c', 'b']});
 *     console.log(m.caps) // 'a', 'b', 'c'
 *
 * @public
 * @see Customized Error Messages #error_messages_MongooseError-messages
 * @returns {object} valid mongoose validator
 */

SchemaArray.prototype.sort = function sort(shouldApply) {
  if (arguments.length > 0 && !shouldApply) {
    return this;
  }
  return this.set(function setValue(v, self = {}, schema = {}) {
    // prepare value
    let value = [].concat(v);
    value = lodash.compact(value);

    // ensure unique sortable
    const comparator = (schema.options || self.options || {}).sort;
    value = lodash.isFunction(comparator) ? lodash.uniqWith(value, comparator) : lodash.uniq(value);

    // sort value
    value = lodash.isString(shouldApply)
      ? lodash.orderBy(value, null, shouldApply)
      : lodash.orderBy(value);
    return value;
  });
};

module.exports = mongoose;
