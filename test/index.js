var FlexiconGenerator = require('..');

FlexiconGenerator = new FlexiconGenerator('./test/fixtures/*.svg', {
  name: 'test',
  prefix: 'te',
  dist:'./test/~build',
  templates: {
    sprite:'./templates/svg/sprite.svg',
    css:'./templates/css/flexicon.css',
    html:'./templates/html/default.html',
  }
});
