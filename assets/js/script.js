var inputArea = document.querySelector('#inputArea');
var cityInput = document.querySelector("#cityName");
var prevSearchEl = document.querySelector("#prev-search");
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

                prevSearches = prevSearches.concat({city: varCity, lat: varLat, lon: varLon});
                console.log(prevSearches);

                // Saving data to local storage
                localStorage.setItem('cityName', varCity);
                localStorage.setItem('lat', varLat);
                localStorage.setItem('lon', varLon);

                localStorage.setItem('prevSearches', JSON.stringify(prevSearches));

                document.location = "./result.html"
            });
        } else {
            alert('Error: unable to find city');
        }
    });
}

function pullPrevSearches(){
    if (localStorage.getItem("prevSearches")){
        prevSearches = JSON.parse(localStorage.getItem('prevSearches'));
        console.log(prevSearches);
        for (var i = 0; i < prevSearches.length; i++){
            // print stuff
            // make button
            var newBtn = document.createElement("button");
            // add text
            newBtn.textContent = prevSearches[i].city;
            // append
            prevSearchEl.appendChild(newBtn);
        }
    }
    else {
        prevSearches = [];
    }
}

function handleBtnClick(){
    
}

pullPrevSearches();
inputArea.addEventListener('submit', formSubmitHandler);
prevSearchEl.addEventListener('click', handleBtnClick);
 