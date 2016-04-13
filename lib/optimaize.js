var fs = require('fs')
var Glob = require('glob').sync
var path = require('path')
var Svgo = require('svgo')

function optimaze (src, options) {
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
}

module.exports = optimaze
