var latitude = localStorage.getItem("lat");
var longitude = localStorage.getItem("lon");

var sunriseElement = document.querySelector('#sunrise-time');
var sunsetElement = document.querySelector('#sunset-time');
var cityElement = document.querySelector('#searched-city');

function displayCityName() {
    if(localStorage.getItem('cityName')){
        cityElement.textContent = localStorage.getItem('cityName');
    }else {
        cityElement.textContent = "UNKNOWN";
    }
};

function displaySunriseSunset() {

    var sunInfo1;
    var sunInfo2;
    searchSunriseSunset

    sunInfo1 = searchSunriseSunset(latitude, longitude, "today");
    sunInfo1 = JSON.parse(localStorage.getItem('sunInfo'));
    sunInfo2 = searchSunriseSunset(latitude, longitude, "2023-07-21");
    sunInfo2 = JSON.parse(localStorage.getItem('sunInfo'));
console.log(sunInfo1);
console.log(sunInfo2);
    document.querySelector("#sunrise-1").textContent = sunInfo1.sunrise;
    document.querySelector("#sunrise-2").textContent = sunInfo2.sunrise;


};

function searchSunriseSunset(lat, lon, day){
    fetch('https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lon + '&date=' + day)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('sunInfo', JSON.stringify(data.results));
        })
        .catch(error => {
            console.error(error);
            return null;
        });
}

displayCityName();
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
