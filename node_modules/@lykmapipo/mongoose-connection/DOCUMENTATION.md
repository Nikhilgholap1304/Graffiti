#### enableDebug() 

Enable internal debug option






##### Examples

```javascript

enableDebug();
```


##### Returns


- `Void`



#### disableDebug() 

Disable internal debug option






##### Examples

```javascript

disableDebug();
```


##### Returns


- `Void`



#### isConnection(connection) 

Check value is valid connection instance




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| connection | `object`  | value to check | &nbsp; |




##### Examples

```javascript

isConnection('a');
// => false

isConnection(null);
// => false
```


##### Returns


- `boolean`  whether value is connection instance



#### isConnected() 

Check value is valid connection instance and is connected




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| connection&#x3D;mongoose.connection | `object`  | value to check | *Optional* |




##### Examples

```javascript

isConnected('a');
// => false

isConnected(null);
// => false
```


##### Returns


- `boolean`  whether value is connection instance and is connected



#### isConnectedOrConnecting() 

Check value is valid connection instance and is connected or connecting




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| connection&#x3D;mongoose.connection | `object`  | value to check | *Optional* |




##### Examples

```javascript

isConnectedOrConnecting('a');
// => false

isConnectedOrConnecting(null);
// => false
```


##### Returns


- `boolean`  whether value is connection instance and is connected or connecting



#### isSchema(schema) 

Check value is valid schema instance




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| schema | `object`  | value to check | &nbsp; |




##### Examples

```javascript

isSchema('a');
// => false

isSchema(schema);
// => true
```


##### Returns


- `boolean`  whether value is schema instance



#### isModel(model) 

Check value is valid model




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| model | `object`  | value to check | &nbsp; |




##### Examples

```javascript

isModel('a');
// => false

isModel(model);
// => true
```


##### Returns


- `boolean`  whether value is model instance



#### isQuery(query) 

Check value is valid query instance




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| query | `object`  | value to check | &nbsp; |




##### Examples

```javascript

isQuery('a');
// => false

isQuery(query);
// => true
```


##### Returns


- `boolean`  whether value is query instance



#### isAggregate(aggregate) 

Check value is valid aggregate instance




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| aggregate | `object`  | value to check | &nbsp; |




##### Examples

```javascript

isAggregate('a');
// => false

isAggregate(aggregate);
// => true
```


##### Returns


- `boolean`  whether value is aggregate instance



#### isInstance(instance) 

Check value is valid model instance




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| instance | `object`  | value to check | &nbsp; |




##### Examples

```javascript

isInstance('a');
// => false

isInstance(instance);
// => true
```


##### Returns


- `boolean`  whether value is model instance



#### modelNames([connection]) 

Obtain registered model names




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| connection | `object`  | valid connection or default | *Optional* |




##### Examples

```javascript

modelNames();
//=> ['User', ... ]

modelNames(connection);
//=> ['User', ... ]
```


##### Returns


- `Array.&lt;string&gt;`  set of register model names



#### createSubSchema(definition[, optns]) 

Create sub schema with sensible defaults




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| definition | `object`  | valid sub schema definition | &nbsp; |
| optns | `object`  | valid schema options | *Optional* |




##### Examples

```javascript

createSubSchema({ name: { type: String } });
// => Schema{ ... }

createSubSchema({ name: { type: String } }, { timestamps: true });
// => Schema{ ... }
```


##### Returns


- `object`  valid sub schema instance



#### createVarySubSchema(optns, paths) 

Create sub schema with variable paths




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `object`  | valid schema type options | &nbsp; |
| paths | `object`  | variable paths to include on schema | &nbsp; |




##### Examples

```javascript

const locale = createVarySubSchema({ type: String }, 'en', 'sw');
//=> Schema { ... }

const locale = createVarySubSchema(
 { type: String },
 { name: 'en': required: true },
 'sw'
);
//=> Schema { ... }
```


##### Returns


- `object`  valid mongoose schema



#### createSchema(definition[, optns, plugins]) 

Create schema with sensible default options and plugins




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| definition | `object`  | valid model schema definition | &nbsp; |
| optns | `object`  | valid schema options | *Optional* |
| plugins | `Function`  | valid plugins to apply | *Optional* |




##### Examples

```javascript

createSchema({ name: { type: String } });
// => Schema{ ... }

createSchema({ name: { type: String } }, { timestamps: false });
// => Schema{ ... }
```


##### Returns


- `object`  valid schema instance



#### model([modelName, schema, connection]) 

Obtain existing or register new model safely




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| modelName | `string`  | valid model name | *Optional* |
| schema | `object`  | valid schema instance | *Optional* |
| connection | `object`  | valid database connection or default | *Optional* |




##### Examples

```javascript

model('User');
// => User{ ... }

model('User', schema);
// => User{ ... }

model(null)
//=> undefined
```


##### Returns


- `object`  model or undefined



#### collectionNameOf([connection], modelName) 

Obtain collection name of provided model




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| connection | `object`  | valid connection or default | *Optional* |
| modelName | `string` `object`  | valid model or model name | &nbsp; |




##### Examples

```javascript

const collectionName = collectionNameOf('User');
//=> 'users'

const collectionName = collectionNameOf(User);
//=> 'users'
```


##### Returns


- `string`  underlying collection of the model



#### deleteModels([connection, models]) 

Safe delete given models




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| connection | `object`  | valid connection or default | *Optional* |
| models | `string`  | models or model names to remove | *Optional* |




##### Examples

```javascript

deleteModels('User', 'Invoice');
//=> delete given models

deleteModels(User, Invoice);
//=> delete given models

deleteModels();
//=> delete all models
```


##### Returns


- `object`  model connection or default



#### createModel(schema, options[, connection, plugins]) 

Create schema with sensible default options and plugins




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| schema | `object`  | valid model schema definition | &nbsp; |
| options | `object`  | valid model schema options | &nbsp; |
| options.modelName | `string`  | valid model name | &nbsp; |
| connection | `object`  | valid connection or default | *Optional* |
| plugins | `Function`  | list of valid plugins to apply | *Optional* |




##### Examples

```javascript

createModel({ name: { type: String } }, { modelName: 'User' });
// => User{ ... }

createModel({ name: { type: String } }, { modelName: 'User' }, autopopulate);
// => User{ ... }
```


##### Returns


- `object`  valid model instance



#### connect([url, done]) 

Open default connection




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url | `string`  | valid connection string. If not provided it will be obtained from process.env.MONGODB_URI or package name prefixed with<br>current execution environment name | *Optional* |
| done | `Function`  | a callback to invoke on success or failure | *Optional* |




##### Examples

```javascript

connect((error, connection) => { ... });

connect(url, (error, connection) => { ... });
```


##### Returns


- `Void`



#### disconnect([connection, done]) 

Close all connections




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| connection | `object`  | valid connection or default | *Optional* |
| done | `Function`  | a callback to invoke on success or failure | *Optional* |




##### Examples

```javascript

disconnect((error) => { ... });
```


##### Returns


- `Void`



#### create([instances]) 

Persist given model instances




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| instances | `object`  | model instances to persist | *Optional* |




##### Examples

```javascript

create(user, done);
create(user, profile, done);
create(user, profile, done);
```


##### Returns


- `Error`  null or error



#### syncIndexes([connection], done) 

Sync indexes in MongoDB to match, indexes defined in schemas




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| connection | `object`  | valid connection or default | *Optional* |
| done | `Function`  | a callback to invoke on success or failure | &nbsp; |




##### Examples

```javascript

syncIndexes(done);

syncIndexes(connection, done);
```


##### Returns


- `Error`  null or error



#### clear([connection, models]) 

Clear provided models or all if none given




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| connection | `object`  | valid connection or default | *Optional* |
| models | `string`  | model names to remove or default to all | *Optional* |




##### Examples

```javascript

clear(done);
clear('User', done);
clear('User', 'Profile', done);

clear(connection, done);
clear(connection, 'User', done);
```


##### Returns


- `Error`  null or error



#### drop([connection, done]) 

Delete the given connection database, including all collections, documents, and indexes




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| connection | `object`  | valid connection or default | *Optional* |
| done | `Function`  | a callback to invoke on success or failure | *Optional* |




##### Examples

```javascript

drop((error) => { ... });
```


##### Returns


- `Error`  null or error




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
