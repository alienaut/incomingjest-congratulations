var initializeAccordion = require('./accordion.js'),
    popup = require('./popup.js'),
    slider = require('./slider.js');
    showDetails = require('./show-details.js'),
    ajaxEvents = require('./ajax-events.js')
    videojs = require('video.js');

document.addEventListener('DOMContentLoaded', function(){
  initializeAccordion();
  popup();
  slider();
  showDetails();
  ajaxEvents();
});

