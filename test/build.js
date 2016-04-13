var settings = require('./settings')
var Svgpack = require('../lib/svgpack.js')

var src = settings.src
var options = settings.options
options.dist = './test/build'

var svgpack = new Svgpack(src, options)
svgpack.init()
