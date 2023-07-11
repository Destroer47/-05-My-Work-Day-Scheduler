$(function () {
  let hourBox
  let hourBoxId
  $('.saveBtn').on("click", function(event) {
    hourBox = $(this).parent();
    hourBoxId = $(hourBox).attr('id');
    handleFormSubmit(event);
  });

  function handleFormSubmit(event) {
    event.preventDefault();
    let textInput = $(hourBox).children('textarea').val();
    localStorage.setItem(hourBoxId, textInput);
  }
  
  function hourBlocks() {
    let presentHour = dayjs();
    let currentHour = presentHour.format('H');
    let hourInt = parseInt(currentHour);
    for (let i=9; i < 18; i++) {
      let hourBlock = $('#hour-' + i);
      if (i < hourInt) {
        hourBlock.removeClass();
        hourBlock.addClass('row time-block past');
      }
      else if (i == hourInt) {
        hourBlock.removeClass();
        hourBlock.addClass('row time-block present');
      }
      else if (i > hourInt) {
        hourBlock.removeClass();
        hourBlock.addClass('row time-block future');
      }
    }
  }
  hourBlocks();
  setInterval(hourBlocks, 60000);

  function loadSavedSchedule() {
    for (let i=9; i < 18; i++) {
      let hourBlock = $('#hour-' + i);
      let hourBlockId = $(hourBlock).attr('id');
      let storageValue = localStorage.getItem(hourBlockId);
      $(hourBlock).children('textarea').val(storageValue);
    }
  }
  
  let currentDay = dayjs();
  $('#currentDay').text(currentDay.format('dddd, MMMM D'));
  loadSavedSchedule();
});