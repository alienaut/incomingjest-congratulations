var $ = require('jquery');

var Accordion = function(el, multiple) {
  this.el = el || {};
  this.multiple = multiple || false;

  // Variables
  var link = this.el.find('.link');
  // Eventos
  link.on('click', {el: this.el, multiple: this.multiple},this.dropdown)
}

Accordion.prototype.dropdown = function(e) {
  var $el = e.data.el;
    $this = $(this),
    $next = $this.next();

  $next.slideToggle();
  $this.parent().toggleClass('open');

  if(!e.data.multiple){
    $el.find('.content').not($next).slideUp().parent().removeClass('open');
  }

}

var initializeAccordion = function() {
  var accordion = new Accordion($('.accordion'), false);
};

module.exports = initializeAccordion;

