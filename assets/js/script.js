var inputArea = document.querySelector('#inputArea');
var cityInput = document.querySelector("#cityName");
var prevSearchEl = document.querySelector("#prev-search");
var clearBtnEl = document.querySelector("#clear-history-btn");
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
            newBtn.setAttribute("class", "prev-search-btn"); //for styling
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
    // add current city to array
    prevSearches = prevSearches.concat({city: currCity, currLat: currLat, lon: currLon});
    prevSearches = _.sortBy(prevSearches, 'city'); // alphabetize
    console.log(prevSearches); // to see result
    // store to local storage
    localStorage.setItem('prevSearches', JSON.stringify(prevSearches));
}

function storeCurrSearch(currCity, currLat, currLon){
    // store current city information for results page
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
    var cityUrl = "https://api.tomtom.com/search/2/geocode/" + city + ".json?key=7dYNPA9FNut879KfPaG83uMkwHPL8rVV"    ;

    fetch(cityUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                varLat = data.results[0].position.lat;
                varLon = data.results[0].position.lon;
                varCity = data.results[0].address.municipality;

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

function handleBtnSearch(event){
    var clickedCity = event.target.textContent;

    var cityUrl = "https://api.tomtom.com/search/2/geocode/" + clickedCity + ".json?key=7dYNPA9FNut879KfPaG83uMkwHPL8rVV";

    fetch(cityUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                varLat = data.results[0].position.lat;
                varLon = data.results[0].position.lon;
                varCity = data.results[0].address.municipality;

                // Saving data to local storage
                storeCurrSearch(varCity, varLat, varLon);

                document.location = "./result.html"
            });
        } else {
            alert('Error: unable to find city');
        }
    });
}

function handleClear(){
    prevSearches = [];
    localStorage.setItem('prevSearches', JSON.stringify(prevSearches));

    var prevSearchLength = prevSearchEl.children.length;

    for (var i = 0; i < prevSearchLength; i++){
        // console.log(prevSearchEl.children[i]);
        prevSearchEl.children[0].remove();
    }
}

pullPrevSearches();


inputArea.addEventListener('submit', formSubmitHandler);
prevSearchEl.addEventListener('click', handleBtnSearch);
clearBtnEl.addEventListener('click', handleClear);
 