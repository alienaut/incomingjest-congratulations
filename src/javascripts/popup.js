var $ = require('jquery');

var popup = function() {
  $('.close').on('click', function(event) {
    event.preventDefault();
    $('.popup, .close').fadeOut('slow', function() {} );
  });

  $('.open').on('click', function(event) {
    event.preventDefault();
    $('.popup, .close').fadeIn('slow', function() {} );
  });
};

module.exports = popup;

