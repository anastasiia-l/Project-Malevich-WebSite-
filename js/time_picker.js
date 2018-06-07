var instance = M.Timepicker.getInstance(".timepicker");
var disabledHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 20, 21, 22, 23];
$(document).ready(function() {
  $(".timepicker").timepicker({
    twelveHour: false,
    autoClose: true,
    fromnow: 0,
    defaultTime: "12:00",
    ampmclickable: true,
    disabledHours: disabledHours,
    afterShow: function() {
      $(".clockpicker-dial.clockpicker-hours .clockpicker-tick").each(
        function() {
          if ($.inArray(parseInt($(this).text()), disabledHours) !== -1)
            $(this).addClass("grey-text");

          return;
        }
      );

      return;
    }
  });
});
