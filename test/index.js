var assert = require('chai').assert
var Glob = require('glob').sync
var path = require('path')
var rimraf = require('rimraf')
var settings = require('./settings')
var Svgpack = require('..')

var src = settings.config.src
settings.config.dest = './test/temp'
var dest = settings.config.dest
var name = 'svgpack'

describe('Default', function () {
  before(function () {
    var svgpack = new Svgpack(src, dest)
    svgpack.init()
  })

  after(function (cb) {
    rimraf(dest, cb)
  })

  it('Check the "svgpack.json"', function (done) {
    var input = new Glob(path.resolve(src))
    var output = require(path.resolve(dest + '/' + name + '.json'))
    assert.equal(input.length, Object.keys(output.icons).length)
    done()
  })

  it('Check the files of the "data" directory', function (done) {
    var input = new Glob(path.resolve(src))
    var output = new Glob(path.resolve(dest + '/data/*.json'))
    assert.equal(input.length, output.length)
    done()
  })

  it('Check the files of the "svg" directory', function (done) {
    var input = new Glob(path.resolve(src))
    var output = new Glob(path.resolve(dest + '/svg/*.svg'))
    assert.equal(input.length, output.length)
    done()
  })

  it('check svg sprite files', function (done) {
    var input = new Glob(path.resolve(src))
    var output = new Glob(path.resolve(dest + '/svg/*.svg'))
    assert.equal(input.length, output.length)
    done()
  })

  it('Check the files of the "dist" directory', function (done) {
    var files = new Glob(path.resolve(dest + '/*'))
    var props = [
      path.resolve(dest + '/data'),
      path.resolve(dest + '/index.html'),
      path.resolve(dest + '/svg'),
      path.resolve(dest + '/' + name + '-sprite.svg'),
      path.resolve(dest + '/' + name + '.css'),
      path.resolve(dest + '/' + name + '.json'),
    ]
    assert.equal(files.length, props.length)
    done()
  })
})
