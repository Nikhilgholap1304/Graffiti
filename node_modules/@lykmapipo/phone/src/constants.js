import keys from 'lodash/keys';
import { PhoneNumberFormat, PhoneNumberType } from 'google-libphonenumber';
import { sortedUniq } from '@lykmapipo/common';

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
export const TYPES = sortedUniq(keys(PhoneNumberType));

// types
export const TYPE_FIXED_LINE = 'FIXED_LINE';
export const TYPE_FIXED_LINE_OR_MOBILE = 'FIXED_LINE_OR_MOBILE';
export const TYPE_MOBILE = 'MOBILE';
export const TYPE_PAGER = 'PAGER';
export const TYPE_PERSONAL_NUMBER = 'PERSONAL_NUMBER';
export const TYPE_PREMIUM_RATE = 'PREMIUM_RATE';
export const TYPE_SHARED_COST = 'SHARED_COST';
export const TYPE_TOLL_FREE = 'TOLL_FREE';
export const TYPE_UAN = 'UAN';
export const TYPE_UNKNOWN = 'UNKNOWN';
export const TYPE_VOICEMAIL = 'VOICEMAIL';
export const TYPE_VOIP = 'VOIP';

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
export const FORMATS = sortedUniq(keys(PhoneNumberFormat));

// formats
export const FORMAT_E164 = 'E164';
export const FORMAT_INTERNATIONAL = 'INTERNATIONAL';
export const FORMAT_NATIONAL = 'NATIONAL';
export const FORMAT_RFC3966 = 'RFC3966';
