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

function get_cookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return null;
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}

// function blockButton(id) {
//     var order_dishes = get_cookie("order");
//     order_dishes = JSON.parse(order_dishes);
//     for (let j = 0; j < order_dishes.length; j++) {
//         if (order_dishes[j][0] == id) {
//             $('#button_' + id).attr("disabled", true);
//             $('#button_' + id).attr('onclick', '').unbind('click');
//         }
//     }
// }

console.log(getJsonArrayFromCoockie());
// deleteCookie("order");
console.log(get_cookie("order"));
function addToBasket(id, quantity) {
    $('#button_' + id).attr("disabled", true);
    $('#button_' + id).attr('onclick', '').unbind('click');
    var flag = 1;
    for (var i = 0; i < flag; i++) {
        var basket =
            '<div class="cart-dish" id="item_' + i + '">' +
            '<img src="images/dish1.jpg">' +
            '<div class="cart-col">' +
            '<div class="delete-dish"><a onclick="delete_from_basket(' + i + ')"><i class="fas fa-times"></i></a></div>' +
            '<p class="cart-dish-title">Салат</p>' +
            '<div class="count-dish"><div class="count-dish-btn"><a onclick="removeQuantityOfDish(' + i + ')"><i class="far fa-minus-square"></i></a></div><p id="qunt_' + i + '">' + quantity + '</p><div class="count-dish-btn"><a onclick="addQuantityOfDish(' + i + ')"><i class="far fa-plus-square"></i></a></div></div>' +
            '<p class="cart-dish-cost">100 грн</p></div></div>';
    }
    flag++;
    var date = new Date();
    var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    var dish = [id, quantity, time, 'comment'];
    if (get_cookie("order") == null) {
        var arrdish = [];
        arrdish[0] = dish;
        setCookie("order", JSON.stringify(arrdish));
        $('.cart-list').append(basket);

    } else {
        var order_dishes = get_cookie("order");
        var storedAry = JSON.parse(order_dishes);
        storedAry.push(dish);
        setCookie("order", JSON.stringify(storedAry));
        $('.cart-list').append(basket);


    }
}

function delete_from_basket(item_id) {
    $('#item_' + item_id).remove();
    var order_dishes = get_cookie("order");
    order_dishes = JSON.parse(order_dishes);
    for (let x = 0; x < order_dishes.length; x++) {
        if (item_id == x) {
            order_dishes.splice(item_id, 1);
        }
    }
    setCookie("order", JSON.stringify(order_dishes));
}

function addQuantityOfDish(item_id) {
    var order_dishes = get_cookie("order");
    order_dishes = JSON.parse(order_dishes);
    for (let x = 0; x < order_dishes.length; x++) {
        if (item_id == x) {
            order_dishes[x][1]++;
            $('#qunt_' + x).text(order_dishes[x][1])
        }
    }
    setCookie("order", JSON.stringify(order_dishes));
    console.log(getJsonArrayFromCoockie());
}

function removeQuantityOfDish(item_id) {
    var order_dishes = get_cookie("order");
    order_dishes = JSON.parse(order_dishes);
    for (let x = 0; x < order_dishes.length; x++) {
        if (item_id == x) {
            if (order_dishes[x][1] > 1) {
                order_dishes[x][1]--;
                $('#qunt_' + x).text(order_dishes[x][1]);
            }
        }
    }
    setCookie("order", JSON.stringify(order_dishes));
}


function getJsonArrayFromCoockie() {
    var order_dishes = get_cookie("order");
    order_dishes = JSON.parse(order_dishes);
    var jsonstr = '';
    for (let x = 0; x < order_dishes.length; x++) {
        var item = ',{"dish":{"id":' + order_dishes[x][0] + '},"quntity":' + order_dishes[x][1] + ',"time":' + order_dishes[x][2] + ',"comment":' + order_dishes[x][3] + '}'
        jsonstr += item;
    }
    return jsonstr.substr(1);
}

$(document).ready(function () {

    var order_dishes = get_cookie("order");
    order_dishes = JSON.parse(order_dishes);
    for (let x = 0; x < order_dishes.length; x++) {
        var basket =
            '<div class="cart-dish" id="item_' + x + '">' +
            '<img src="images/dish1.jpg">' +
            '<div class="cart-col">' +
            '<div class="delete-dish"><a onclick="delete_from_basket(' + x + ')"><i class="fas fa-times"></i></a></div>' +
            '<p class="cart-dish-title">Салат</p>' +
            '<div class="count-dish"><div class="count-dish-btn"><a onclick="removeQuantityOfDish(' + x + ')"><i class="far fa-minus-square"></i></a></div><p id="qunt_' + x + '">' + order_dishes[x][1] + '</p><div class="count-dish-btn"><a onclick="addQuantityOfDish(' + x + ')"><i class="far fa-plus-square"></i></a></div></div>' +
            '<p class="cart-dish-cost">100 грн</p></div></div>';
        $('.cart-list').append(basket);
        // blockButton(order_dishes, x);
    }
});

window.onload = function () {
    var order_dishes = get_cookie("order");
    order_dishes = JSON.parse(order_dishes);

    for (let j = 0; j < order_dishes.length; j++) {
        var pathToCart = 'button_' + order_dishes[j][0];
        var cart = document.getElementsByClassName('order-button');
        var cart2 = cart.getAttribute("id");

        // var div1 = document.getElementById("div1");
        // var align = div1.getAttribute("align");

        if (order_dishes[j][0] == cart) {
            $('#button_' + id).attr("disabled", true);
            $('#button_' + id).attr('onclick', '').unbind('click');
        }
    }
    setCookie("order", JSON.stringify(order_dishes));
}