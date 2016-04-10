var settings = {
  src: './test/fixtures/*.svg',
  options: {
    name: 'svgpack',
    prefix: 'icon',
    dist: '',
    templates: {
      sprite: './templates/svg/sprite.svg',
      css: './templates/css/svgpack.css',
      html: './templates/html/default.html',
    },
    svgoOptions: {},
  },
}

module.exports = settings
