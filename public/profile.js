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

$(document).on('change', '#currentPassword', function(){
  $.ajax({
    type: "GET",
    url: "/verify",
    async: true,
    data: JSON.stringify({ currentPassword: $('#currentPassword').val() }),
    dataType: "json",
    success: function(response){
      console.log(response);
    }
  });
});

$(document).on('click', '#credentials', function(){
  var current = $('#currentPassword').val()
  var new = $('#newPassword').val()
  var newRepeat = $("newPasswordRepeat").val()

  $.ajax({
    url: "/api/users",
    type: "PUT",
    contentType: 'application/json',
    async: true,
    data: JSON.stringify({ id: $('#id').val(), currentPassword: current, newPassword: new, newPasswordRepeat: newRepeat }),
    dataType: "json",
    success: function(message){
      console.log(message);
    }
  });
});
