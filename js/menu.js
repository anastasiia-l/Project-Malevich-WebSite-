$('document').ready(function(){
	loadGoods();
});

function loadGoods() {
var requestURL = 'https://malevich-server.herokuapp.com/menu/all';
var request = new XMLHttpRequest();
setCookie('sid','sid');
request.open('GET', requestURL);
request.responseType = 'json';
xhr.withCredentials = true;
request.send();
request.onload = function() {
  var superHeroes = request.response;
  console.log(superHeroes);
  populateHeader(superHeroes);
  
}
}

function populateHeader(jsonObj) {
	var out = '';
	for (var key in jsonObj) {
		out += '<div class="dish-card">' + '<img class="dish-img" src="' + jsonObj[key]['imageURL'] + '">';
		out += '<p class="dish-title">' + jsonObj[key]['name'] + '</p>';
		out += '<div class="dish-description"><p class="dish-description">' + jsonObj[key]['description'] + '</p></div>';
		out += '<p class="dish-cost">' + jsonObj[key]['price'] + '<p>';
		out += '<div class="order-button">Заказать</div></div>';

	}
  	$('#goods').html(out);		
				
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}
