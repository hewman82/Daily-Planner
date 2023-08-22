// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var eventsList = [];
  $('.saveBtn').on('click', function saveInput() {
    var calHour = this.parentNode.id;
    var calDes = $(this).prev().val();
    var events = {
      hour: calHour,
      des: calDes
    }
    eventsList.push(events);
    localStorage.setItem('calEvents', JSON.stringify(eventsList));
  })

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var hour = dayjs().format('H');
  
  for(i=0;i<9;i++) {
    if($('section').children().eq(i).attr('id').includes(hour)) {
      $('section').children().eq(i).addClass('present');
      $('section').children().eq(i).prevAll().addClass('past');
      $('section').children().eq(i).nextAll().addClass('future');
    }
  }
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  var savedEvents = JSON.parse(localStorage.getItem('calEvents'));
  
  for(i = 0; i < savedEvents.length; i++) {
    var divId = savedEvents[i].hour;
    var desVal = savedEvents[i].des;
    $('#' + divId).children().eq(1).text(desVal);
  }

  //
  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(dayjs().format('ddd, MMM D'));
});
