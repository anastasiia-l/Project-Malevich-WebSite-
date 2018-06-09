$(document).ready(function() {
    $("#popup-dishcard").hide();
});
//Функция отображения PopUp
function PopUpDishCardShow() {
  $("#popup-dishcard").show();
  currentScroll=$(window).scrollTop();
  $(window).bind('scroll', lockscroll);
}
//Функция скрытия PopUp
function PopUpDishCardHide() {
    
  $("#popup-dishcard").hide();
   $(window).unbind('scroll');
   scrollCur();
   return;
}

var currentScroll=0;
function lockscroll(){
    $(window).scrollTop(currentScroll);
}

function scrollCur() {
    $("html, body").animate({
        scrollTop: currentScroll
      }, 6);
}


