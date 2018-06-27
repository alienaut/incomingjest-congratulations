var $ = require('jquery');
var gestureId;

var getGestureId = function() {
  var gestureIdElem = document.getElementById('gesture-id');
  gestureId = gestureIdElem .getAttribute('data-gesture-id');
};

var success = function(data) {
  var $options = $('.options')
  var $question = $('.question');
  var $ajaxSuccess = $('.ajax-success');

  $options.slideUp('slow', function() {
    $ajaxSuccess.fadeIn('slow');
  });
  $question.slideUp('slow');
};

var error = function(data) {
  console.log(data);
}

var rejestSuccess = function(data) {
  var $rejestButton = $('.rejest');
  var $rejesetLabel = $('.mest > .label');
  var $rejestSuccess = $('.rejest-success');

  $rejestButton.fadeOut('slow', function() {
    $rejestSuccess.fadeIn(); 
  });

  $rejesetLabel.fadeOut();
}

var ajaxEvents = function() {
  // to disable send revel on after another
  var isRevelSend = false;

  getGestureId();

  $('form[name=delivery-cargo]').on('submit', function(){
    var $form = $(this);
    $.ajax({
      url: '/gift/delivery',
      method: 'POST',
      data: { act: "cargo", id: gestureId, address: $('[name=address]').val() },
      beforeSend: function() {
        $form.children('button').prop('disabled', true);
      },
      success: success,
      error: error
    });

    // won't change page 
    return false;
  });

  $('form[name=delivery-call-me]').on('submit', function(){
    var $form = $(this);
    $.ajax({
      url: '/gift/delivery',
      method: 'POST',
      data: {act: "callMe", id: gestureId, note: $('[name=note]').val()},
      beforeSend: function() {
        $form.children('button').prop('disabled', true);
      },
      success: success,
      error: error
    });

    // won't change page
    return false;
  });

  $('.rejest').on('click', function(event) {
    // this is dirty hack, see where it is defined.
    if(isRevelSend) { return; }

    var $rejest = $(this);
    event.preventDefault();

    $.ajax({
      url: '/gift/revel',
      method: 'POST',
      data: { id: gestureId },
      beforeSend: function() {
        $rejest.addClass('disabled').removeAttr('href');
        // this is dirty hack, see where it is defined.
        isRevelSend = true;
      },
      success: rejestSuccess,
      error: error
    });
  });

};

module.exports = ajaxEvents;

