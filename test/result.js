var assert = require('chai').assert
var cheerio = require('cheerio')
var Glob = require('glob').sync
var postcss = require('postcss')
var readFileSync = require('../lib/read-file-sync')
var rimraf = require('rimraf')
var Svgpack = require('..')

describe('Result', function () {
  var src = './test/fixtures/*.svg'
  var dest = './test/temp'
  var name = 'svgpack'
  var input = new Glob(src)

  before(function () {
    Svgpack = new Svgpack(src, dest).init()
  })

  after(function (cb) {
    rimraf(dest, cb)
  })

  it('svgpack.json', function (done) {
    var output = require('../' + dest + '/' + name + '.json')
    assert.equal(input.length, Object.keys(output.icons).length)
    done()
  })

  it('svgpack-sprite.svg', function (done) {
    var content = readFileSync(dest + '/' + name + '-sprite.svg')
    var $ = cheerio.load(content)
    assert.equal(input.length, $('symbol').length)
    done()
  })

  it('index.html', function (done) {
    var content = readFileSync(dest + '/index.html')
    var $ = cheerio.load(content)
    assert.equal(input.length, $('main').find('.card').length)
    done()
  })

  it('svgpack.css', function (done) {
    var content = readFileSync(dest + '/' + name + '.css')
    var className = postcss.parse(content).nodes[0].selector
    assert.equal(className, '.icon')
    done()
  })

  it('directories', function (done) {
    var svg = new Glob(dest + '/svg/*.svg')
    var json = new Glob(dest + '/data/*.json')
    assert.equal(input.length, svg.length, json.length)
    done()
  })
})
