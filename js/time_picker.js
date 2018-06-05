var instance = M.Timepicker.getInstance('.timepicker');
$(document).ready(function () {
    $('.timepicker').timepicker({
        twelveHour: false,
        autoClose: true,
        defaultTime:'12:00'
    });
});