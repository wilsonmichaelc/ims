$(document).on('click', '#profile', function(){
  $.ajax({
    url: "/api/users",
    type: "PUT",
    contentType: 'application/json',
    async: true,
    data: JSON.stringify({ id: $('#id').val(), name: $('#name').val(), email: $('#email').val() }),
    dataType: "json",
    success: function(message){
      console.log(message);
    }
  });
});

$(document).on('focusout', '#currentPassword', function(){
  $.ajax({
    type: "POST",
    url: "/api/verify",
    contentType: 'application/json',
    async: true,
    data: JSON.stringify({ id: $('#id').val(), password: $('#currentPassword').val() }),
    dataType: "json",
    success: function(response){
      console.log(response);
    }
  });
});

$(document).on('click', '#credentials', function(){
  var current = $('#currentPassword').val()
  var newPassword = $('#newPassword').val()
  var newRepeat = $("newPasswordRepeat").val()

  $.ajax({
    url: "/api/users",
    type: "PUT",
    contentType: 'application/json',
    async: true,
    data: JSON.stringify({ id: $('#id').val(), currentPassword: current, newPassword: newPassword, newPasswordRepeat: newRepeat }),
    dataType: "json",
    success: function(message){
      console.log(message);
    }
  });
});
