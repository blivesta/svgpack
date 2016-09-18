var after = require('mocha').after
var before = require('mocha').before
var describe = require('mocha').describe
var filesCheck = require('./files-check')
var rimraf = require('rimraf')
var Svgpack = require('..')

describe('Default', function () {
  var src = './test/fixtures/*.svg'
  var svgpack = new Svgpack(src)

  before(function (cb) {
    svgpack.init()
    cb()
  })

  after(function (cb) {
    rimraf(svgpack.options.dest, cb)
  })

  return filesCheck(src, svgpack.options)
})
