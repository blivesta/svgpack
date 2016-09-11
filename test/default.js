var after = require('mocha').after
var before = require('mocha').before
var describe = require('mocha').describe
var fileCheck = require('./file-check')
var rimraf = require('rimraf')
var Svgpack = require('..')

describe('Default', function () {
  var src = './test/fixtures/*.svg'
  var svgpack = new Svgpack(src)

  before(function () {
    svgpack.init()
  })

  after(function (cb) {
    rimraf(svgpack.options.dest, cb)
  })

  return fileCheck(src, svgpack.options)
})
