var assert = require('chai').assert
var it = require('mocha').it
var cheerio = require('cheerio')
var Glob = require('glob').sync
var path = require('path')
var postcss = require('postcss')
var readFileSync = require('../lib/read-file-sync')

var fileCheck = function (src, options) {
  var input = new Glob(src)

  it('svgpack.json', function (done) {
    var deta = require(path.join(__dirname, '/../' + options.dest + '/' + options.name + '.json'))
    assert.equal(input.length, Object.keys(deta.icons).length)
    done()
  })

  it('svgpack-sprite.svg', function (done) {
    var content = readFileSync(options.dest + '/' + options.name + '-sprite.svg')
    var $ = cheerio.load(content)
    assert.equal(input.length, $('symbol').length)
    done()
  })

  it('index.html', function (done) {
    var content = readFileSync(options.dest + '/index.html')
    var $ = cheerio.load(content)
    assert.equal(input.length, $('main').find('.card').length)
    done()
  })

  it('svgpack.css', function (done) {
    var content = readFileSync(options.dest + '/' + options.name + '.css')
    var className = postcss.parse(content).nodes[0].selector
    assert.equal(className, '.' + options.prefix)
    done()
  })

  it('directories', function (done) {
    var svg = new Glob(options.dest + '/svg/*.svg')
    var json = new Glob(options.dest + '/data/*.json')
    assert.equal(input.length, svg.length, json.length)
    done()
  })
}

module.exports = fileCheck
