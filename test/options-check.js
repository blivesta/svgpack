var assert = require('chai').assert
var it = require('mocha').it
var cheerio = require('cheerio')
var path = require('path')
var readFileSync = require('../lib/read-file-sync')

var optionsCheck = function (options) {
  var html = function () {
    var content = readFileSync(options.dest + '/index.html')
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
    var content = readFileSync(options.dest + '/' + options.name + '.css')
    var $ = cheerio.load(content)
    assert.equal(options.prefix, $('optionPrefix').text())
    done()
  })

  it('templates.svgSprite', function (done) {
    var content = readFileSync(options.dest + '/' + options.name + '-sprite.svg')
    var $ = cheerio.load(content)
    assert.equal('fixture', $('svg').attr('id'))
    done()
  })

  it('base64', function (done) {
    var deta = require(path.join(__dirname, '/../' + options.dest + '/' + options.name + '.json'))
    assert.typeOf(deta.icons[0].base64, 'string')
    done()
  })
}

module.exports = optionsCheck
