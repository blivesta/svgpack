var after = require('mocha').after
var before = require('mocha').before
var describe = require('mocha').describe
var rimraf = require('rimraf')
var Svgpack = require('..')
var fileCheck = require('./file-check')

describe('Result', function () {
  var src = './test/fixtures/*.svg'
  var dest = './test/result'
  var svgpack = new Svgpack(src, {
    dest: dest
  })

  before(function () {
    svgpack.init()
  })

  after(function (cb) {
    rimraf(dest, cb)
  })

  return fileCheck(src, svgpack.options)
})
