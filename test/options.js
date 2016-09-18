var after = require('mocha').after
var before = require('mocha').before
var describe = require('mocha').describe
var optionsCheck = require('./options-check')
var rimraf = require('rimraf')
var Svgpack = require('..')

describe('Options', function () {
  var src = './test/fixtures/*.svg'
  var options = {
    name: 'foo',
    dest: './test/options',
    prefix: 'bar',
    base64: true,
    templates: {
      html: './test/templates/html/fixture.html',
      css: './test/templates/css/fixture.css',
      sprite: './test/templates/svg/fixture.svg'
    }
  }
  var svgpack = new Svgpack(src, options)

  before(function (cb) {
    svgpack.init()
    cb()
  })

  after(function (cb) {
    rimraf(options.dest, cb)
  })

  return optionsCheck(svgpack.options)
})
