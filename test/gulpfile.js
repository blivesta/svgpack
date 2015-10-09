var gulp = require('gulp');
var flexiconGenerator = require('..');

gulp.task('default',function(){
  return flexiconGenerator('./fixtures/*.svg', {
    name: 'gulp',
    prefix: 'gu',
    dist: './~build-gulp',
    templates: {
      sprite:'../templates/svg/sprite.svg',
      css:'../templates/css/flexicon.css',
      html:'../templates/html/default.html',
    }
  });
})
