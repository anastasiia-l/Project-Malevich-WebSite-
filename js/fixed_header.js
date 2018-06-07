$(document).scroll(function() {
  if ($(this).scrollTop() >= 160) {
    $(".fixed").addClass("sticky");
  } else {
    $(".fixed").removeClass("sticky");
  }
});
