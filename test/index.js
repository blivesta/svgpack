var path = require('path')
var Glob = require('glob').sync
var Svgpack = require('../lib/svgpack.js')
var rimraf = require('rimraf')
var expect = require('chai').expect
var settings = require('./settings')
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
    expect(input.length).to.equal(Object.keys(output.icons).length)
    done()
  })

  it('Check the files of the "data" directory', function (done) {
    var input = new Glob(path.resolve(src))
    var output = new Glob(path.resolve(options.dist + '/data/*.json'))
    expect(input.length).to.equal(output.length)
    done()
  })

  it('Check the files of the "svg" directory', function (done) {
    var input = new Glob(path.resolve(src))
    var output = new Glob(path.resolve(options.dist + '/svg/*.svg'))
    expect(input.length).to.equal(output.length)
    done()
  })

  it('check svg sprite files', function (done) {
    var input = new Glob(path.resolve(src))
    var output = new Glob(path.resolve(options.dist + '/svg/*.svg'))
    expect(input.length).to.equal(output.length)
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
    expect(files.length).to.equal(dest.length)
    done()
  })
})
