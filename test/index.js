var Svgpack = require('..')
var test = require('tape')
var glob = require('glob')
var path = require('path')

test('file check', function (t) {
  var input = './test/fixtures/*.svg'

  Svgpack = new Svgpack(input, {
    name: 'test',
    prefix: 'te',
    dist:'./test/~build',
    templates: {
      sprite:'./templates/svg/sprite.svg',
      css:'./templates/css/svgpack.css',
      html:'./templates/html/default.html',
    }
  })

  var files = new glob.sync(path.resolve(Svgpack.options.dist + '/*'))
  var dest = [
    path.resolve(Svgpack.options.dist + '/data'),
    path.resolve(Svgpack.options.dist + '/index.html'),
    path.resolve(Svgpack.options.dist + '/svg'),
    path.resolve(Svgpack.options.dist + '/' + Svgpack.options.name + '-sprite.svg'),
    path.resolve(Svgpack.options.dist + '/' + Svgpack.options.name + '.css'),
    path.resolve(Svgpack.options.dist + '/' + Svgpack.options.name + '.json')
  ]

  t.deepLooseEqual(dest, files)
  t.end()
})
