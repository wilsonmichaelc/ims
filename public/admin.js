$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "/api/users",
    async: true,
    dataType: "json",
    success: function(users){
      for (var i=0; i<users.length; i++) {
        var option = document.createElement("option");
        option.text = users[i].name
        option.value = users[i].id
        var select = document.getElementById("userList");
        select.appendChild(option);
      }

    }
  });

  $(document).on('change', '#userList', function(){
    $.ajax({
      type: "GET",
      url: "/api/users/" + $('#userList').val(),
      async: true,
      //data: JSON.stringify({ id: $('#userList').val() }),
      dataType: "json",
      success: function(user){
        console.log(user);
      }
    });
  });
});
