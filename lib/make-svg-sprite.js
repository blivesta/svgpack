var _ = require('lodash')
var path = require('path')
var readFileSync = require('./read-file-sync')
var writeFileSync = require('./write-file-sync')

function makeSvgSprite (dest, options, data) {
  var input = readFileSync(options.templates.sprite)
  var output = path.resolve(dest + '/' + options.name + '-sprite.svg')
  var content = _.template(input)
  data.config = options
  var result = content(data).replace(/\r?\n|\s\s\s\s|\s\s/g, '')

  return writeFileSync(output, result)
}

module.exports = makeSvgSprite
