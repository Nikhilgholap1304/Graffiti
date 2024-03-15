import clone from 'lodash/clone';
import find from 'lodash/find';
import map from 'lodash/map';
import toUpper from 'lodash/toUpper';
import { sortedUniq, mergeObjects, tryCatch, uniq } from '@lykmapipo/common';
import { getCountryCode, getStringSet } from '@lykmapipo/env';
import camelCase from 'lodash/camelCase';
import forEach from 'lodash/forEach';
import merge from 'lodash/merge';
import toLower from 'lodash/toLower';
import { PhoneNumberType, PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import keys from 'lodash/keys';

/**
 * @constant
 * @name TYPES
 * @description Allowed phone number types
 * @type {Array}
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { TYPES, TYPE_MOBILE } from '@lykmapipo/phone';
 *
 * TYPES //=> [ 'MOBILE', ... ];
 * TYPE_MOBILE //=> 'MOBILE';
 */
const TYPES = sortedUniq(keys(PhoneNumberType));

// types
const TYPE_FIXED_LINE = 'FIXED_LINE';
const TYPE_FIXED_LINE_OR_MOBILE = 'FIXED_LINE_OR_MOBILE';
const TYPE_MOBILE = 'MOBILE';
const TYPE_PAGER = 'PAGER';
const TYPE_PERSONAL_NUMBER = 'PERSONAL_NUMBER';
const TYPE_PREMIUM_RATE = 'PREMIUM_RATE';
const TYPE_SHARED_COST = 'SHARED_COST';
const TYPE_TOLL_FREE = 'TOLL_FREE';
const TYPE_UAN = 'UAN';
const TYPE_UNKNOWN = 'UNKNOWN';
const TYPE_VOICEMAIL = 'VOICEMAIL';
const TYPE_VOIP = 'VOIP';

/**
 * @constant
 * @name FORMATS
 * @description Allowed phone number formats
 * @type {Array}
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { FORMATS, FORMAT_E164 } from '@lykmapipo/phone';
 *
 * FORMATS //=> [ 'E164', ... ];
 * FORMAT_E164 //=> 'E164';
 */
const FORMATS = sortedUniq(keys(PhoneNumberFormat));

// formats
const FORMAT_E164 = 'E164';
const FORMAT_INTERNATIONAL = 'INTERNATIONAL';
const FORMAT_NATIONAL = 'NATIONAL';
const FORMAT_RFC3966 = 'RFC3966';

/**
 * @name phoneNumberUtil
 * @function phoneNumberUtil
 * @description Internal instance of `PhoneNumberUtil`
 * @returns {object} Validity of `PhoneNumberUtil`
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @private
 * @example
 *
 * phoneNumberUtil.parseAndKeepRawInput('0715333777', 'TZ');
 */
const phoneNumberUtil = PhoneNumberUtil.getInstance();

/**
 * @name parseRawPhoneNumber
 * @function parseRawPhoneNumber
 * @description Attempt to parse given phone number
 * @param {string} phoneNumber Number that we are attempting to parse
 * @param {string} [countryCode] 2 or 3 letter ISO country code. Default to
 * `process.env.DEFAULT_COUNTRY_CODE` or `os country code`.
 * @returns {object} Validity of `PhoneNumberUtil`
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @private
 * @example
 *
 * parseRawPhoneNumber('+255715333777');
 * parseRawPhoneNumber('0715333777', 'TZ');
 */
const parseRawPhoneNumber = (
  phoneNumber,
  countryCode = getCountryCode()
) => {
  try {
    // try parse phone number
    const rawPhoneNumber = clone(phoneNumber);
    const rawCountryCode = clone(countryCode);
    const parsedPhoneNumber = phoneNumberUtil.parseAndKeepRawInput(
      rawPhoneNumber,
      rawCountryCode
    );
    return parsedPhoneNumber;
  } catch (e) {
    // fail to parse phone number
    return undefined;
  }
};

/**
 * @name formatPhoneNumber
 * @function formatPhoneNumber
 * @description Format phone number use given format
 * @param {object} phoneNumber Valid instance of parsed phone number
 * @param {string} [format] Valid phone number format
 * @returns {object} Formatted phone number
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @private
 * @example
 *
 * const phoneNumber = parseRawPhoneNumber('0715333777', 'TZ');
 * formatPhoneNumber(phoneNumber, FORMAT_E164);
 *
 * //=> result
 * {
 *   e164: '+255715333777'
 * }
 */
const formatPhoneNumber = (phoneNumber, format) => {
  try {
    // try format parsed phone number
    const phoneNumberFormat = toLower(format);
    const formattedPhoneNumber = phoneNumberUtil.format(
      phoneNumber,
      PhoneNumberFormat[format]
    );
    return { [phoneNumberFormat]: formattedPhoneNumber };
  } catch (e) {
    // fail to format phone number
    return {};
  }
};

/**
 * @name applyFormats
 * @function applyFormats
 * @description Format phone number using available phone number formats
 * @param {object} phoneNumber Instance of parsed phone number
 * @returns {object} Formatted phone number(s)
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.2.0
 * @private
 * @example
 *
 * const phoneNumber = parseRawPhoneNumber('0715333777', 'TZ');
 * applyFormats(phoneNumber);
 *
 * //=> result
 * {
 *  e164: '+255715333777',
 *  international: '+255 715 333 777',
 *  national: '0715 333 777',
 *  rfc3966: 'tel:+255-715-333-777'
 * }
 */
const applyFormats = (phoneNumber) => {
  // initialize formats
  let formats = {};

  // format phone number per each available format
  forEach(FORMATS, (phoneNumberFormat) => {
    const formattedPhoneNumber = formatPhoneNumber(
      phoneNumber,
      phoneNumberFormat
    );
    formats = mergeObjects(formats, formattedPhoneNumber);
  });

  // return formatted phone number
  return formats;
};

/**
 * @name checkTypes
 * @function checkTypes
 * @description Derive phone number type validity
 * @param {object} phoneNumber Instance of parsed phone number
 * @returns {object} Validities of a phone number
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @private
 * @example
 *
 * const phoneNumber = parseRawPhoneNumber('0715333777', 'TZ');
 * checkTypes(phoneNumber);
 *
 * //=> result
 * {
 *  isFixedLine: false,
 *  isMobile: true,
 *  isFixedLineOrMobile: false,
 *  isTollFree: false,
 *  isPremiumRate: false,
 *  isSharedCost: false,
 *  isVoip: false,
 *  isPersonalNumber: false,
 *  isPager: false,
 *  isUan: false,
 *  isVoicemail: false,
 *  isUnknown: false,
 *  type: 'MOBILE'
 * }
 */
const checkTypes = (phoneNumber) => {
  // initialize types validity
  const types = {};

  // obtain parsed phone number type
  const phoneNumberType = tryCatch(
    () => phoneNumberUtil.getNumberType(phoneNumber),
    -1
  );

  // type checker
  const checkType = (typeIndex, typeName) => {
    // derive type name and check phone number type
    const numberTypeName = camelCase(`is${typeName}`);
    const numberTypeIs = phoneNumberType === typeIndex;

    // set type is flag
    types[numberTypeName] = numberTypeIs;

    // set type name string
    if (numberTypeIs) {
      types.type = typeName;
    }
  };

  // check phone number type validity
  forEach(PhoneNumberType, checkType);

  // return types validity
  return types;
};

/**
 * @name parsePhoneNumberByCountryCode
 * @function parsePhoneNumberByCountryCode
 * @description Parse provided phone number to obtain its information
 * @param {string} phoneNumber Valid phone number
 * @param {...string} [countryCode] Valid country code(s) for validation. If
 * not provided `process.env.DEFAULT_COUNTRY_CODE` or `os country code` will
 * be used as a default
 * @returns {object | undefined} Parsed phone number or undefined
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @private
 * @static
 * @example
 *
 * const phoneNumber = parsePhoneNumberByCountryCode('+255715333777');
 * const phoneNumber = parsePhoneNumberByCountryCode('+255715333777', 'TZ');
 *
 * //=> result
 * {
 *  raw: '+255715333777',
 *  countryCode: 'TZ',
 *  callingCode: 255,
 *  extension: '',
 *  isValid: true,
 *  isPossible: true,
 *  isValidForCountryCode: true,
 *  isFixedLine: false,
 *  isMobile: true,
 *  type: 'MOBILE',
 *  isFixedLineOrMobile: false,
 *  isTollFree: false,
 *  isPremiumRate: false,
 *  isSharedCost: false,
 *  isVoip: false,
 *  isPersonalNumber: false,
 *  isPager: false,
 *  isUan: false,
 *  isVoicemail: false,
 *  isUnknown: false,
 *  e164: '+255715333777',
 *  international: '+255 715 333 777',
 *  national: '0715 333 777',
 *  rfc3966: 'tel:+255-715-333-777'
 * }
 */
const parsePhoneNumberByCountryCode = (phoneNumber, countryCode) => {
  // parse phone number
  try {
    const parsed = parseRawPhoneNumber(phoneNumber, countryCode);

    // prepare parse phone number result
    let phone = {};

    // set raw phone number
    phone.raw = phoneNumber;

    // set phone country code
    phone.countryCode =
      phoneNumberUtil.getRegionCodeForNumber(parsed) || countryCode;

    // set phone country calling code
    phone.callingCode = parsed.getCountryCodeOrDefault();

    // set phone number extension
    phone.extension = parsed.getExtensionOrDefault();

    // set phone number valid flag
    phone.isValid = phoneNumberUtil.isValidNumber(parsed);

    // set possible flag
    phone.isPossible = phoneNumberUtil.isPossibleNumber(parsed);

    // set is valid for country(or region) code
    phone.isValidForCountryCode = phoneNumberUtil.isValidNumberForRegion(
      parsed,
      phone.countryCode
    );

    // set phone number type flags
    phone = merge({}, phone, checkTypes(parsed));

    // format phone number in accepted formats
    phone = merge({}, phone, applyFormats(parsed));

    // add e164 format with no plus
    phone.e164NoPlus = phone.e164.replace(/\+/g, '');

    // return parsed phone number
    return phone;
  } catch (e) {
    // fail to parse phone number
    return undefined;
  }
};

/**
 * @name parsePhoneNumber
 * @function parsePhoneNumber
 * @description Parse provided phone number to obtain its information
 * @param {string} phoneNumber Valid phone number
 * @param {...string} [countryCode] Valid country code(s) for validation. If
 * not provided `process.env.DEFAULT_COUNTRY_CODE` or `os country code` will
 * be used as a default
 * @returns {object | undefined} Parsed phone number or undefined
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @static
 * @example
 *
 * import { parsePhoneNumber } from '@lykmapipo/phone';
 *
 * const phoneNumber = parsePhoneNumber('+255715333777');
 * const phoneNumber = parsePhoneNumber('+255715333777', 'TZ');
 *
 * //=> result
 * {
 *  raw: '+255715333777',
 *  countryCode: 'TZ',
 *  callingCode: 255,
 *  extension: '',
 *  isValid: true,
 *  isPossible: true,
 *  isValidForCountryCode: true,
 *  isFixedLine: false,
 *  isMobile: true,
 *  type: 'MOBILE',
 *  isFixedLineOrMobile: false,
 *  isTollFree: false,
 *  isPremiumRate: false,
 *  isSharedCost: false,
 *  isVoip: false,
 *  isPersonalNumber: false,
 *  isPager: false,
 *  isUan: false,
 *  isVoicemail: false,
 *  isUnknown: false,
 *  e164: '+255715333777',
 *  international: '+255 715 333 777',
 *  national: '0715 333 777',
 *  rfc3966: 'tel:+255-715-333-777'
 * }
 */
const parsePhoneNumber = (phoneNumber, ...countryCode) => {
  try {
    // ensure raw phone number
    const raw = clone(phoneNumber);

    // collect country codes
    let countryCodes = getStringSet('DEFAULT_COUNTRY_CODES', getCountryCode());
    countryCodes = uniq([...countryCode, ...countryCodes]);
    countryCodes = uniq(map(countryCodes, toUpper));

    // test parsing for provided country codes
    const phones = map(countryCodes, (givenCountryCode) =>
      parsePhoneNumberByCountryCode(raw, givenCountryCode)
    );

    // return valid parsed or any
    const phone = find(phones, { isValid: true });
    return phone;
  } catch (error) {
    // fail to parse phone number
    return undefined;
  }
};

/**
 * @name toE164
 * @function toE164
 * @description Format provided mobile phone number to E.164 format
 * @param {string} phoneNumber a mobile phone number to be formatted
 * @param {string} [countryCode] 2 or 3 letter ISO country code
 * @returns {string} E.164 formatted phone number without leading plus sign
 * @see {@link https://en.wikipedia.org/wiki/E.164|e.164}
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @static
 * @example
 *
 * import { toE164 } from '@lykmapipo/phone';
 *
 * const phoneNumber = toE164('0715333777');
 * const phoneNumber = toE164('0715333777', 'TZ');
 *
 * //=> result
 * 255715333777
 */
const toE164 = (phoneNumber, countryCode) => {
  // try convert give phone number to e.164
  try {
    const parsedNumber = parsePhoneNumber(phoneNumber, countryCode);
    if (parsedNumber && parsedNumber.e164NoPlus) {
      return parsedNumber.e164NoPlus;
    }
    return phoneNumber;
  } catch (error) {
    // fail to convert, return original format
    return phoneNumber;
  }
};

export { FORMATS, FORMAT_E164, FORMAT_INTERNATIONAL, FORMAT_NATIONAL, FORMAT_RFC3966, TYPES, TYPE_FIXED_LINE, TYPE_FIXED_LINE_OR_MOBILE, TYPE_MOBILE, TYPE_PAGER, TYPE_PERSONAL_NUMBER, TYPE_PREMIUM_RATE, TYPE_SHARED_COST, TYPE_TOLL_FREE, TYPE_UAN, TYPE_UNKNOWN, TYPE_VOICEMAIL, TYPE_VOIP, parsePhoneNumber, toE164 };
