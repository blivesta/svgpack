var _ = require('lodash')
var fs = require('fs')
var path = require('path')

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

module.exports = makeHtml
