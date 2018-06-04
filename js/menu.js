$('document').ready(function(){
	loadGoods();
});

function loadGoods() {
var requestOpenSession = "https://malevich-server.herokuapp.com/session/start";

  var xhr = createCORSRequest('GET', requestOpenSession);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
/*
var request = new XMLHttpRequest();
request.open('GET', requestOpenSession);
request.send();
console.log(request.response);
*/

var requestMenuURL = 'https://malevich-server.herokuapp.com/menu/all';

var requestMenu = new XMLHttpRequest();
requestMenu.responseType = 'json';
requestMenu.withCredentials = true;
requestMenu.open('GET', requestMenuURL);
requestMenu.send();

requestMenu.onload = function() {
  var dishList = requestMenu.response;
  console.log(dishList);
  parseDishList(dishList); 
	}
}

function parseDishList(jsonObj) {
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

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
 
}
