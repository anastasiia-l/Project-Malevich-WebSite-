$(document).ready(function() {
  PopUp2Hide();
  PopUp3Hide();
  $("#form").validate({
    errorClass: "invalid",
    errorPlacement: function(error, element) {
      $(element)
        .closest("form")
        .find("label[for='" + element.attr("id") + "']")
        .attr("data-error", error.text());
    },
    rules: {
      reglogin: {
        required: true,
        minlength: 5,
        maxlength: 20,
        pattern: /^[а-яА-ЯёЁa-zA-Z0-9]{5,20}$/
      },
      regname: {
        required: true,
        minlength: 3,
        maxlength: 25,
        pattern: /^[а-яА-ЯёЁ ]{2,25}$/
      },
      regtel: {
        required: true,
        minlength: 13,
        pattern: /^(\+380)([0-9]){9}$/
      },
      birthdate: {
        required: true
      },
      regpassword: {
        required: true,
        minlength: 6,
        maxlength: 20,
        pattern: /^[а-яА-ЯёЁa-zA-Z0-9_!@#$%^&*]{6,20}$/,
      },
      confirmpassword: {
        required: true,
        equalTo: "#regpassword"
      }
    },
    //For custom messages
    messages: {
      reglogin: {
        required: "Enter a username",
        minlength: "Enter at least 5 characters"
      },
      regtel: "Enter your website"
    }
  });
});

//Функция отображения PopUp
function PopUp2Show() {
  $("#popup2").show();
}
//Функция скрытия PopUp
function PopUp2Hide() {
  $("#popup2").hide();
}
function clearRegForm(){
    $("#form")[0].reset();
}

function PopUp3Show() {
    $("#popup3").show();
  }
  //Функция скрытия PopUp
  function PopUp3Hide() {
    $("#popup3").hide();
  }

  