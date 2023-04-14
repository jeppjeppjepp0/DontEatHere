var latitude = localStorage.getItem("lat");
var longitude = localStorage.getItem("lon");

var sunriseElement = document.querySelector('#sunrise-time');
var sunsetElement = document.querySelector('#sunset-time');
var cityElement = document.querySelector('#searched-city');


var sunInfo1;
var sunInfo2;

function displayCityName() {
    if(localStorage.getItem('cityName')){
        cityElement.textContent = localStorage.getItem('cityName');
    }else {
        cityElement.textContent = "UNKNOWN";
    }
};

function displaySunriseSunset() {

    console.log(sunInfo1);
    console.log(sunInfo2);
    document.querySelector("#sunrise-1").textContent = sunInfo1.sunrise;
    document.querySelector("#sunrise-2").textContent = sunInfo2.sunrise;
    document.querySelector('#sunset-1').textContent = sunInfo1.sunset;
    document.querySelector('#sunset-2').textContent = sunInfo2.sunset;
    document.querySelector('#day-length1').textContent = sunInfo1.day_length;
    document.querySelector('#day-length2').textContent = sunInfo2.day_length;

};

function searchSunriseSunsetToday(lat, lon){
    fetch('https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lon + '&date=today')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('sunInfo1', JSON.stringify(data.results));
        })
        .catch(error => {
            console.error(error);
            return null;
        });
}

function searchSunriseSunsetEquinox(lat, lon){
    fetch('https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lon + '&date=2023-07-21')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('sunInfo2', JSON.stringify(data.results));

        })
        .catch(error => {
            console.error(error);
            return null;
        });
}

displayCityName();


searchSunriseSunsetToday(latitude, longitude);
sunInfo1 = JSON.parse(localStorage.getItem('sunInfo1'));

searchSunriseSunsetEquinox(latitude, longitude, "2023-07-21");
sunInfo2 = JSON.parse(localStorage.getItem('sunInfo2'));

displaySunriseSunset();



var returnHomeBtn = document.querySelector("#return-home");

function handleReturnHome(){
    document.location = "./index.html";
}

returnHomeBtn.addEventListener("click", handleReturnHome)



/*
read city name
print 3 results from yelp
event reader to return to home screen
    on click, return to home screen
*/
