
zepto-browserify
------

> Since Zepto does not provide npm package officially, here's my personal copy of Zepto.
  Goto Zepto's home page for docs: http://zeptojs.com/
  Read more about it in official repo: https://github.com/madrobby/zepto

This package is based on [components/zepto](https://github.com/components/zepto).

Current version of Zepto: `1.1.6`.

Version of this repo: `1.1.6-1`.

See official releases: https://github.com/madrobby/zepto/releases

### Usage

```text
npm install --save zepto-browserify
```

```js
$ = require('zepto-browserify').$
Zepto = require('zepto-browserify').Zepto
$ === Zepto // => true
```

### Changes from Zepto

Changes I made at line `886`:

```js
window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)

// Added by github/jiyinyiyong to create an npm package
exports.Zepto = window.Zepto
exports.$ = window.$
```

### License

MIT https://github.com/madrobby/zepto/blob/225f93e3dcbd6bfb433267e157a744c02176516c/MIT-LICENSE
