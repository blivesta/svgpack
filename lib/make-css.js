var _ = require('lodash')
var readFileSync = require('./read-file-sync')
var writeFileSync = require('./write-file-sync')

function makeCss (dest, options) {
  var input = readFileSync(options.templates.css)
  var outut = dest + '/' + options.name + '.css'
  var content = _.template(input)
  var result = content(options)

  return writeFileSync(outut, result)
}

module.exports = makeCss
