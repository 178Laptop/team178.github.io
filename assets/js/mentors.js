function offsetHeader() {
  $('th').css('top', $('#header').outerHeight() + "px");
}

window.addEventListener('load', offsetHeader, false);
window.addEventListener('resize', offsetHeader, false);
