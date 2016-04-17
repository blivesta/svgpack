#!/usr/bin/env node

var minimist = require('minimist')
var pkg = require('../package.json')
var Svgpack = require('..')

var argv = minimist(process.argv.slice(2), {
  alias: {
    d: 'dest',
    n: 'name',
    p: 'prefix',
    h: 'templateHtml',
    c: 'templateCss',
    s: 'templateSvgSprite',
    v: 'version',
  },
})

var src = argv._
var dest = ''
var options = {}
options.templates = {}

if (argv.dest) {
  dest = argv.dest
}

if (argv.name) {
  options.name = argv.name
}

if (argv.prefix) {
  options.prefix = argv.prefix
}

if (argv.templateHtml) {
  options.templates.html = argv.templateHtml
}

if (argv.templateCss) {
  options.templates.css = argv.templateCss
}

if (argv.templateSvgSprite) {
  options.templates.sprite = argv.templateSvgSprite
}

if (argv.version) {
  console.log(pkg.version)
}

Svgpack = new Svgpack(src, dest, options).init()
