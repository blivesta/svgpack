var _ = require('lodash')
var cheerio = require('cheerio')
var Datauri = require('datauri')
var fs = require('fs')
var Glob = require('glob').sync
var htmlToJson = require('html-to-json')
var mkdirp = require('mkdirp')
var path = require('path')
var Svgo = require('svgo')

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

  options.templates = Object.assign(this.options.templates, options.templates)
  options = Object.assign(this.options, options)

  this.src = src || []
  this.baseJson = path.resolve(options.dist + '/' + options.name + '.json')
  this.dirs = [
    this.options.dist,
    this.options.dist + '/data',
    this.options.dist + '/svg',
  ]

  return this
}

Svgpack.prototype.init = function () {
  this.dirs.forEach(function (dir) {
    return mkdirp.sync(dir)
  })

  optimaize(this.src, this.options)

  return this
}

function optimaize (src, options) {
  var files = new Glob(src)
  var svgo = new Svgo(options.svgoOptions)

  files.forEach(function (file, i) {
    var filename = path.basename(file)
    var input = path.resolve(path.dirname(file), filename)
    var content

    try {
      content = fs.readFileSync(input, 'utf8')
    } catch (err) {
      throw err
    }

    return svgo.optimize(content, function (result) {
      try {
        fs.writeFileSync(options.dist + '/svg/' + filename, result.data)
      } catch (err) {
        throw err
      }
    })
  })

  return svgToJson(options)
}

function svgToJson (options) {
  var files = new Glob(options.dist + '/svg/*.svg')
  var datauri = new Datauri()

  files.forEach(function (file, i) {
    var iconName = path.basename(file, '.svg')
    var filename = path.basename(file)
    var input = path.resolve(path.dirname(file), filename)
    var output = path.resolve(options.dist + '/data', iconName) + '.json'
    var content

    try {
      content = fs.readFileSync(input, 'utf8')
    } catch (err) {
      throw err
    }

    if (!checkGroupElement(content, filename)) return

    var promise = htmlToJson.parse(content, {
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
        'fill': function ($path) {
          return $path.attr('fill')
        },
        'stroke': function ($path) {
          return $path.attr('stroke')
        },
        'stroke-width': function ($path) {
          return $path.attr('stroke-width')
        },
        'stroke-miterlimit': function ($path) {
          return $path.attr('stroke-miterlimit')
        },
      }],
      'base64': function ($root) {
        return datauri.format(filename, content).content
      },
    })
    return promise.done(function (result) {
      try {
        fs.writeFileSync(output, JSON.stringify(result, null, '  '))
      } catch (err) {
        throw err
      }

      if (i >= files.length - 1) {
        dataMerge(options)
      }
    })
  })
}

function checkGroupElement (content, filename) {
  var $ = cheerio.load(content)
  var $g = $('svg').find('g')
  var $gFill = $g.attr('fill')
  var $gStroke = $g.attr('stroke')

  // 'g' element exists in this svg file
  if ($gFill || $gStroke) throw new Error('SVGPack -> g element exists in the' + filename)

  return true
}

function dataMerge (options) {
  var files = new Glob(path.resolve(options.dist + '/data/*.json'))
  var contents = []

  files.forEach(function (file, i) {
    var dir = path.dirname(file)
    var filename = path.basename(file)
    var content

    try {
      content = fs.readFileSync(dir + '/' + filename, 'utf8')
    } catch (err) {
      throw err
    }

    contents.push(content)
  })

  var props = '{ "icons": [' + contents + '] }'
  var result = path.resolve(options.dist + '/' + options.name + '.json')

  try {
    fs.writeFileSync(result, props)
  } catch (err) {
    throw err
  }

  // Object.keys(options.addon).forEach(function (key) {
  //   console.log(options.addon[key])
  // })

  makeSvgSprite(require(result), options)
}

function makeSvgSprite (data, options) {
  var input

  try {
    input = fs.readFileSync(options.templates.sprite, 'utf8')
  } catch (err) {
    throw err
  }

  var output = path.resolve(options.dist + '/' + options.name + '-sprite.svg')
  var content = _.template(input)
  data.config = options
  var result = content(data).replace(/\r?\n|\s\s\s\s|\s\s/g, '')

  try {
    fs.writeFileSync(output, result)
  } catch (err) {
    throw err
  }

  makeCss(options)
}

function makeCss (options) {
  var input

  try {
    input = fs.readFileSync(options.templates.css, 'utf8')
  } catch (err) {
    throw err
  }

  var outut = options.dist + '/' + options.name + '.css'
  var content = _.template(input)
  var result = content(options)

  try {
    fs.writeFileSync(outut, result)
  } catch (err) {
    throw err
  }

  makeHtml(options)
}

function makeHtml (options) {
  var data = require(path.resolve(options.dist + '/' + options.name + '.json'))
  var filePath = options.dist + '/' + options.name
  var cssInject
  var svgInject
  var input
  var output = options.dist + '/' + 'index.html'

  try {
    cssInject = fs.readFileSync(filePath + '.css', 'utf8')
    svgInject = fs.readFileSync(filePath + '-sprite.svg', 'utf8')
    input = fs.readFileSync(options.templates.html, 'utf8')
  } catch (err) {
    throw err
  }

  data.options = options
  data.svgInject = svgInject
  data.cssInject = cssInject

  var content = _.template(input)
  var result = content(data)

  try {
    fs.writeFileSync(output, result)
  } catch (err) {
    throw err
  }
}

module.exports = Svgpack
