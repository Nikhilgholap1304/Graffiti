#### 0.7.16 (2021-09-06)

##### Documentation Changes

* **readme:**  update build status to travis.com ([ccc43a97](https://github.com/lykmapipo/phone/commit/ccc43a977bbbbf446a81d24c27c37c213e810e39))

#### 0.7.15 (2021-08-09)

##### Chores

* **deps:**  force latest version & audit fix ([9561be64](https://github.com/lykmapipo/phone/commit/9561be64919d1526f8ee3bca9a8b648e01ed590b))

#### 0.7.14 (2021-06-01)

##### Chores

* **deps:**  force latest version & audit fix ([98f973ba](https://github.com/lykmapipo/phone/commit/98f973ba11d605af92f39e62bf61e779daee5b3d))

#### 0.7.13 (2021-03-21)

#### 0.7.12 (2021-02-09)

#### 0.7.11 (2021-01-04)

##### Chores

* **deps:**  force latest version & audit fix ([be86f78e](https://github.com/lykmapipo/phone/commit/be86f78e37889641aadbd283b65bebe01e5bbce0))

#### 0.7.10 (2020-12-25)

##### Chores

* **deps:**  force latest version & audit fix ([564874a9](https://github.com/lykmapipo/phone/commit/564874a9b9eeda3866069533cac92a9c52ea8639))

#### 0.7.9 (2020-12-16)

##### Chores

* **deps:**  force latest version & audit fix ([dd1d02d8](https://github.com/lykmapipo/phone/commit/dd1d02d8a7ced65034a513f142bd9ead246ac844))

#### 0.7.8 (2020-12-05)

##### Chores

* **deps:**  force latest version & audit fix ([8896555c](https://github.com/lykmapipo/phone/commit/8896555cac6a9bc84ccc08c0070902056c5b3bb9))

#### 0.7.7 (2020-11-13)

##### Chores

* **deps:**  force latest version & audit fix ([0044b929](https://github.com/lykmapipo/phone/commit/0044b929094916858dd4f94efaffaf205b2a4066))

#### 0.7.6 (2020-10-05)

##### Chores

* **deps:**  force latest version & audit fix ([ffb24ce9](https://github.com/lykmapipo/phone/commit/ffb24ce9cb54f93914f6429836a0f94b97684f00))

#### 0.7.5 (2020-09-23)

#### 0.7.4 (2020-09-10)

##### Chores

* **deps:**  force latest version & audit fix ([51cdfce6](https://github.com/lykmapipo/phone/commit/51cdfce6a67e09dce2b3378e74cdc50a9659f697))

#### 0.7.3 (2020-09-02)

##### Chores

* **deps:**  force latest version & audit fix ([3aff29a5](https://github.com/lykmapipo/phone/commit/3aff29a5e17b8196f6078489bd62200952308367))

#### 0.7.2 (2020-08-19)

##### Chores

* **deps:**  force latest version & audit fix ([b3ce50af](https://github.com/lykmapipo/phone/commit/b3ce50af6cf85f93feeadb8e11ec3df72850bc8f))

#### 0.7.1 (2020-08-04)

##### Chores

* **deps:**  force latest version & audit fix ([6a85da48](https://github.com/lykmapipo/phone/commit/6a85da4810b67addde6b2a0352239d58865c1763))

#### 0.7.0 (2020-08-01)

##### Chores

* **deps:**
  *  force latest version & audit fix ([42966372](https://github.com/lykmapipo/phone/commit/429663724d3c391604d03671f7f21b9945efbec3))
  *  fix prototype pollution vulnerability in dot-prop ([1b141125](https://github.com/lykmapipo/phone/commit/1b14112588cc9bb6a0817f6f459aac250b8cbca3))
  *  force latest version & audit fix ([991b8c8a](https://github.com/lykmapipo/phone/commit/991b8c8a34e410ad48354b46ec6c6cc4cbb7c0e4))
  *  force latest version & audit fix ([35c5f245](https://github.com/lykmapipo/phone/commit/35c5f245c3da035615b66b348549852469a03cd3))
* **config:**  correct build external ([2be499fe](https://github.com/lykmapipo/phone/commit/2be499fec1fa3727cdde6267a2a09196267d5fae))

##### New Features

* **utils:**
  *  add type validity check ([104aac83](https://github.com/lykmapipo/phone/commit/104aac8323ecbc5a1012bfa332919cef87019652))
  *  add phone number formatters ([30648fdc](https://github.com/lykmapipo/phone/commit/30648fdc8b1aea43bc8383d032b856c387ef6eb2))
  *  add parse raw phone number ([23ca4d9d](https://github.com/lykmapipo/phone/commit/23ca4d9dddf2652954597d7a0abd4149101a030a))

##### Refactors

* **utils:**
  *  improve parsing by country code ([10c779b0](https://github.com/lykmapipo/phone/commit/10c779b081df2bc9c86cbb40686e97b6828dd2b6))
  *  rename format to applyFormats ([8e42c1b7](https://github.com/lykmapipo/phone/commit/8e42c1b72573ae26f0340e11e9a85c1cf1292785))
  *  rename checkValidity to checkTypes ([4d2d1777](https://github.com/lykmapipo/phone/commit/4d2d17775c33d2cdad7198aa819c66253d1e12fa))
*  slice parsePhoneNumber to utils ([ed184d87](https://github.com/lykmapipo/phone/commit/ed184d87230c5a8f5d432837f27479f764e21aaa))
*  extract constants from utils ([0a94d27b](https://github.com/lykmapipo/phone/commit/0a94d27bfede15c582325c55fae07bdfe7e25b61))
*  remove default exports & add utils ([64311a09](https://github.com/lykmapipo/phone/commit/64311a09c444583a5c08a500c2c6b305d57ee329))
*  use lodash specific imports ([ae0f2e48](https://github.com/lykmapipo/phone/commit/ae0f2e488b5e71d72308e7cde2d49edde7f05b3c))
*  remove underscore dangles ([e37cb02d](https://github.com/lykmapipo/phone/commit/e37cb02dbed1f0e13de2c5bb43ad3fd85a8c059f))
*  re-write use es6 ([3115a878](https://github.com/lykmapipo/phone/commit/3115a8787f5f9c9bb04461da293a6117f2d9a656))

##### Code Style Changes

*  improve jsdocs ([ea5ce8de](https://github.com/lykmapipo/phone/commit/ea5ce8de7a0753664ab2896f15db17ab5c27c500))
*  clear unused demarcations ([d9589a71](https://github.com/lykmapipo/phone/commit/d9589a7184335d5a0f2b51f4bf93a880316575e6))
*  add TYPES & FORMATS jsdocs ([e9997483](https://github.com/lykmapipo/phone/commit/e9997483a9a6124c358075391eeddbf4583dfd05))
*  improve jsdocs ([ea6e2097](https://github.com/lykmapipo/phone/commit/ea6e20973cfdc8ee00a6be29deb9162b01159f4d))

#### 0.6.11 (2020-07-20)

##### Chores

* **deps:**  force latest version & audit fix ([c5ebf2c1](https://github.com/lykmapipo/phone/commit/c5ebf2c1f8db164be0e27d05a4d2c959fca37836))

#### 0.6.10 (2020-07-12)

##### Chores

* **deps:**  force latest version & audit fix ([c090ef97](https://github.com/lykmapipo/phone/commit/c090ef9702f45d120ffd0654373bb24ffecd8382))

#### 0.6.9 (2020-07-08)

##### Chores

* **deps:**  force latest version & audit fix ([d4f3f058](https://github.com/lykmapipo/phone/commit/d4f3f0589d5caba2704a2367821cd3c0c20c1ceb))

#### 0.6.8 (2020-07-01)

##### Chores

* **deps:**  force latest version & audit fix ([b23b1c7e](https://github.com/lykmapipo/phone/commit/b23b1c7eed7753eb8518df3adb9c6e92026228a5))

#### 0.6.7 (2020-06-25)

##### Chores

* **deps:**  force latest version & audit fix ([8b25a65d](https://github.com/lykmapipo/phone/commit/8b25a65d9785173eabab7bc2626d3e20da7b0792))

#### 0.6.6 (2020-06-16)

##### Chores

* **deps:**  force latest version & audit fix ([111d779a](https://github.com/lykmapipo/phone/commit/111d779a29a485699af56245ddd21cbf9700f4c8))

#### 0.6.5 (2020-06-07)

##### Chores

* **deps:**  force latest version & audit fix ([afdd7243](https://github.com/lykmapipo/phone/commit/afdd7243abe7332d8b57861f347e397cf2be257e))

#### 0.6.4 (2020-05-29)

##### Chores

* **deps:**  force latest version & audit fix ([d85bfddc](https://github.com/lykmapipo/phone/commit/d85bfddcf617f4fe28339ed2bc6f6f94407bf817))

#### 0.6.3 (2020-05-14)

##### Chores

* **deps:**  force latest version & audit fix ([39ce236f](https://github.com/lykmapipo/phone/commit/39ce236f68ce81d3a9904716dee2b940cc15b97a))

#### 0.6.2 (2020-05-09)

##### Chores

* **deps:**  force latest version & audit fix ([a49a3922](https://github.com/lykmapipo/phone/commit/a49a3922e068fb79af252f96e38c22a9bb2105ec))

#### 0.6.1 (2020-05-01)

##### Chores

* **deps:**  force latest version & audit fix ([cfedba47](https://github.com/lykmapipo/phone/commit/cfedba478023dbce4473aa50872e3b19496a18b4))

#### 0.6.0 (2020-05-01)

##### Refactors

*  honor passed country codes on parsing ([04bd6d5b](https://github.com/lykmapipo/phone/commit/04bd6d5ba103deab29af478f272121d95025c56b))

#### 0.5.22 (2020-04-25)

##### Chores

* **deps:**  force latest version & audit fix ([da69a77a](https://github.com/lykmapipo/phone/commit/da69a77a251798f04e698c059941ad4982045f29))

#### 0.5.21 (2020-04-15)

##### Chores

* **deps:**  force latest version & audit fix ([58c9393f](https://github.com/lykmapipo/phone/commit/58c9393f58111ae6622efcff9d443d49e0acc1ab))

#### 0.5.20 (2020-03-30)

##### Chores

* **deps:**  force latest version & audit fix ([78a28fd0](https://github.com/lykmapipo/phone/commit/78a28fd027c6bede3fcc80295b70676401cba402))

#### 0.5.19 (2020-03-06)

##### Chores

* **deps:**  force latest version & audit fix ([634386c2](https://github.com/lykmapipo/phone/commit/634386c29ee88f95f391bb22274b96e522661a0a))

#### 0.5.18 (2020-02-28)

##### Chores

* **deps:**  force latest version & audit fix ([e1cf8aad](https://github.com/lykmapipo/phone/commit/e1cf8aad99dce70e47db905787b7f0d85acb40fe))

#### 0.5.17 (2020-02-16)

##### Chores

* **deps:**  force latest version & audit fix ([7c5230c4](https://github.com/lykmapipo/phone/commit/7c5230c4a177d928b8fff842f6366e831e7875e8))

#### 0.5.16 (2020-02-04)

##### Chores

* **deps:**  force latest version & audit fix ([3a1b1ee5](https://github.com/lykmapipo/phone/commit/3a1b1ee5834bce84da47bee63cd82ed0003af306))

#### 0.5.15 (2020-01-22)

##### Chores

* **deps:**  force latest version & audit fix ([3519920d](https://github.com/lykmapipo/phone/commit/3519920d1a87a985d1467ce6536e3d4337d86e92))

#### 0.5.14 (2020-01-16)

##### Chores

* **deps:**  force latest version & audit fix ([4def12d5](https://github.com/lykmapipo/phone/commit/4def12d5e20a423f4ace9799857c65cce52faac8))

#### 0.5.13 (2019-12-09)

##### Chores

* **deps:**  force latest version & audit fix ([dd7fd150](https://github.com/lykmapipo/phone/commit/dd7fd150b805163dcf623b77fb4a08d4b3156121))

#### 0.5.12 (2019-11-29)

##### Chores

* **deps:**  force latest version & audit fix ([49046ebe](https://github.com/lykmapipo/phone/commit/49046ebe11aa6f8083594e6d8c4ea64069058dfe))

#### 0.5.11 (2019-11-15)

##### Chores

* **deps:**  force latest version & audit fix ([77e01b23](https://github.com/lykmapipo/phone/commit/77e01b2341aa8633e81e207569fe1951c5637ceb))

#### 0.5.10 (2019-10-22)

##### Chores

* **deps:**  force latest version & audit fix ([a1bd82a0](https://github.com/lykmapipo/phone/commit/a1bd82a0f549055d970f6f415d1db69292e3955e))

#### 0.5.9 (2019-10-10)

##### Chores

* **deps:**  force latest version & audit fix ([c306d3c4](https://github.com/lykmapipo/phone/commit/c306d3c464df431bf4ae248d1eace15fe732bcce))

#### 0.5.8 (2019-09-24)

##### Chores

* **deps:**  force latest version & audit fix ([db2d38d2](https://github.com/lykmapipo/phone/commit/db2d38d2cb50dcdae8a12375d3a64a255dd2b1fe))

#### 0.5.7 (2019-09-16)

##### Chores

* **deps:**  force latest version & audit fix ([6728fed3](https://github.com/lykmapipo/phone/commit/6728fed3e6cf7760fec780dc7824a09cae6047fe))

#### 0.5.6 (2019-09-12)

##### Chores

* **deps:**  force latest version & audit fix ([5eedfc6e](https://github.com/lykmapipo/phone/commit/5eedfc6ec83164c8f4016697468d6a0265a0db40))

#### 0.5.5 (2019-08-28)

##### Chores

* **deps:**  force latest version & audit fix ([f462db78](https://github.com/lykmapipo/phone/commit/f462db780b69ccf486cf128054f39159aa09e5c3))

#### 0.5.4 (2019-08-13)

##### Chores

* **deps:**  force latest version & audit fix ([741c0b07](https://github.com/lykmapipo/phone/commit/741c0b0743cb3bc929befca85f64048260936b21))

#### 0.5.3 (2019-07-06)

##### Chores

* **deps:**  force latest version & audit fix ([98ccc688](https://github.com/lykmapipo/phone/commit/98ccc688c3fc5ecb2c4197c73be9fa5f56059731))

#### 0.5.2 (2019-06-27)

##### Chores

* **deps:**  force latest version & audit fix ([c453880c](https://github.com/lykmapipo/phone/commit/c453880c866c3b8823ba52621a91ef509afc9def))

#### 0.5.1 (2019-06-19)

##### Chores

* **deps:**  force latest version & audit fix ([399ef3c5](https://github.com/lykmapipo/phone/commit/399ef3c5f251be23fecd58773c9f5817e37ca97b))

#### 0.5.0 (2019-06-16)

##### New Features

*  add toE64 shortcut helper ([fa7fa34d](https://github.com/lykmapipo/phone/commit/fa7fa34dd92bcfa71da28062dd2e3c9d535022b4))

#### 0.4.2 (2019-06-16)

##### Chores

* **deps:**  force latest version & audit fix ([feb97dfc](https://github.com/lykmapipo/phone/commit/feb97dfc71127ab02ef6aea5da7839b4739d957b))

#### 0.4.1 (2019-06-14)

#### 0.4.0 (2019-06-14)

##### Bug Fixes

*  allow multi country code raw phone number parsing ([c59c0e43](https://github.com/lykmapipo/phone/commit/c59c0e43597c37dacb30391a145a5fd5b01de4b3))

#### 0.3.7 (2019-06-14)

##### Chores

* **deps:**  force latest version & audit fix ([9af0b727](https://github.com/lykmapipo/phone/commit/9af0b72716a3108e14e68fec1dd1d44b783f113c))

#### 0.3.6 (2019-06-09)

##### Chores

* **deps:**  force latest version & audit fix ([b3d50c53](https://github.com/lykmapipo/phone/commit/b3d50c532822d88c8d12a59ef29477cc38ec8d46))

#### 0.3.5 (2019-05-20)

##### Chores

* **deps:**  force latest version & audit fix ([fb1efe37](https://github.com/lykmapipo/phone/commit/fb1efe371561873f2a17837c0402f264a8ccc5d9))

#### 0.3.4 (2019-05-12)

##### Chores

* **deps:**  force latest version & audit fix ([22b77a08](https://github.com/lykmapipo/phone/commit/22b77a08497b1d44c5895a706d8389d1f66fe7c9))

#### 0.3.3 (2019-05-01)

##### Chores

* **ci:**  force latest nodejs ([b11c9b15](https://github.com/lykmapipo/phone/commit/b11c9b153103c2b94c36ec2166839b07de5cda37))
* **.npmrc:**  prevent npm version to commit and tag version ([6337e27c](https://github.com/lykmapipo/phone/commit/6337e27c1c85ef3b345f4207647e601c0b1dc10d))
* **deps:**  force latest version & audit fix ([b8abfd7f](https://github.com/lykmapipo/phone/commit/b8abfd7f948667067045b6f13949d3a0dd2d0a68))

#### 0.3.2 (2019-04-14)

##### Chores

*  force latest node for travis ([4cef15b0](https://github.com/lykmapipo/phone/commit/4cef15b051748e76f7d06677ff6d6f8fdbd890d3))
*  force latest dependencies ([fa4db04d](https://github.com/lykmapipo/phone/commit/fa4db04da7e3dd229cacd62203441a60172b2d0d))

##### Documentation Changes

*  add code of conduct and contributing guide ([d71cce21](https://github.com/lykmapipo/phone/commit/d71cce2143d125c8e8ee8b7f6e4f1ff4fc117f29))

