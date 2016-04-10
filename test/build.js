var Svgpack = require('../lib/svgpack.js')
var settings = require('./settings')
var src = settings.src
var options = settings.options
options.dist = './test/build'

var svgpack = new Svgpack(src, options)
svgpack.init()
