var inputArea = document.querySelector('#inputArea');
var cityInput = document.querySelector("#cityName");
var prevSearchEl = document.querySelector("#prev-search");
let varLat;
let varLon;
let varCity;
let prevSearches = [];

function pullPrevSearches(){
    if (localStorage.getItem("prevSearches")){
        prevSearches = JSON.parse(localStorage.getItem('prevSearches'));
        console.log(prevSearches);
        for (var i = 0; i < prevSearches.length; i++){
            // make button
            var newBtn = document.createElement("button");
            // add text
            newBtn.setAttribute("class", "prev-search-btn");
            newBtn.textContent = prevSearches[i].city;
            // append
            prevSearchEl.appendChild(newBtn);
        }
    }
    else {
        prevSearches = [];
    }
}

function storePrevSearches(currCity, currLat, currLon){
    prevSearches = prevSearches.concat({city: currCity, currLat: currLat, lon: currLon});
    console.log(prevSearches);
    localStorage.setItem('prevSearches', JSON.stringify(prevSearches));
}

function storeCurrSearch(currCity, currLat, currLon){
    localStorage.setItem('cityName', currCity);
    localStorage.setItem('lat', currLat);
    localStorage.setItem('lon', currLon);
}

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
                console.log(data);

                varLat = data[0].lat;
                varLon = data[0].lon;
                varCity = data[0].name;

                pullPrevSearches();
                storePrevSearches(varCity, varLat, varLon);
                storeCurrSearch(varCity, varLat, varLon);

                document.location = "./result.html"
            });
        } else {
            alert('Error: unable to find city');
        }
    });
}

function handleBtnClick(event){
    var clickedCity = event.target.textContent;

    var cityUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+ clickedCity + '&appid=e7061ed9c868477223ac6802888315d2';

    fetch(cityUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                varLat = data[0].lat;
                varLon = data[0].lon;
                varCity = data[0].name;

                // Saving data to local storage
                storeCurrSearch(varCity, varLat, varLon);

                document.location = "./result.html"
            });
        } else {
            alert('Error: unable to find city');
        }
    });
}

pullPrevSearches();
inputArea.addEventListener('submit', formSubmitHandler);
prevSearchEl.addEventListener('click', handleBtnClick);
 