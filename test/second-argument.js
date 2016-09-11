var after = require('mocha').after
var before = require('mocha').before
var describe = require('mocha').describe
var rimraf = require('rimraf')
var Svgpack = require('..')
var fileCheck = require('./file-check')

describe('second argument is string', function () {
  var src = './test/fixtures/*.svg'
  var dest = './test/second'
  var svgpack = new Svgpack(src, dest)

  before(function () {
    svgpack.init()
  })

  after(function (cb) {
    rimraf(dest, cb)
  })

  return fileCheck(src, svgpack.options)
})
