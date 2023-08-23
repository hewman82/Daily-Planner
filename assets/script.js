// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  //pull saved objects from storage or create empty array if nothing is saved
  var eventsList = JSON.parse(localStorage.getItem('calEvents')) || [];
  //add listener for click events on the save button
  $('.saveBtn').on('click', function saveInput() {
    //save id of parent div of button clicked
    var calHour = this.parentNode.id;
    //save text entered in textarea
    var calDes = $(this).prev().val();
    //save as key value pairs
    var events = {
      hour: calHour,
      des: calDes
    }
    //add key value pairs to array
    eventsList.push(events);
    //save array to storage
    localStorage.setItem('calEvents', JSON.stringify(eventsList));
  })

  //save current time in 24 hour format
  var hour = dayjs().format('H');
  //loop through child divs of section element
  for(i=0;i<9;i++) {
    //if div id matches current time
    if($('section').children().eq(i).attr('id').includes(hour)) {
      //change div class to present
      $('section').children().eq(i).addClass('present');
      //change all previous sibling div classes to past
      $('section').children().eq(i).prevAll().addClass('past');
      //change all subsequent sibling div classes to future
      $('section').children().eq(i).nextAll().addClass('future');
    }
    //if the current time is before 9am
    if(hour < 9) {
      //change all div classes to future
      $('section').children().addClass('future');
    }
    //if the current time is after 5pm
    if(hour > 17) {
      //change all div classes to past
      $('section').children().addClass('past');
    }
  }
  //if eventsList array isn't empty
  if(eventsList !== null) {
    //loop through saved objects
    for(i = 0; i < eventsList.length; i++) {
      //get div id from key value pair
      var divId = eventsList[i].hour;
      //get entered text from key value pair
      var desVal = eventsList[i].des;
      //select div with matching id, set text of textarea with entered text
      $('#' + divId).children().eq(1).text(desVal);
    }
  }

  //display current date to currentDay paragraph in header
  $('#currentDay').text(dayjs().format('ddd, MMM D'));
});
