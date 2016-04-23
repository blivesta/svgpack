# SVGPack

[![npm version](https://img.shields.io/npm/v/svgpack.svg?style=flat-square)](https://www.npmjs.com/package/svgpack)
[![Build Status](https://img.shields.io/travis/blivesta/svgpack/master.svg?style=flat-square)](https://travis-ci.org/blivesta/svgpack)


> SVG sprites and CSS and generate the HTML page.

## Demo
- [Flexicon src](https://github.com/blivesta/flexicon)
- [Flexicon dist](http://git.blivesta.com/flexicon/)


## Install

```
$ npm install svgpack
```


## Usage

```js
var Svgpack = require('svgpack')
var src = './input/*.svg' // input files *You can also use glob pattern.
var dest = './output' // output directory

var svgpack = new Svgpack(src, dest)

svgpack.init()
```

### Arguments:

##### `svgpack(src, dest, options)`

0. `src`: `'String'` | `[Array]`
0. `dest`: `'String'`
0. `options`: `{Object}` => `optional`


### Options:

```js
{
  name: 'svgpack',
  prefix: 'icon', // prefix for css classes
  templates: {
    // default templates files ->
    // https://github.com/blivesta/svgpack/tree/master/templates
    sprite:'./your-project/svgpack-template/svg/sprite.svg',
    css:'./your-project/svgpack-template/css/svgpack.css',
    html:'./your-project/svgpack-template/html/default.html',
  },
  svgoOptions: {},
}
```


## CLI

### Usage:

```
$ svgpack [src] [-d dest] [-n name|-p prefix|-t htmlPath|-c cssPath|-s spritePath]
```

### Options:

- `--dest`, `-d`
- `--name`, `-n`
- `--prefix`, `-p`
- `--templateHtml`, `-t`
- `--templateCss`, `-c`
- `--templateSprite`, `-s`


## Example

1.Create SVG files.
```
|-- svg
    |-- icon1.svg
    |-- icon2.svg
    |-- icon3.svg
    |-- icon4.svg
```

2.Create `input.js`
```js
var Svgpack = require('svgpack')
var src = './svg/*.svg'
var dest = './output'
Svgpack = new Svgpack(src, dest, {
  // options...
}).init()
```

3.Call the `svgpack`.
```
$ node input.js
```

### Result:

```
|-- input.js
|-- svg
    |-- icon1.svg
    |-- icon2.svg
    |-- icon3.svg
    |-- icon4.svg
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
```


## Markup example

```html
<head>
  <link rel="stylesheet" href="svgpack.css">
</head>
<body>
  <!-- svgpack-sprite.svg -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;"> <symbol id="icon-blivesta" viewBox="0 0 64 64"><g> <path d="M35.094 0l-15.97 15.965 15.97 15.963-16.037 16.037L35.094 64H64V0H35.094zm14.5 54.812l-8.07-8.062 8.07-8.066 8.062 8.066-8.062 8.062zm0-29.777l-8.07-8.062 8.07-8.064 8.062 8.06-8.062 8.06z"/> </g></symbol></svg>

  <svg viewBox="0 0 64 64" class="icon"><use xlink:href="#icon-blivesta"></use></svg>

</body>
```


## Contributing

To contribute to SVGPack, clone this repo locally and commit your code.  
Please check that everything works before opening a pull-request.


## License
Released under the MIT license.
