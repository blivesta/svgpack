var after = require('mocha').after
var before = require('mocha').before
var describe = require('mocha').describe
var exec = require('child_process').exec
var optionsCheck = require('./options-check')
var rimraf = require('rimraf')

describe('CLI', function () {
  var src = './test/fixtures/*.svg'
  var options = {
    name: 'cli',
    dest: './test/cli',
    prefix: 'cli',
    base64: true,
    templates: {
      html: './test/templates/html/fixture.html',
      css: './test/templates/css/fixture.css',
      sprite: './test/templates/svg/fixture.svg'
    }
  }
  var cmd = [
    'svgpack ',
    src,
    ' -d ' + options.dest + ' ',
    ' -n ' + options.name + ' ',
    ' -p ' + options.prefix + ' ',
    ' -b ' + options.base64 + ' ',
    ' -m ' + options.templates.html + ' ',
    ' -c ' + options.templates.css + ' ',
    ' -s ' + options.templates.sprite
  ].join('')

  before(function (cb) {
    exec(cmd, cb)
  })

  after(function (cb) {
    rimraf(options.dest, cb)
  })

  return optionsCheck(options)
})
