# SVGPack

[![npm version](https://img.shields.io/npm/v/svgpack.svg?style=flat-square)](https://www.npmjs.com/package/svgpack)
[![Build Status](https://img.shields.io/travis/blivesta/svgpack/master.svg?style=flat-square)](https://travis-ci.org/blivesta/svgpack)


> Generator for SVG sprite and icons preview.

## Example
- [flexicon](https://github.com/blivesta/flexicon)


## Install

```
$ npm install svgpack
```


## Usage

1.Create SVG files.
```
|-- svgpack.js
|-- svg
    |-- icon1.svg
    |-- icon2.svg
    |-- icon3.svg
    |-- icon4.svg
```

2.Create `input.js`
```js
var Svgpack = require('svgpack')

Svgpack = new Svgpack('./svg/*.svg', {
  // options...
})
```

3.Call the `svgpack`.
```
$ cd your-project
$ node svgpack.js
```

### Result

```
|-- input.js
|-- svgpack
    |-- index.html
    |-- svgpack.css
    |-- svgpack-sprite.svg
    |-- svgpack.json
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

### Markup example

```html
<head>
  <link rel="stylesheet" href="svgpack.css">
</head>
<body>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;"> <symbol id="fi-blivesta" viewBox="0 0 64 64"><g> <path d="M35.094 0l-15.97 15.965 15.97 15.963-16.037 16.037L35.094 64H64V0H35.094zm14.5 54.812l-8.07-8.062 8.07-8.066 8.062 8.066-8.062 8.062zm0-29.777l-8.07-8.062 8.07-8.064 8.062 8.06-8.062 8.06z"/> </g></symbol></svg>

  <svg class='fi'><use xlink:href='#fi-blivesta' /></svg>

</body>
```

if not use svg sprite.
```html
<head>
  <link rel="stylesheet" href="svgpack.css">
</head>
<body>
  <svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><path d='M35.094 0l-15.97 15.965 15.97 15.963-16.037 16.037L35.094 64H64V0H35.094zm14.5 54.812l-8.07-8.062 8.07-8.066 8.062 8.066-8.062 8.062zm0-29.777l-8.07-8.062 8.07-8.064 8.062 8.06-8.062 8.06z'/></svg>
</body>
```

### if using gulp.

```js
var gulp = require('gulp')
var Svgpack = require('svgpack')

gulp.task('default',function(){
  return Svgpack('./svg/*.svg', {
    // options...
  })
})
```


## Options
```js
{
  name: 'svgpack',   // icons name
  prefix: 'icon',       // prefix for css classes
  dist:'./svgpack',
  templates: {
    // templates path
    // default templates files ->
    // https://github.com/blivesta/svgpack/tree/master/templates
    sprite:'./your-project/template/svg/sprite.svg',
    css:'./your-project/template/css/svgpack.css',
    html:'./your-project/template/html/default.html',
  }
}
```

## Contributing

To contribute to SVGPack, clone this repo locally and commit your code.  
Please check that everything works before opening a pull-request.


## License
Released under the MIT license.
