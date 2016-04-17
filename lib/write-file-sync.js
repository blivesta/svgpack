var fs = require('fs')

function writeFileSync (dest, content) {
  try {
    return fs.writeFileSync(dest, content)
  } catch (err) {
    throw err
  }
}

module.exports = writeFileSync
