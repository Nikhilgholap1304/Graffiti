#### isNotValue(value) 

Check if variable has no associated state or has empty state




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value |  | variable to check | &nbsp; |




##### Examples

```javascript

const notValue = isNotValue('a');
// => false

const notValue = isNotValue(null);
// => true
```


##### Returns


- `boolean`  whether variable contain state



#### isValue(value) 

Check if variable has associated state or has no empty state




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value |  | variable to check | &nbsp; |




##### Examples

```javascript

const notValue = isValue('a');
// => true

const notValue = isValue(null);
// => false
```


##### Returns


- `boolean`  whether variable contain state



#### firstValue(values) 

Obtain first valid value




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| values |  | list of values | &nbsp; |




##### Examples

```javascript

firstValue('a', 'b');
// => 'a'

firstValue(undefined, 'b');
// => 'b'
```


##### Returns


-  first valid value



#### copyOf(value) 

Recursively clone a value




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value |  | valid value to clone | &nbsp; |




##### Examples

```javascript

const copy = copyOf('a');
// => 'a'

const copy = copyOf({ 'a': 1 });
// => { 'a': 1 }
```


##### Returns


-  cloned value



#### mapToUpper(values) 

Convert list of values to upper values




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| values | `string`  | list to convert to upper | &nbsp; |




##### Examples

```javascript

const mapToUpper = mapToUpper('a');
// => ['A']

const mapToUpper = mapToUpper(['a', 'b'], 'c');
// => ['A', 'B', 'C']
```


##### Returns


- `Array.&lt;string&gt;`  list of upper values



#### mapToLower(values) 

Convert list of values to lower values




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| values | `string`  | list to convert to lower | &nbsp; |




##### Examples

```javascript

const mapToLower = mapToLower('A');
// => ['a']

const mapToLower = mapToLower(['A', 'B'], 'C');
// => ['a', 'b', 'c']
```


##### Returns


- `Array.&lt;string&gt;`  list of lower values



#### areNotEmpty(values) 

Check if provided values are not empty




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| values | `string`  | set of values to check for emptiness | &nbsp; |




##### Examples

```javascript

const notEmpty = areNotEmpty('a', 'b', 'c');
// => true

const notEmpty = areNotEmpty('a', 'b', null);
// => false
```


##### Returns


- `boolean`  whether values are not empty



#### compact(value) 

Creates new array(or object) with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `Array` `object`  | The array(or object) to compact. | &nbsp; |




##### Examples

```javascript

const b = compact([null, 1, "", undefined]);
// => [ 1 ]

const y = compact({a: 1, b: "", c: undefined});
// => { a: 1 }
```


##### Returns


- `object` `Array`  new array(or object) of filtered values.



#### uniq(value) 

Creates new duplicate-free version of array(or object).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `Array` `object`  | The array(or object) to inspect. | &nbsp; |




##### Examples

```javascript

const b = uniq([null, 1, 1, "", undefined, 2]);
// => [ 1, 2 ]

const y = uniq({a: 1, b: "", c: undefined});
// => { a: 1 }
```


##### Returns


- `object` `Array`  new duplicate free array(or object).



#### sortedUniq(value) 

Creates new duplicate-free version of sorted array(or object).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `Array` `object`  | The array(or object) to inspect. | &nbsp; |




##### Examples

```javascript

const b = sortedUniq([null, 1, 2, "", undefined, 1]);
// => [ 1, 2 ]

const y = sortedUniq({a: 1, b: "", c: undefined});
// => { a: 1 }
```


##### Returns


- `object` `Array`  new duplicate free sorted array(or object).



#### assign([object&#x3D;{}], objects) 

Assign a list of objects into a single object 
**Note:** This method mutates `object`.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| object&#x3D;{} | `object`  | destination object | *Optional* |
| objects | `object`  | list of objects | &nbsp; |




##### Examples

```javascript

const obj = { a: 1 };
assign(obj, { b: 1 }, { c: 2});
// => { a: 1, b: 1, c: 2 }
```


##### Returns


- `object`  a merged object



#### mergeObjects(objects) 

Merge a list of objects into a single object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| objects | `object`  | list of objects | &nbsp; |




##### Examples

```javascript

const obj = mergeObjects({ a: 1 }, { b: 1 }, { c: 2}, { c: 2}, {b: null})
// => { a: 1, b: 1, c: 2 }
```


##### Returns


- `object`  a merged object



#### safeMergeObjects(objects) 

Merge a list of objects into a single object without cloning sources




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| objects | `object`  | list of objects | &nbsp; |




##### Examples

```javascript

const obj = safeMergeObjects({ a: 1 }, { b: 1 }, { c: 2}, { c: 2}, {b: null})
// => { a: 1, b: 1, c: 2 }
```


##### Returns


- `object`  a merged object



#### pkg([path], field) 

Read package information




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `string`  | valid path to package.json file | *Optional* |
| field | `string`  | fields to pick from package | &nbsp; |




##### Examples

```javascript

const { name, version } = pkg();
// => { name: ..., version: ...}

const { name, version } = pkg(__dirname);
// => { name: ..., version: ...}
```


##### Returns


- `object`  current process package information



#### scopesFor(resources) 

Generate resource scopes




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| resources | `string`  | valid resources | &nbsp; |




##### Examples

```javascript

const scopes = scopesFor('user')
// => ['user:create', 'user:view']
```


##### Returns


- `Array.&lt;string&gt;`  resources scopes



#### permissionsFor(resources) 

Generate resource permissions




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| resources | `string`  | valid resources | &nbsp; |




##### Examples

```javascript

const permissions = permissionsFor('User')
// => [{resource: 'User', wildcard: 'user:create', action: ...}, ....];
```


##### Returns


- `Array.&lt;object&gt;`  resources permissions



#### abbreviate(words) 

Generate shortened form of word(s) or phrase.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| words | `string`  | set of words to derive abbreaviation | &nbsp; |




##### Examples

```javascript

const abbreaviation = abbreviate('Ministry of Finance')
// => MoF
```


##### Returns


- `string`  abbreviation



#### idOf(data) 

Obtain an id or a given object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `object`  | object to pick id from | &nbsp; |




##### Examples

```javascript

const id = idOf({ id: 1 })
// => 1

const id = idOf({ _id: 1 })
// => 1
```


##### Returns


-  id of a given object



#### variableNameFor(names) 

Produce camelize variable name based on passed strings




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| names | `string`  | list of strings to produce variable name | &nbsp; |




##### Examples

```javascript

const name = variableNameFor('get', 'name');
// => getName

const name = variableNameFor('pick', 'a', 'name');
// => pickAName
```


##### Returns


- `string`  camelized variable name



#### has(collection, value) 

Check if value is in a collection




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| collection | `Array`  | The collection to inspect. | &nbsp; |
| value |  | The value to search for. | &nbsp; |




##### Examples

```javascript

const hasValue = has([ 1, 2 ], 1);
// => true

const hasValue = has([ 'a', 'b' ], 'c');
// => false
```


##### Returns


- `boolean`  whether value is in collection



#### hasAll(collection, values) 

Check if all value are in a collection




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| collection | `Array`  | The collection to inspect. | &nbsp; |
| values |  | The values to search for. | &nbsp; |




##### Examples

```javascript

const hasValues = hasAll([ 1, 2 ], 1, 2);
// => true

const hasValues = hasAll([ 1, 2 ], [ 1, 2 ]);
// => true

const hasValues = hasAll([ 'a', 'b' ], 'c', 'd');
// => false
```


##### Returns


- `boolean`  whether values are in collection



#### hasAny(collection, values) 

Check if any value is in a collection




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| collection | `Array`  | The collection to inspect. | &nbsp; |
| values |  | The values to search for. | &nbsp; |




##### Examples

```javascript

const hasValues = hasAny([ 1, 2 ], 1, 2);
// => true

const hasValues = hasAny([ 1, 2 ], [ 1, 2 ]);
// => true

const hasValues = hasAny([ 'a', 'b' ], 'b', 'd');
// => true

const hasValues = hasAny([ 'a', 'b' ], 'c', 'd');
// => false
```


##### Returns


- `boolean`  whether any value is in collection



#### normalizeError(error[, options]) 

Normalize error instance with name, code, status and message. 
**Note:** This method mutates `object`.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| error | `Error`  | valid error instance | &nbsp; |
| options | `object`  | additional convert options | *Optional* |
| options.name&#x3D;Error | `string`  | default error name | *Optional* |
| options.code&#x3D;500 | `string`  | default error code | *Optional* |
| options.status&#x3D;500 | `string`  | default error status | *Optional* |
| options.message&#x3D;500 | `string`  | default error message | *Optional* |




##### Examples

```javascript

const body = normalizeError(new Error('Missing API Key'));
// => error.status = 500;
```


##### Returns


- `Error`  normalized error object



#### bagify(errors) 

Normalize errors bag to light weight object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| errors | `object`  | valid errors bag | &nbsp; |




##### Examples

```javascript

const body = bagify({name : new Error('Validation Error') });
// => { name: { name: 'Error', message: 'Name Required'}, ... }
```


##### Returns


- `object`  formatted errors bag



#### mapErrorToObject(error[, options]) 

Convert error instance to light weight object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| error | `Error`  | valid error instance | &nbsp; |
| options | `object`  | additional convert options | *Optional* |
| options.name&#x3D;Error | `string`  | default error name | *Optional* |
| options.code&#x3D;500 | `string`  | default error code | *Optional* |
| options.stack&#x3D;false | `string`  | whether to include error stack | *Optional* |
| options.status&#x3D;500 | `string`  | default error status | *Optional* |




##### Examples

```javascript

const body = mapErrorToObject(new Error('Missing API Key'));
// => { name:'Error', message: 'Missing API Key', ... }
```


##### Returns


- `object`  formatted error object



#### osInfo() 

Obtain operating system information






##### Examples

```javascript

const info = osInfo();
// => { arch:'x64', ... }
```


##### Returns


- `object`  os information object



#### processInfo() 

Obtain current process information






##### Examples

```javascript

const info = processInfo();
// => { pid: 8989, ... }
```


##### Returns


- `object`  current process information



#### randomColor([optns]) 

Generating attractive random colors




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `object`  | valid generator options | *Optional* |
| optns.luminosity&#x3D;light | `string`  | controls the luminosity of the generated color. you can specify a string containing `bright`, `light` or<br>`dark`. | *Optional* |




##### Examples

```javascript

const color = randomColor();
// => #C349D8
```


##### Returns


- `string`  random color



#### formatDate([date&#x3D;new, format&#x3D;&#x27;YYYY-MM-DD&#x27;]) 

Format a date using specified format




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| date&#x3D;new | `Date`  | Date()] valid date instance | *Optional* |
| format&#x3D;&#x27;YYYY-MM-DD&#x27; | `string`  | valid date format | *Optional* |




##### Examples

```javascript

const date = formatDate(new Date(), 'YYYY-MM-DD');
// => 2019-05-30
```


##### Returns


- `string`  formatted date string



#### parseDate(date[, format&#x3D;&#x27;YYYY-MM-DD&#x27;]) 

Parse a date in UTC from specified format




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| date | `string`  | valid date string | &nbsp; |
| format&#x3D;&#x27;YYYY-MM-DD&#x27; | `string`  | valid date format | *Optional* |




##### Examples

```javascript

const date = parseDate('2019-05-30', 'YYYY-MM-DD');
// => Thu May 30 2019 ...
```


##### Returns


- `string`  parsed date object in UTC



#### hashOf(object[, ignore]) 

Generate hash of provided object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| object | `object`  | valid object to hash | &nbsp; |
| ignore | `string`  | properties to ignore | *Optional* |




##### Examples

```javascript

const hash = hashOf({ foo: 'bar' })
// => '67b69634f9880a282c14a0f0cb7ba20cf5d677e9'
```


##### Returns


- `string`  valid object hash



#### parseTemplate(template, data) 

Parse, format and render string based template




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| template | `string`  | valid template | &nbsp; |
| data | `object`  | object valid object apply on template | &nbsp; |




##### Examples

```javascript

const template = 'Hello {name}, you have {count} unread messages';
const formatted = parseTemplate(template, { name: 'John', count: 12 });
// => 'Hello John, you have 12 unread messages'
```


##### Returns


- `string`  formatted string



#### stripHtmlTags(html) 

Strip HTML tags from a string




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| html | `string`  | valid html string | &nbsp; |




##### Examples

```javascript

const html = 'lorem ipsum <strong>dolor</strong> <em>sit</em> amet';
const formatted = stripHtmlTags(html);
// => 'lorem ipsum dolor sit amet'
```


##### Returns


- `string`  string with no html tags



#### stringify(value) 

Safely converts a given value to a JSON string




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value |  | valid value | &nbsp; |




##### Examples

```javascript

const value = { x: 5, y: 6 };
const string = stringify(value);
// => '{"x":5,"y":6}'
```


##### Returns


- `string`  JSON string of a value



#### parse(value) 

Safely parses a JSON string to a value




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `string`  | JSON string of a value | &nbsp; |




##### Examples

```javascript

const string = '{"x":5,"y":6}';
const value = parse(value);
// => { x: 5, y: 6 }
```


##### Returns


-  valid value



#### pluralize(value) 

Convert a given string value to its plural form




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `string`  | subject value | &nbsp; |




##### Examples

```javascript

pluralize('person');
// => people

pluralize('Hat');
// => Hats
```


##### Returns


- `string`  plural form of provided string



#### singularize(value) 

Convert a given string value to its singular form




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `string`  | subject value | &nbsp; |




##### Examples

```javascript

singularize('people');
// => person

singularize('Hats');
// => Hat
```


##### Returns


- `string`  singular form of provided string



#### autoParse(value[, fields]) 

Safely auto parse a given value to js object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value |  | subject to parse | &nbsp; |
| fields | `string`  | subject fields to apply auto parse | *Optional* |




##### Examples

```javascript

autoParse('5');
// => 5

autoParse('{"x":5,"y":6}');
// => { x: 5, y: 6 }

autoParse({ a: '5', b: '6' }, 'a'))
// => { a: 5, b: '6' }
```


##### Returns


-  valid js object



#### flat(value) 

Flatten a nested object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `object`  | valid object to flatten | &nbsp; |




##### Examples

```javascript

const value = { a: { b: { c: 2 } } };
flat(value);
// => { 'a.b.c': 2 }
```


##### Returns


- `object`  flatten object



#### unflat(value) 

Unflatten object to nested object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `object`  | valid object to un flatten | &nbsp; |




##### Examples

```javascript

const value = { 'a.b.c': 2 };
unflat(value);
// => { a: { b: { c: 2 } } };
```


##### Returns


- `object`  nested object



#### join(values[, separator&#x3D;&#x27;,, property]) 

Converts array values into a string separated by separator




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| values | `Array.<string>`  | list to convert to string | &nbsp; |
| separator&#x3D;&#x27;, | `string`  | '] valid separator | *Optional* |
| property | `string`  | property to pick when value is object | *Optional* |




##### Examples

```javascript

const join = join('a');
// => 'a'

const join = join(['a', 'b']);
// => 'a, b, c'

* const join = join([{ a: 'c' }, 'b'], ', ', 'c');
// => 'c, b'
```


##### Returns


- `string`  joined values



#### transform(vals[, transformers]) 

Preprocess given values according to provided transformers




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| vals |  | value to be convert | &nbsp; |
| transformers | `Function`  | iteratee function which receive result `value` to be transformed | *Optional* |




##### Examples

```javascript

const transform = transform(['a']);
// => ['a']

const transform = transform([1, '2'], _.toNumber);
// => [1, 2]
```


##### Returns


-  resulted value



#### arrayToObject(array[, transformer]) 

Converts array values into an object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| array | `Array.<string>`  | array to convert to object | &nbsp; |
| transformer | `Function`  | iteratee function which receive result `object` and current `key` to be transformed | *Optional* |




##### Examples

```javascript

const arrayToObject = arrayToObject(['a']);
// => { a: 'a' }

const arrayToObject = arrayToObject(['a', 'b']);
// => { a: 'a', b: 'b' }
```


##### Returns


- `object`  resulted object or empty



#### parseMs(ms) 

Safely parse a given millisecond absolute value into js object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| ms | `number`  | valid millisecond value | &nbsp; |




##### Examples

```javascript

parseMs(1337000001);
// => {
    days: 15,
    hours: 11,
    minutes: 23,
    seconds: 20,
    milliseconds: 1,
    microseconds: 0,
    nanoseconds: 0,
  }
```


##### Returns


- `object`  valid js object



#### wrapCallback(cb[, defaultArgs]) 

Wrap callback with default args




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| cb | `Function`  | valid function to wrap | &nbsp; |
| defaultArgs | `object`  | default arguments to wrapped function | *Optional* |




##### Examples

```javascript

wrapCallback(cb, defaults);
// => fn
```


##### Returns


- `Function`  wrapped function.



#### classify(value) 

Convert a given string value to its class name form




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `string`  | subject value | &nbsp; |




##### Examples

```javascript

classify('Health Center');
// => HealthCenter
```


##### Returns


- `string`  plural form of provided string



#### tryCatch(func, defaultValue) 

Attempts to invoke `func`, returning either the result or `defaultValue` on error




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| func | `Function`  | The function to attempt. | &nbsp; |
| defaultValue |  | value to return on error | &nbsp; |




##### Examples

```javascript

tryCatch(() => 1, 0);
//=> 1

tryCatch(() => { throw new Error('Failed'); }, {});
// => {}
```


##### Returns


-  `func` result or `defaultValue`.




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
