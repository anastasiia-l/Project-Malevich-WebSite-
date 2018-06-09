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

console.log(getJsonArrayFromCoockie());
// deleteCookie("order");
// console.log(get_cookie("order"));
function addToBasket(id, quantity) {
    $('#button_' + id).attr("disabled", true);
    $('#button_' + id).attr('onclick', '').unbind('click');
    var flag = 1;
    for (var i = 0; i < flag; i++) {
        var basket =
            '<tr id="item_' + i + '"><td><div class="Item_Image"><img src="#" alt="Фото"></div>	</td>' +
            '<td><div class="Item_name">Название</div></td>' +
            '<td><a onclick="delete_from_basket(' + i + ')">X</a></td></tr>';
    }
    flag++;
    var date = new Date();
    var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    var dish = [id, quantity, time, 'comment'];
    if (get_cookie("order") == null) {
        var arrdish = [];
        arrdish[0] = dish;
        setCookie("order", JSON.stringify(arrdish));
        $('.busket').append(basket);
    } else {
        var order_dishes = get_cookie("order");
        var storedAry = JSON.parse(order_dishes);
        storedAry.push(dish);
        setCookie("order", JSON.stringify(storedAry));
        $('.busket').append(basket);

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

// function blockButton(order_dishes, id) {
//     for (let j = 0; j < order_dishes.length; j++) {
//         if (order_dishes[j][0] == id) {
//             $('#button_' + id).attr("disabled", true);
//             $('#button_' + id).attr('onclick', '').unbind('click');
//             return true;
//         }
//     }
//     return false;

// }

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
            '<tr id="item_' + x + '"><td><div class="Item_Image"><img src="#" alt="Фото"></div>	</td>' +
            '<td><div class="Item_name">Название</div></td>' +
            '<td><a onclick="delete_from_basket(' + x + ')">X</a></td></tr>';
        $('.busket').append(basket);
        // blockButton(order_dishes, x);
    }

});