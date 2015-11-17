# leancloudjs
Leancloud JavaScript SDK.

## Install

```
npm install leancloudjs
```

## Methods

### Leancloud

Initialize a instance of `Leancloud`.

+ options {Object}:
  + appId {String}: leancloud's application id, required
  + appKey {String}: leancloud's application key, required
  + timeout {Number}: Receive response timeout, default is `10000`ms
  + hostname {String}: leancloud hostname, default is `leancloud.cn`
  + version {String}: api version, default is `1.1`

#### Usage

```
const Leancloud = require('leancloudjs');
const cli = new Leancloud({
  appId: 'application id',
  appKey: 'application key'
});
```

### push

Call leancloud'push notification api.

+ data {Object}:
  + alert {String}: display message
  + badge {Number}: the number of new notifications
  + sound {String}: alert sound
+ channel {String}: who receive notification
+ deviceType {String}: ios or android
+ conditions {Object}:
  + valid {Boolean}: client is valid or not, default is `true`

#### Usage

```
cli.push({alert: 'test'}, 'channe', 'ios').then((rst) => {
  console.log(rst);
});
```

## TODOs

+ Support more leancloud apis.
