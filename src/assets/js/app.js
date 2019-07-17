var $ = require('jquery');
var token = 'bb0521eb0ad7905fbfadf1c345a00988';
var req = `Vilnius`;

//date and time
var time, hh, mm; //variable time hours and minutes
var timer = ""; //reference variable for the timeout object
// var backdropTimer = ""; //backdrop timer(interval) variable reference
var clockDisplay = $('#clockDisplay'); //reference variable for the clock display
var dateDisplay = $('#dateDisplay'); //date display
var months = {0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',6:'Jul',7:'Aug',8:'Sept',9:'Oct',10:'Nov',11:'Dec'} //list of months in a year

$(function() {
  console.log('hi');
  startClock();

  //Get weather data
  function getWeather (req) {
    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?q=${req}&mode=json&units=metric&cnt=10&APPID=${token}`,
    }).done(function(data) {
      console.log(data);
      $('#curLocationDisplay').html(data.name);
      $('#currentCountyDisplay').html(data.sys.country);
      $('#windDisplay').html(data.wind.speed + " m/s");
      $('#tempDisplay').html(Number((data.main.temp).toFixed(0)) + " °C");
      $('#humidDisplay').html(data.main.humidity + " %");
    });
  }

  $("button").on('click', function(e){
    e.preventDefault();
    getWeather($('#search').val());
  });

  //GET THE CURRENT TIME
  function startClock()
  {
    timer = setTimeout(updateClockDisplay,500); //start clock
    // setBackdrop(); //set backdrop on page load
    // backdropTimer = setTimeout(setBackdrop,360000); //set interval to check for the right backdrop every hour
  }
  //Reset timer and clear the interval by its ID
  function resetClockTimer()
  {
    updateClockDisplay(); //make sure the current time is display when page load

    if(timer !== "")
    {
      clearTimeout(backdropTimer);
      clearTimeout(timer);
      timer = "";
    }
  }
  //Reset timer and clear the interval by its ID
  function resetWeatherTimer()
  {
     if(weatherTimer !== "")
    {
      clearTimeout(forecastTimer);
      clearTimeout(weatherTimer);
      weatherTimer = "";
      forecastTimer = "";
    }
  }
  // Get the current time by Date object
  function getTime()
  {
    time = new Date();

    hh = time.getHours();
    mm = time.getMinutes();

    displayCurrentDate(time); //update current date display

    return (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ?  '0' + mm : mm);
  }
  // Get current date and update display
  // format: MM, dd YYYY
  function displayCurrentDate(date)
  {
    dateDisplay.text(months[date.getMonth()] + ' ' +  date.getDate() + ', ' +date.getFullYear());
  }
  //Update clock display
  function updateClockDisplay()
  {
    clockDisplay.text(getTime());
    timer = setTimeout(updateClockDisplay,500); //set another timeout to update the clock display
  }
});
