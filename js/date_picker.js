var currentdate = new Date();
var FullYear = currentdate.getFullYear();
var Month = currentdate.getMonth() + 1;
var nowDate = currentdate.getDate();

Month = Month < 10 ? "0" + Month : Month;
nowDate = nowDate < 10 ? "0" + nowDate : nowDate;

var datetime = FullYear + "-" + Month + "-" + nowDate;
// $("#date").append("value='" + datetime + "'");
$("#date").val(datetime);
// $("#date").min(datetime);
