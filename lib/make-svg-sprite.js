var _ = require('lodash')
var fs = require('fs')
var path = require('path')

function makeSvgSprite (dest, options, data) {
  var input

  try {
    input = fs.readFileSync(options.templates.sprite, 'utf8')
  } catch (err) {
    throw err
  }

  var output = path.resolve(dest + '/' + options.name + '-sprite.svg')
  var content = _.template(input)
  data.config = options
  var result = content(data).replace(/\r?\n|\s\s\s\s|\s\s/g, '')

  try {
    fs.writeFileSync(output, result)
  } catch (err) {
    throw err
  }
}

module.exports = makeSvgSprite
