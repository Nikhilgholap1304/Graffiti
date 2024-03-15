# mongoose-valid8

[![Build Status](https://app.travis-ci.com/lykmapipo/mongoose-valid8.svg?branch=master)](https://app.travis-ci.com/lykmapipo/mongoose-valid8)
[![Dependencies Status](https://david-dm.org/lykmapipo/mongoose-valid8.svg)](https://david-dm.org/lykmapipo/mongoose-valid8)
[![Coverage Status](https://coveralls.io/repos/github/lykmapipo/mongoose-valid8/badge.svg?branch=master)](https://coveralls.io/github/lykmapipo/mongoose-valid8?branch=master)
[![GitHub License](https://img.shields.io/github/license/lykmapipo/mongoose-valid8)](https://github.com/lykmapipo/mongoose-valid8/blob/master/LICENSE)

[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![npm version](https://img.shields.io/npm/v/mongoose-valid8)](https://www.npmjs.com/package/mongoose-valid8)

Additional mongoose schema validations.

## Requirements

- [NodeJS v13+](https://nodejs.org)
- [Npm v6.12+](https://www.npmjs.com/)
- [MongoDB v4+](https://www.mongodb.com/)
- [Mongoose v5.7+](https://github.com/Automattic/mongoose)

## Installation

```sh
npm install mongoose mongoose-valid8 --save
```

## Usage

```javascript
import mongoose from 'mongoose'
import 'mongoose-valid8'
import {model, Schema} from 'mongoose'

const User = model('User', new Schema({
  email: {
    type: String,
    email: true
  }
}));

const user = new User({ email: 'invalidemail' });

user.validate((error) => {
  expect(error).to.exist;
});

user.save((error) => {
  expect(error).to.exist;
});
```

## Validations

## String


### `email: Boolean`
When set to `true` force value to be valid email address.
```js
new Schema({
  email: {
    type: String,
    email: true
  }
});
```

### `capitalize: Boolean`
When set to `true` it converts the first character of string to upper case and the remaining to lower case.
```js
new Schema({
  firstName: {
    type: String,
    capitalize: true
  }
});
```

### `startcase: Boolean`
When set to `true` converts string to start case(or title case).
```js
new Schema({
  name: {
    type: String,
    startcase: true
  }
});
```


### `macaddress: Boolean`
When set to `true` force value to be valid macaddress.
```js
new Schema({
  address: {
    type: String,
    macaddress: true
  }
});
```

### `ip: Boolean`
When set to `true` force value to be valid ip address.
```js
new Schema({
  address: {
    type: String,
    ip: true
  }
});
```

### `fqdn: Boolean`
When set to `true` force value to be valid full qualified domain name.
```js
new Schema({
  address: {
    type: String,
    fqdn: true
  }
});
```

### `alpha: Boolean`
When set to `true` force value to only contain alpha.
```js
new Schema({
  address: {
    type: String,
    alpha: true
  }
});
```

### `alphanumeric: Boolean`
When set to `true` force value to contain only alphanumeric.
```js
new Schema({
  address: {
    type: String,
    aphanumeric: true
  }
});
```

### `md5: Boolean`
When set to `true` force value to be valid md5 hash.
```js
new Schema({
  hash: {
    type: String,
    md5: true
  }
});
```

### `uuid: Boolean`
When set to `true` force value to be valid uuid.
```js
new Schema({
  oid: {
    type: String,
    uuid: true
  }
});
```

### `creditcard: Boolean`
When set to `true` force value to be valid credit card.
```js
new Schema({
  card: {
    type: String,
    creditcard: true
  }
});
```

### `base64: Boolean`
When set to `true` force value to be valid base64 content.
```js
new Schema({
  url: {
    type: String,
    base64: true
  }
});
```

### `datauri: Boolean`
When set to `true` force value to be valid data uri.
```js
new Schema({
  url: {
    type: String,
    datauri: true
  }
});
```

### `phone: Object|Boolean`
When `set` it force value to be valid phone number.
```js
new Schema({
  phoneNumber: {
    type: String,
    phone: true
  }
});

new Schema({
  phoneNumber: {
    type: String,
    phone: {
      countries: ['TZ', 'US'],
      e164: true
    }
  }
});

new Schema({
  phoneNumber: {
    type: String,
    phone: {
      mobile: true,
      e164: true
    }
  }
});

new Schema({
  phoneNumber: {
    type: String,
    phone: {
      fixedline: true
    }
  }
});
```

### `mimetype: Boolean`
When set to `true` force value to be mime type value.
```js
new Schema({
  mime: {
    type: String,
    mimetype: true
  }
});
```

### `url: Boolean`
When set to `true` force value to be valid url.
```js
new Schema({
  address: {
    type: String,
    url: true
  }
});
```

### `jwt: Boolean`
When set to `true` force value to be valid json web token.
```js
new Schema({
  address: {
    type: String,
    jwt: true
  }
});
```

### `hexadecimal: Boolean`
When set to `true` force value to be valid hexadecimal value.
```js
new Schema({
  address: {
    type: String,
    hexadecimal: true
  }
});
```

### `hexacolor: Boolean`
When set to `true` force value to be valid hexacolor value.
```js
new Schema({
  address: {
    type: String,
    hexacolor: true
  }
});
```

## Number

### `numeric: Boolean`
When set to `true` force value to be numeric.
```js
new Schema({
  value: {
    type: Number,
    numeric: true
  }
});
```

### `integer: Boolean`
When set to `true` force value to be integer.
```js
new Schema({
  step: {
    type: Number,
    integer: true
  }
});
```

### `float: Boolean`
When set to `true` force value to float.
```js
new Schema({
  price: {
    type: Number,
    float: true
  }
});
```

## Array

### `empty: Boolean` 
When set to `false` force non empty array value.
```js
new Schema({
  email: {
    type: [String],
    empty: false
  }
});
```

### `compact: Boolean` 
When set to `true` will remove falsey values.
```js
new Schema({
  email: {
    type: [String],
    compact: true
  }
})
```

### `duplicate: Boolean|Function` 
When set to `false` or `comparator` will remove duplicate values.
```js
new Schema({
  to: {
    type: [String],
    duplicate: false
  }
})

or

new Schema({
  to: {
    type: [String],
    duplicate: (a, b) => a === b
  }
})

```

### `sort: Boolean|String` 
When set to `true`, `asc` or `desc` create sorted elements.
```js
new Schema({
  to: {
    type: [String],
    sort: false
  }
})

or

new Schema({
  to: {
    type: [String],
    sort: 'desc'
  }
})

```

## Testing

- Clone this repository

- Install all development dependencies

```sh
npm install
```

- Run example

```sh
npm run dev
```

- Then run test

```sh
npm test
```

## Contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## License

The MIT License (MIT)

Copyright (c) CodeTanzania & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
