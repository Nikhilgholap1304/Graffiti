import clone from 'lodash/clone';
import find from 'lodash/find';
import map from 'lodash/map';
import toUpper from 'lodash/toUpper';
import { uniq } from '@lykmapipo/common';
import { getStringSet, getCountryCode } from '@lykmapipo/env';

import { parsePhoneNumberByCountryCode } from './utils';

export * from './constants';

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
export const parsePhoneNumber = (phoneNumber, ...countryCode) => {
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
export const toE164 = (phoneNumber, countryCode) => {
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
