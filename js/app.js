var icons = {
  'clear-day': 'B',
  'clear-night': 'C',
  'rain': 'R',
  'snow': 'W',
  'sleet': 'X',
  'wind': 'S',
  'fog': 'N',
  'cloudy': 'Y',
  'partly-cloudy-day': 'H',
  'partly-cloudy-night': 'I',
};

var imgs = {
  'clear-day': 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/272161/sun_kitten.jpg)',
  'clear-night': 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/272161/clearnight_kitten.jpg)',
  'rain': 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/272161/rain2.png)',
  'snow': 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/272161/snow_cat.jpg)',
  'sleet': 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/272161/snow_cat.jpg)',
  'wind': 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/272161/windy_kitten.jpg)',
  'fog': 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/272161/foggy_kitten_2.jpg)',
  'cloudy': 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/272161/Cute-Little-Kitten-HD-Wallpapers.jpg)',
  'partly-cloudy-day': 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/272161/partlycloudy_kitten2.jpg)',
  'partly-cloudy-night': 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/272161/partlycloudynightcat.jpg)',
};

 var forecastURL = '';

 var windUnits = 'miles';

//forecastURL query changes based on the toggle slide
function setUnits(){
  var toggleControl =  $('#buttonone').attr('class');
  var units = '';

  if(toggleControl === 'F') {         //need to also change units in windspeed string.

    units = 'us';                     //units change when variable changes, but toggle button isn't working.
  } else {                                //not sure if that's a scope problem with the functions vs document.ready
    units = 'si';
  };

  return units;
};


function success(position){

  var units = setUnits();


  forecastURL = '';

  forecastURL = 'https://api.forecast.io/forecast/3b92d084eba98be94647fb144257ee75/'

  forecastURL += position.coords.latitude + ',';
  forecastURL += position.coords.longitude + '?units=' + units;

  console.log(forecastURL);
  loadWeather();
}


function loadWeather() {
  $.ajax({

    url:  forecastURL,
    jsonpCallback: 'jsonpCallback',
    contentType: 'application/json',
    dataType: 'jsonp',
    exclude: 'hourly',
    success: function(json) {
      $('#currentTemp').html(json.currently.temperature + "&#176");
      $('#currentIcon').attr("data-icon", icons[json.currently.icon]);

      $('#currentDescription').html(json.currently.summary + ", wind speed of " + json.currently.windSpeed + " " + windUnits +" per hour.")

      $('.wrapper').css({
        'background': 'linear-gradient(#ffffff, transparent 30%), linear-gradient(0deg, #ffffff, transparent),' + imgs[json.currently.icon] + 'no-repeat center fixed'
      });

      $('.wrapper').css({
        'background-size': 'cover'
      });

      var currentIcon = $('#current-icon').attr('data-icon');
      if(currentIcon == 'I'){
        $('#main-content').css({
          'color' : 'fff'
        });
      };

    }, //end success

    error: function(e) {
      console.log("Hmmm. Something's not right.");
    } //end error

    }); //end ajax request
}; //end loadWeather



$(document).ready(function() {
 navigator.geolocation.getCurrentPosition(success);


  //toggle click
  $('#buttonone').click(function() {


    $(this).toggleClass('F');

    if ($("#buttonone").is('.F')) {
      windUnits = 'miles';
      $('span').html('&#8457');
    } else {
      windUnits = 'kilometers';
      $('span').html('&#8451');
    };

    navigator.geolocation.getCurrentPosition(success);

  }); //end toggle click function
}); //end document.ready

//note: either adding the location or wrapping the ajax in the function slowed load time WAY down. Investigate a fix?
