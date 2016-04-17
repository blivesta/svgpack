var makeCss = require('./make-css')
var makeHtml = require('./make-html')
var makeSvgSprite = require('./make-svg-sprite')
var mkdirp = require('mkdirp')
var objectAssign = require('object-assign')
var optimaize = require('./optimaize')
var path = require('path')
var svgToJson = require('./svg-to-json')

function Svgpack (src, dest, options) {
  options = options || {}

  this.config = {
    src: src,
    dest: dest,
    dirs: [
      dest,
      dest + '/data',
      dest + '/svg',
    ],
  }

  this.options = {
    name: 'svgpack',
    prefix: 'icon',
    templates: {
      sprite: path.join(__dirname, '/../templates/svg/sprite.svg'),
      css: path.join(__dirname, '/../templates/css/svgpack.css'),
      html: path.join(__dirname, '/../templates/html/default.html'),
    },
    svgoOptions: {},
  }

  options.templates = objectAssign(this.options.templates, options.templates)
  options = objectAssign(this.options, options)

  this.methods = {
    prebuild: function (src, dest, options, methods) {
      optimaize(src, dest, options)
      svgToJson(dest, options, methods)
    },
    build: function (dest, options) {
      var data = require(path.resolve(dest + '/' + options.name + '.json'))
      makeSvgSprite(dest, options, data)
      makeCss(dest, options)
      makeHtml(dest, options)
    },
  }
}

Svgpack.prototype.init = function () {
  var config = this.config
  config.dirs.forEach(function (dir) {
    return mkdirp.sync(dir)
  })

  this.methods.prebuild(config.src, config.dest, this.options, this.methods)
}

module.exports = Svgpack
