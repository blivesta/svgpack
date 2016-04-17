var fs = require('fs')

function readFileSync (src) {
  try {
    return fs.readFileSync(src, 'utf8')
  } catch (err) {
    throw err
  }
}

module.exports = readFileSync
