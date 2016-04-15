var makeCss = require('./make-css')
var makeHtml = require('./make-html')
var makeSvgSprite = require('./make-svg-sprite')
var mkdirp = require('mkdirp')
var optimaize = require('./optimaize')
var path = require('path')
var svgToJson = require('./svg-to-json')
var objectAssign = require('object-assign')

function Svgpack (src, options) {
  this.options = {
    name: 'svgpack',
    prefix: 'icon',
    dist: process.cwd() + '/svgpack',
    templates: {
      sprite: path.join(__dirname, '/../templates/svg/sprite.svg'),
      css: path.join(__dirname, '/../templates/css/svgpack.css'),
      html: path.join(__dirname, '/../templates/html/default.html'),
    },
    svgoOptions: {},
  }

  options.templates = objectAssign(this.options.templates, options.templates)
  options = objectAssign(this.options, options)

  this.src = src || []
  this.dirs = [
    this.options.dist,
    this.options.dist + '/data',
    this.options.dist + '/svg',
  ]
  this.method = {
    prebuild: function (src, options, methods) {
      optimaize(src, options)
      svgToJson(options, methods)
    },
    build: function (options) {
      makeSvgSprite(require(path.resolve(options.dist + '/' + options.name + '.json')), options)
      makeCss(options)
      makeHtml(options)
    },
  }

  return this
}

Svgpack.prototype.init = function () {
  this.dirs.forEach(function (dir) {
    return mkdirp.sync(dir)
  })
  this.method.prebuild(this.src, this.options, this.method)
}

module.exports = Svgpack
