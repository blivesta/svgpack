var _ = require('lodash')
var fs = require('fs')

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
}

module.exports = makeCss
