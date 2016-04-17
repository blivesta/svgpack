var cheerio = require('cheerio')
var Datauri = require('datauri')
var Glob = require('glob').sync
var htmlToJson = require('html-to-json')
var path = require('path')
var readFileSync = require('./read-file-sync')
var writeFileSync = require('./write-file-sync')

function svgToJson (dest, options, methods) {
  var files = new Glob(dest + '/svg/*.svg')
  var datauri = new Datauri()

  files.forEach(function (file, i) {
    var iconName = path.basename(file, '.svg')
    var filename = path.basename(file)
    var input = path.resolve(path.dirname(file), filename)
    var output = path.resolve(dest + '/data', iconName) + '.json'
    var content = readFileSync(input)

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
        'stroke-dasharray': function ($path) {
          return $path.attr('stroke-dasharray')
        },
        'stroke-linecap': function ($path) {
          return $path.attr('stroke-linecap')
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
      writeFileSync(output, JSON.stringify(result, null, '  '))

      if (i === files.length - 1) {
        dataMerge(dest, options, methods)
      }
    })
  })
}

function dataMerge (dest, options, methods) {
  var files = new Glob(path.resolve(dest + '/data/*.json'))
  var contents = []

  files.forEach(function (file, i) {
    var dir = path.dirname(file)
    var filename = path.basename(file)
    var content = readFileSync(dir + '/' + filename)

    contents.push(content)
  })

  var props = '{ "icons": [' + contents + '] }'
  var result = path.resolve(dest + '/' + options.name + '.json')

  writeFileSync(result, props)

  methods.build(dest, options)
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

module.exports = svgToJson
