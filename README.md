# [Flexicon Generator](http://blivesta.github.io/flexicon-generator)

[![npm version](https://img.shields.io/npm/v/flexicon-generator.svg?style=flat-square)](https://www.npmjs.com/package/flexicon-generator)
[![Build Status](https://img.shields.io/travis/blivesta/flexicon-generator/master.svg?style=flat-square)](https://travis-ci.org/blivesta/flexicon-generator)


> A Simple SVG Sprite Generator That Using a Nodejs.

## Install

```
$ npm install flexicon-generator
```


## Usage

1.Create SVG files
```
|-- flexicon-generator.js
|-- svg
    |-- icon1.svg
    |-- icon2.svg
    |-- icon3.svg
    |-- icon4.svg
```

2.Create `flexicon-generator.js`
```js
var FlexiconGenerator = require('flexicon-generator')

FlexiconGenerator = new FlexiconGenerator('./svg/*.svg', {
  // options...
})
```

3.Call the `flexicon-generator`
```
$ cd your-project
$ node flexicon-generator.js
```

### Result

```
|-- flexicon-generator.js
|-- flexicon
    |-- index.html
    |-- flexicon.css
    |-- flexicon-sprite.svg
    |-- flexicon.json
    |-- data
        |-- icon1.json
        |-- icon2.json
        |-- icon3.json
        |-- icon4.json
    |-- svg
        |-- icon1.svg
        |-- icon2.svg
        |-- icon3.svg
        |-- icon4.svg
|-- svg
    |-- icon1.svg
    |-- icon2.svg
    |-- icon3.svg
    |-- icon4.svg
```

if you are using gulp

```js
var gulp = require('gulp')
var flexiconGenerator = require('flexicon-generator')

gulp.task('default',function(){
  return flexiconGenerator('./svg/*.svg', {
    // options...
  })
})
```


## Options
```js
{
  name: 'flexicon',   // icons name
  prefix: 'fi',       // prefix for css classes
  dist:'./flexicon',
  templates: {
    // templates path
    // default templates files ->
    // https://github.com/blivesta/flexicon-generator/tree/master/templates
    sprite:'./your-project/template/svg/sprite.svg',
    css:'./your-project/template/css/flexicon.css',
    html:'./your-project/template/html/default.html',
  }
}
```

## Contributing

To contribute to flexicon-generator, clone this repo locally and commit your code.  
Please check that everything works before opening a pull-request.


## License
Released under the MIT license.
