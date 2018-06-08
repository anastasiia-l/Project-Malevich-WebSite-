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
// deleteCookie("order");
console.log(get_cookie("order"));

function addToBasket(id, quantity) {
    $('#button_' + id).attr("disabled", true);
    $('#button_' + id).attr('onclick', '').unbind('click');
    var date = new Date();
    var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    if (get_cookie("order") == null) {

        var dish = [{
            "dish": {"id": '+id+'},
            "quantity": '+quantity+',
            "time": "'+time+'",
            "comment": "comment"
        }];

        setCookie("order", dish);
        console.log(get_cookie("order"));
        $('#button_' + id).attr("disabled", true);
    } else {

        var order_dishes = get_cookie("order");
        var dish = {
            "dish": {"id": '+id+'},
            "quantity": '+quantity+',
            "time": "'+time +'",
            "comment": "comment"
        };
        order_dishes.push(dish);
        setCookie("order", order_dishes);
        console.log(order_dishes);

    }
}

function delete_from_basket(item_id) {
    $('#item_' + item_id).remove();
    var order_dishes = '[' + get_cookie("order") + ']';
    order_dishes = JSON.parse(order_dishes);
    console.log(order_dishes);
    for (let x = 0; x < order_dishes.length; x++) {
        if (item_id == x) {
            order_dishes.splice(item_id, 1);
        }
    }
    order_dishes = JSON.stringify(order_dishes);
    order_dishes = order_dishes.substr(1);
    order_dishes = order_dishes.substr(0, -1);
    console.log(order_dishes);
    setCookie("order", order_dishes);
    console.log(order_dishes);

}

$(document).ready(function () {
    console.log(get_cookie("order"));
    var order_dishes = '[' + get_cookie("order") + ']';
    order_dishes = JSON.parse(order_dishes);

    // alert(order_dishes);
    for (let x = 0; x < order_dishes.length; x++) {
        var basket =
            '<tr id="item_' + x + '"><td><div class="Item_Image"><img src="#" alt="Фото"></div>	</td>' +
            '<td><div class="Item_name">Название</div></td>' +
            '<td><a onclick="delete_from_basket(' + x + ')">X</a></td></tr>';
        $('.busket').append(basket);
    }
});