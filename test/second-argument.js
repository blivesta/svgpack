var after = require('mocha').after
var before = require('mocha').before
var describe = require('mocha').describe
var rimraf = require('rimraf')
var Svgpack = require('..')
var filesCheck = require('./files-check')

describe('If second argument is string', function () {
  var src = './test/fixtures/*.svg'
  var dest = './test/second'
  var svgpack = new Svgpack(src, dest, {})

  before(function (cb) {
    svgpack.init()
    cb()
  })

  after(function (cb) {
    rimraf(dest, cb)
  })

  return filesCheck(src, svgpack.options)
})
