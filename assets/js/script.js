var inputArea = document.querySelector('#inputArea');
var cityInput = document.querySelector("#cityName");
let varLat;
let varLon;
let varCity;
let prevSearches = [];


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

                varLat = data[0].lat;
                varLon = data[0].lon;
                varCity = data[0].name;

                console.log(varCity);
                console.log(varLat);
                console.log(varLon);

                pullPrevSearches();

                prevSearches = prevSearches.concat({varCity, varLat, varLon});
                console.log(prevSearches);

                // Saving data to local storage
                localStorage.setItem('cityName', varCity);
                localStorage.setItem('lat', varLat);
                localStorage.setItem('lon', varLon);

                localStorage.setItem('prevSearches', JSON.stringify(prevSearches));
            });
        } else {
            alert('Error: unable to find city');
        }
    });
}

function pullPrevSearches(){
    if (localStorage.getItem("prevSearchArray")){
        prevSearches = JSON.parse(localStorage.getItem('prevSearches'));
        for (var i = 0; i < prevSearches.length; i++){
            // print stuff
        }
    }
}


inputArea.addEventListener('submit', formSubmitHandler);
 