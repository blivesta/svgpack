var makeCss = require('./make-css')
var makeHtml = require('./make-html')
var makeSvgSprite = require('./make-svg-sprite')
var mkdirp = require('mkdirp')
var objectAssign = require('object-assign')
var optimaize = require('./optimaize')
var path = require('path')
var svgToJson = require('./svg-to-json')

function Svgpack (src, options) {
  options = options || {}

  this.options = {
    name: 'svgpack',
    dest: './svgpack',
    prefix: 'icon',
    base64: false,
    templates: {
      sprite: path.join(__dirname, '/../templates/svg/sprite.svg'),
      css: path.join(__dirname, '/../templates/css/svgpack.css'),
      html: path.join(__dirname, '/../templates/html/default.html')
    },
    svgoOptions: {}
  }

  if (typeof options === 'string') this.options.dest = options

  options.templates = objectAssign(this.options.templates, options.templates)
  options = objectAssign(this.options, options)

  this.config = {
    src: src,
    dirs: [
      this.options.dest,
      this.options.dest + '/data',
      this.options.dest + '/svg'
    ]
  }

  this.methods = {
    prebuild: function (src, options, methods) {
      optimaize(src, options)
      svgToJson(options, methods)
    },
    build: function (options) {
      var data = require(path.resolve(options.dest + '/' + options.name + '.json'))
      makeSvgSprite(options, data)
      makeCss(options)
      makeHtml(options)
    }
  }
}

Svgpack.prototype.init = function () {
  var config = this.config
  var options = this.options

  config.dirs.forEach(function (dir) {
    return mkdirp.sync(dir)
  })

  this.methods.prebuild(config.src, options, this.methods)
}

module.exports = Svgpack
