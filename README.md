# SVGPack

[![npm version](https://img.shields.io/npm/v/svgpack.svg?style=flat-square)](https://www.npmjs.com/package/svgpack)
[![Build Status](https://img.shields.io/travis/blivesta/svgpack/master.svg?style=flat-square)](https://travis-ci.org/blivesta/svgpack)

> A tool for generating and managing SVG Sprites.

## What it does

- Optimizes SVGs using SVGO
- Generates SVG Sprites
- Generates SVG and JSON files individually
- Generates CSS files for icon use
- Generates html report with a list of icons and output data

## Things to Note

SVGPack does not currently support `circle` and `ellipse` elements.  
If your SVG file has `circle` and `ellipse` elements, you will need to convert these into 'path' elements.  
You can use Illustrator's 'Make Compound Path' function to convert circles and ellipses into paths.


## Generate with SVGPack

- [Flexicon](http://git.blivesta.com/flexicon/) [ [repository](https://github.com/blivesta/flexicon) ]


## Getting started

### Install

```
$ npm install svgpack
```

For command-line access install the npm package globally as well.

```
$ npm install svgpack -g
```


### Usage

```js
var Svgpack = require('svgpack')
var src = './input/*.svg' // input files *You can also use glob pattern.
var svgpack = new Svgpack(src, { /* options */ })
svgpack.init()
```

#### Arguments:

```js
Svgpack(src, options)
```


0. `src`: `'String'` | `[Array]`
0. `options`: `{Object}` => `optional`


#### Options:

```js
{
  name: 'svgpack',
  dest: './svgpack',
  prefix: 'icon', // prefix for css classes
  base64: false,
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


### CLI

#### Usage:

```
$ svgpack [src] [ -d dest | -n name | -p prefix | -t templateHtml | -c templateCss | -s templateSprite]
```

#### Options:

- `--name`, `-n`
- `--dest`, `-d`
- `--prefix`, `-p`
- `--base64`, `-b`
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
var svgpack = new Svgpack(src, { /* options */ })
svgpack.init()
```

3.Call the `svgpack`.
```
$ node input.js
```

4.Result:

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

## Markup Example

```html
<head>
  <link rel="stylesheet" href="svgpack.css">
</head>
<body>
  <!-- svgpack-sprite.svg -->
  <svg style="display: none;">
    <symbol id="icon-star" viewBox="0 0 32 32">
      <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z"/>
    </symbol>
    <symbol id="icon-heart" viewBox="0 0 32 32">
      <path d="M26.996 12.898c-.064-2.207-1.084-4.021-2.527-5.13-1.856-1.428-4.415-1.69-6.542-.132-.702.516-1.359 1.23-1.927 2.168-.568-.938-1.224-1.652-1.927-2.167-2.127-1.559-4.685-1.297-6.542.132-1.444 1.109-2.463 2.923-2.527 5.13-.035 1.172.145 2.48.788 3.803 1.01 2.077 5.755 6.695 10.171 10.683l.035.038.002-.002.002.002.036-.038c4.415-3.987 9.159-8.605 10.17-10.683.644-1.323.822-2.632.788-3.804z"/>
    </symbol>
  </svg>

  <a href="#">
    <svg viewBox="0 0 64 64" class="icon"><use xlink:href="#icon-star"></use></svg>
    Star
  </a>

  <a href="#">
    <svg viewBox="0 0 64 64" class="icon"><use xlink:href="#icon-heart"></use></svg>
    Heart
  </a>

</body>
```

SVG Sprite icons are supported by IE 9 browsers and above.

## Contributing

To contribute to SVGPack, clone this repo locally and commit your code.  
Please check that everything works before opening a pull-request.


## License
Released under the MIT license.
