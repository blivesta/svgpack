#!/usr/bin/env node

var minimist = require('minimist')
var pkg = require('../package.json')
var Svgpack = require('..')

var argv = minimist(process.argv.slice(2), {
  alias: {
    b: 'base64',
    d: 'dest',
    n: 'name',
    p: 'prefix',
    m: 'templatesHtml',
    c: 'templatesCss',
    s: 'templatesSprite',
    v: 'version'
  }
})

var src = argv._
var options = {}
options.templates = {}

if (argv.dest) {
  options.dest = argv.dest
}

if (argv.name) {
  options.name = argv.name
}

if (argv.prefix) {
  options.prefix = argv.prefix
}

if (argv.base64) {
  options.base64 = argv.base64
}

if (argv.templatesHtml) {
  options.templates.html = argv.templatesHtml
}

if (argv.templatesCss) {
  options.templates.css = argv.templatesCss
}

if (argv.templatesSprite) {
  options.templates.sprite = argv.templatesSprite
}

if (argv.version) {
  console.log(pkg.version)
}

var svgpack = new Svgpack(src, options)
svgpack.init()
