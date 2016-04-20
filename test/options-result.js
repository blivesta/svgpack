var assert = require('chai').assert
var cheerio = require('cheerio')
var readFileSync = require('../lib/read-file-sync')
var rimraf = require('rimraf')
var Svgpack = require('..')

describe('options result', function () {
  var src = './test/fixtures/*.svg'
  var dest = './test/options'
  var options = {
    name: 'foo',
    prefix: 'bar',
    templates: {
      html: './test/templates/html/fixture.html',
      css: './test/templates/css/fixture.css',
      sprite: './test/templates/svg/fixture.svg',
    },
  }

  before(function () {
    Svgpack = new Svgpack(src, dest, options).init()
  })

  after(function (cb) {
    rimraf(dest, cb)
  })

  var html = function () {
    var content = readFileSync(dest + '/index.html')
    return cheerio.load(content)
  }

  it('name', function (done) {
    var $ = html()
    assert.equal(options.name, $('optionsName').text())
    done()
  })

  it('prefix', function (done) {
    var $ = html()
    assert.equal(options.prefix, $('optionsPrefix').text())
    done()
  })

  it('templates.html', function (done) {
    var $ = html()
    assert.equal(options.name, $('optionsName').text())
    done()
  })

  it('templates.css', function (done) {
    var content = readFileSync(dest + '/' + options.name + '.css')
    var $ = cheerio.load(content)
    assert.equal(options.prefix, $('optionPrefix').text())
    done()
  })

  it('templates.svgSprite', function (done) {
    var content = readFileSync(dest + '/' + options.name + '-sprite.svg')
    var $ = cheerio.load(content)
    assert.equal('fixture', $('svg').attr('id'))
    done()
  })
})
