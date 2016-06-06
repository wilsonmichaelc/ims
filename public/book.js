$(document).ready(function(){

  $('#dateTimeFrom').datetimepicker({minDate: moment()});
  $('#dateTimeTo').datetimepicker({minDate: moment()});

  $('#calendar').fullCalendar({
    events: 'api/bookings',
    dayClick: function(date, jsEvent, view) {
      $('#dateTimeFrom').data({date: date.format()});
      $('#add-booking').modal({"backdrop" : "static"});
    },
    eventMouseover: function(event, jsEvent, view){
      console.log(event.title);
      console.log(event.user);
      console.log(event.start);
      console.log(event.end);
    }
  });

  $(document).on('click', 'a.instrumentList', function(){
    $('#instrumentListTitle').text($(this).text());
  });

});
