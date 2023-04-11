var inputArea = document.querySelector('#inputArea');
var cityInput = document.querySelector("#cityName");
let varLat
let varLon

var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityname= cityInput.value;
      
        if (cityname) {
          getCityLocation(cityname);
      
        } else {
          alert('Please enter proper city name');
        }
    };
    
    var getCityLocation = function(city){
    var cityUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+ city + '&appid=e7061ed9c868477223ac6802888315d2';


    fetch(cityUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
          getWeather(data, varLat, varLon);
          varLat = data[0].lat;
          varLon = data[0].lon;
          console.log(varLat)
          console.log(varLon)
        });
      } else {
        alert('Error: unable to find city');
      }
    })
}


inputArea.addEventListener('click', formSubmitHandler);
 