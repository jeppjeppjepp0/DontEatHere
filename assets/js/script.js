var inputArea = document.querySelector('#inputArea');
var cityInput = document.querySelector("#cityName");
let varLat
let varLon
let varCity

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
        //   getWeather(data, varLat, varLon);
          varLat = data[0].lat;
          varLon = data[0].lon;
          varCity = data[0].name;
          console.log(varCity)
          console.log(varLat)
          console.log(varLon)
              // Saving data to local storage
      localStorage.setItem('cityName', varCity);
      localStorage.setItem('lat', varLat);
      localStorage.setItem('lon', varLon);
        });
      } else {
        alert('Error: unable to find city');
      }
    })
}

var prevSearches = [];
{varCity, varLat, varLon};
localStorage.setItem('key', JSON.stringify(prevSearches));

inputArea.addEventListener('submit', formSubmitHandler);
 