var _ = require('lodash')
var Datauri = require('datauri')
var fs = require('fs')
var Glob = require('glob').sync
var mkdirp = require('mkdirp')
var path = require('path')
var perser = require('html-to-json')
var Svgo = require('svgo')

function Svgpack (src, options) {
  this.config = {
    dirs: [],
    baseJson: '',
    src: src || [],
  }

  this.options = {
    name: 'svgpack',
    prefix: 'icon',
    dist: './svgpack',
    templates: {
      sprite: path.resolve(path.dirname('/../templates/svg/sprite.svg')),
      css: path.resolve(path.dirname('/../templates/css/svgpack.css')),
      html: path.resolve(path.dirname('/../templates/html/default.html')),
    },
    svgoOptions: {},
  }

  options.templates = Object.assign(this.options.templates, options.templates)
  options = Object.assign(this.options, options)

  this.config.dirs = [
    this.options.dist,
    this.options.dist + '/data',
    this.options.dist + '/svg',
  ]

  this.config.baseJson = path.resolve(options.dist + '/' + options.name + '.json')
}

Svgpack.prototype.init = function () {
  this.config.dirs.forEach(function (dir) {
    return mkdirp.sync(dir)
  })
  return optimaize(this.config.src, this.options)
}

function optimaize (src, options) {
  var files = new Glob(src)
  var svgo = new Svgo(options.svgoOptions)
  files.forEach(function (file, i) {
    var filename = path.basename(file)
    var input = path.resolve(path.dirname(file), filename)
    var content = fs.readFileSync(input, 'utf8')
    return svgo.optimize(content, function (result) {
      return fs.writeFileSync(options.dist + '/svg/' + filename, result.data)
    })
  })
  return createSvgToJson(options)
}

function createSvgToJson (options) {
  var files = new Glob(options.dist + '/svg/*.svg')
  var datauri = new Datauri()
  files.forEach(function (file, i) {
    var iconName = path.basename(file, '.svg')
    var filename = path.basename(file)
    var input = path.resolve(path.dirname(file), filename)
    var output = path.resolve(options.dist + '/data', iconName) + '.json'
    var content = fs.readFileSync(input, 'utf8')
    var promise = perser.parse(content, {
      'name': function ($root) {
        return iconName
      },
      'viewBox': function ($root) {
        var svg = $root.find('svg')
        return svg[0].attribs.viewbox
      },
      'path': ['path', {
        'd': function ($path) {
          return $path.attr('d')
        },
        'stroke': function ($path) {
          return $path.attr('stroke')
        },
        'fill': function ($path) {
          return $path.attr('fill')
        },
      }],
      'base64': function ($root) {
        return datauri.format(filename, content).content
      },
    })
    return promise.done(function (result) {
      fs.writeFileSync(output, JSON.stringify(result, null, '  '))
      if (i >= files.length - 1) {
        var mergeInput = new Glob(path.resolve(options.dist + '/data/*.json'))
        return dataMerge(mergeInput, options)
      }
    })
  })
}

function dataMerge (files, options) {
  var contents = []
  files.forEach(function (file, i) {
    var dir = path.dirname(file)
    var filename = path.basename(file)
    var content = fs.readFileSync(dir + '/' + filename, 'utf8')
    contents.push(content)
  })
  var props = '{ "icons": [' + contents + '] }'
  var result = path.resolve(options.dist + '/' + options.name + '.json')
  return (
    fs.writeFileSync(result, props),
    createSvgSprite(require(result), options)
  )
}

function createSvgSprite (data, options) {
  var input = fs.readFileSync(options.templates.sprite, 'utf8')
  var output = path.resolve(options.dist + '/' + options.name + '-sprite.svg')
  var content = _.template(input)
  data.config = options
  var result = content(data).replace(/\r?\n|\s\s\s\s|\s\s/g, '')
  return (
    fs.writeFileSync(output, result),
    createCss(options)
  )
}

function createCss (options) {
  var input = fs.readFileSync(options.templates.css, 'utf8')
  var outut = options.dist + '/' + options.name + '.css'
  var content = _.template(input)
  var result = content(options)
  return (
    fs.writeFileSync(outut, result),
    createHtml(options)
  )
}

function createHtml (options) {
  var data = require(path.resolve(options.dist + '/' + options.name + '.json'))
  var filePath = options.dist + '/' + options.name
  var cssInject = fs.readFileSync(filePath + '.css', 'utf8')
  var svgInject = fs.readFileSync(filePath + '-sprite.svg', 'utf8')
  var input = fs.readFileSync(options.templates.html, 'utf8')
  var output = options.dist + '/' + 'index.html'
  var content = _.template(input)
  data.options = options
  data.svgInject = svgInject
  data.cssInject = cssInject
  var result = content(data)
  return fs.writeFileSync(output, result)
}

module.exports = Svgpack
