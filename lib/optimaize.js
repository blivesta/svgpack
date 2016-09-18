var Glob = require('glob').sync
var path = require('path')
var readFileSync = require('./read-file-sync')
var Svgo = require('svgo')
var writeFileSync = require('./write-file-sync')

function optimaze (src, options) {
  var svgo = new Svgo(options.svgoOptions)
  var files

  if (typeof src === 'string') {
    files = new Glob(src)
  } else if (typeof src === 'object') {
    files = src
  }

  files.forEach(function (file, i) {
    var filename = path.basename(file)
    var input = path.resolve(path.dirname(file), filename)
    var content = readFileSync(input)

    return svgo.optimize(content, function (result) {
      return writeFileSync(options.dest + '/svg/' + filename, result.data)
    })
  })
}

module.exports = optimaze
