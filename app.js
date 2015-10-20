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

var forecastURL = 'https://api.forecast.io/forecast/3b92d084eba98be94647fb144257ee75/';

function success(position){
  forecastURL += position.coords.latitude + ',';
  forecastURL += position.coords.longitude
  console.log(forecastURL);
  loadWeather();
}

function loadWeather() {
  $.ajax({
   
    url:  forecastURL,
    jsonpCallbaack: 'jsonpCallback',
    contentType: 'application/json',
    dataType: 'jsonp',
    success: function(json) {
      $('#currentTemp').html(json.currently.temperature + "&#8457"); //celcius for toggle val is &#8451
      $('#currentIcon').attr("data-icon", icons[json.currently.icon]);

      $('#currentDescription').html(json.currently.summary + ", wind speed of " + json.currently.windSpeed + " miles per hour.")

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
      $('span').html('&#8457');
    } else {
      $('span').html('&#8451');
    }
  }); //end toggle click function
}); //end document.ready

//note: either adding the location or wrapping the ajax in the function slowed load time WAY down. Investigate a fix?
//promises - make ajax hold off 

//json.flags.units - for Celcius conversion?