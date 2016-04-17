var _ = require('lodash')
var path = require('path')
var readFileSync = require('./read-file-sync')
var writeFileSync = require('./write-file-sync')

function makeHtml (dest, options) {
  var data = require(path.resolve(dest + '/' + options.name + '.json'))
  var filePath = dest + '/' + options.name
  var cssInject = readFileSync(filePath + '.css')
  var svgInject = readFileSync(filePath + '-sprite.svg')
  var input = readFileSync(options.templates.html)
  var output = dest + '/' + 'index.html'

  data.options = options
  data.svgInject = svgInject
  data.cssInject = cssInject

  var content = _.template(input)
  var result = content(data)

  return writeFileSync(output, result)
}

module.exports = makeHtml
