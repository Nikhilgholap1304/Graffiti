import validator from 'validator';
import mongoose from 'mongoose';

const MongooseError = mongoose.Error;
const SchemaNumber = mongoose.Schema.Types.Number;

/* custom validations error message */
MongooseError.messages.Number.numeric =
  '`{VALUE}` is not a valid numeric value for path `{PATH}`.';
MongooseError.messages.Number.integer =
  '`{VALUE}` is not a valid integer value for path `{PATH}`.';
MongooseError.messages.Number.float =
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
      options.message || message || MongooseError.messages.Number.numeric;
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
      options.message || message || MongooseError.messages.Number.integer;
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
      options.message || message || MongooseError.messages.Number.float;
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
