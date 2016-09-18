var Datauri = require('datauri')
var Glob = require('glob').sync
var htmlToJson = require('html-to-json')
var path = require('path')
var readFileSync = require('./read-file-sync')
var writeFileSync = require('./write-file-sync')

function svgToJson (options, methods) {
  var files = new Glob(options.dest + '/svg/*.svg')
  var datauri = new Datauri()

  files.forEach(function (file, i) {
    var iconName = path.basename(file, '.svg')
    var filename = path.basename(file)
    var input = path.resolve(path.dirname(file), filename)
    var output = path.resolve(options.dest + '/data', iconName) + '.json'
    var content = readFileSync(input)
    var spriteObj = {
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
        }
      }]
    }

    if (options.base64) {
      spriteObj.base64 = function ($root) {
        return datauri.format(filename, content).content
      }
    }

    var sprite = htmlToJson.parse(content, spriteObj)

    return sprite.done(function (result) {
      writeFileSync(output, JSON.stringify(result, null, '  '))

      if (i === files.length - 1) {
        dataMerge(options, methods)
      }
    })
  })
}

function dataMerge (options, methods) {
  var files = new Glob(path.resolve(options.dest + '/data/*.json'))
  var contents = []

  files.forEach(function (file, i) {
    var dir = path.dirname(file)
    var filename = path.basename(file)
    var content = readFileSync(dir + '/' + filename)

    contents.push(content)
  })

  var props = '{ "icons": [' + contents + '] }'
  var result = path.resolve(options.dest + '/' + options.name + '.json')

  writeFileSync(result, props)

  methods.build(options)
}

module.exports = svgToJson
