var assert = require('chai').assert
var cheerio = require('cheerio')
var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf')
var settings = require('./settings')
var Svgpack = require('..')

describe('options', function () {
  var src = settings.config.src
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
    var content
    try {
      content = fs.readFileSync(path.resolve(dest + '/index.html'), 'utf8')
    } catch (err) {
      throw err
    }
    return cheerio.load(content)
  }

  it('name', function (done) {
    var $ = html()
    assert.equal(options.name, $('#options-name').text())
    done()
  })

  it('prefix', function (done) {
    var $ = html()
    assert.equal(options.prefix, $('#options-prefix').text())
    done()
  })

  it('template html', function (done) {
    var $ = html()
    assert.equal('fixture', $('h1').text())
    done()
  })

  it('template css', function (done) {
    var content

    try {
      content = fs.readFileSync(path.resolve(dest + '/' + options.name + '.css'), 'utf8')
    } catch (err) {
      throw err
    }

    var $ = cheerio.load(content)
    assert.equal(options.prefix, $('fixture').text())
    done()
  })

  it('template svg sprite', function (done) {
    var content

    try {
      content = fs.readFileSync(path.resolve(dest + '/' + options.name + '-sprite.svg'), 'utf8')
    } catch (err) {
      throw err
    }

    var $ = cheerio.load(content)
    assert.equal('fixture', $('svg').attr('id'))
    done()
  })
})
