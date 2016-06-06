$(document).ready(function(){
  $(document).on('click', '.userList', function(){
    if($(this).attr('uid') != ''){
      $.ajax({
        type: "GET",
        url: "/api/users/" + $(this).attr('uid'),
        async: true,
        //data: JSON.stringify({ id: $('#userList').val() }),
        dataType: "json",
        success: function(user){
          user = user[0];
          $('input[name="id"]').val(user.id);
          $('input[name="name"]').val(user.name);
          $('input[name="email"]').val(user.email);
          if(user.admin){
            $('#adminTrue').parent().addClass('active');
          }else{
            $('#adminFalse').parent().addClass('active');
          }
          if(user.locked){
            $('#lockedTrue').parent().addClass('active');
          }else{
            $('#lockedFalse').parent().addClass('active');
          }
          $('#editUser').show();
        }
      });
    }else{
      $('#editUser').hide();
    }
  });

  $(document).on('click', '#updateUser', function(){
    var adminState, lockedState;
    if($('#adminTrue').parent().hasClass('active')){
      adminState = 1;
    }else{
      adminState = 0;
    }
    if($('#lockedTrue').parent().hasClass('active')){
      lockedState = 1;
    }else{
      lockedState = 0;
    }
    $.ajax({
      type: "PUT",
      url: "/api/users/update",
      async: true,
      data: {
        id: $('input[name="id"]').val(),
        name: $('input[name="name"]').val(),
        email: $('input[name="email"]').val(),
        admin: adminState,
        locked: lockedState
      },
      dataType: "json",
      success: function(result){
        if(result.Error){
          $('#errorBox').text(result.Message).slideDown();
          setTimeout(function(){$('#errorBox').slideUp()}, 10000);
        }else{
          $('#messageBox').text(result.Message).slideDown();
          setTimeout(function(){$('#messageBox').slideUp()}, 5000);
        }
      }
    });
  });
});
