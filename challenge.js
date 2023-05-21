// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
$(function () {
    const today = dayjs();
    const formattedDate = today.format('MM/DD/YYYY'); //dayjs function to give date for current day of the year 
    $('#currentDayEL').text(formattedDate);
  });
  
  $(document).ready(function () { // function for the entirety of time-blocks
    const currentTime = dayjs();
  
    $('.time-block').each(function() { //function to track time of day and change color of time blocks according to the time of day
        const timeBlock = $(this);
        const time = dayjs(timeBlock.attr('id'), 'hour-H');
      
        if (time.isSame(currentTime, 'hour')) {
            timeBlock.addClass('present');
          } else if (time.isAfter(currentTime, 'hour')) {
            timeBlock.addClass('future');
          } else {
            timeBlock.addClass('past');
          }
      }); // if/else staement for the said color change based on time of day
  
    $('.saveBtn').on('click', function() {
      const timeBlock = $(this).closest('.time-block');
      const description = timeBlock.find('.description').val();
      const time = timeBlock.attr('id');
      localStorage.setItem(time, description);
    });// saves text inside box to local storage
  
    $('.time-block').each(function() {
      const timeBlock = $(this);
      const time = timeBlock.attr('id');
      const savedDescription = localStorage.getItem(time);
  
      if (savedDescription) {
        timeBlock.find('.description').val(savedDescription);
      } // pulls info from local storage and displays it in time-block to which previous function saved it too
    });
  });
  

  
  