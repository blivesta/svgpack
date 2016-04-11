var assert = require('chai').assert
var Glob = require('glob').sync
var path = require('path')
var rimraf = require('rimraf')
var settings = require('./settings')
var Svgpack = require('../lib/svgpack.js')

var src = settings.src
var options = settings.options
options.dist = './test/temp'

describe('SVGPack', function () {
  before(function () {
    var svgpack = new Svgpack(src, options)
    svgpack.init()
  })

  after((cb) => {
    rimraf(options.dist, cb)
  })

  it('Check the "svgpack.json"', function (done) {
    var input = new Glob(path.resolve(src))
    var output = require(path.resolve(options.dist + '/' + options.name + '.json'))
    assert.equal(input.length, Object.keys(output.icons).length)
    done()
  })

  it('Check the files of the "data" directory', function (done) {
    var input = new Glob(path.resolve(src))
    var output = new Glob(path.resolve(options.dist + '/data/*.json'))
    assert.equal(input.length, output.length)
    done()
  })

  it('Check the files of the "svg" directory', function (done) {
    var input = new Glob(path.resolve(src))
    var output = new Glob(path.resolve(options.dist + '/svg/*.svg'))
    assert.equal(input.length, output.length)
    done()
  })

  it('check svg sprite files', function (done) {
    var input = new Glob(path.resolve(src))
    var output = new Glob(path.resolve(options.dist + '/svg/*.svg'))
    assert.equal(input.length, output.length)
    done()
  })

  it('Check the files of the "dist" directory', function (done) {
    var files = new Glob(path.resolve(options.dist + '/*'))
    var dest = [
      path.resolve(options.dist + '/data'),
      path.resolve(options.dist + '/index.html'),
      path.resolve(options.dist + '/svg'),
      path.resolve(options.dist + '/' + options.name + '-sprite.svg'),
      path.resolve(options.dist + '/' + options.name + '.css'),
      path.resolve(options.dist + '/' + options.name + '.json'),
    ]
    assert.equal(files.length, dest.length)
    done()
  })
})
