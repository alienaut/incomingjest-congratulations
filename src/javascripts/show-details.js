var $ = require('jquery');

var loadEvents = function() {
  $('a.button.jest-detail-link').on('click', function(event) {
    console.log('he')
    event.preventDefault();
    $('#scroll-disabler').remove();
    $(".suprise-page").fadeOut('slow');
    $('#jest-details').fadeIn('slow');
  });
};

module.exports = loadEvents;

