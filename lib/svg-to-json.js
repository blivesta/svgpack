var cheerio = require('cheerio')
var Datauri = require('datauri')
var fs = require('fs')
var Glob = require('glob').sync
var htmlToJson = require('html-to-json')
var path = require('path')

function svgToJson (options, methods) {
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
      try {
        fs.writeFileSync(output, JSON.stringify(result, null, '  '))
      } catch (err) {
        throw err
      }

      if (i === files.length - 1) {
        dataMerge(options, methods)
      }
    })
  })
  console.log('svgToJson')
}

function dataMerge (options, methods) {
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

  methods.makeFiles(options)
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
