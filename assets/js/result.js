var API_KEY = 'fsq3b7GK2pzwGDNSHc+R0X6LmzlOcr4+aKCRMEfbmYXljlA=';
var CLIENT_ID = '24EUE2MY4GC5SVPZRAQNE4BIJ4VWY5Y5EBX3NCAQFVEFNMGM';
var CLIENT_SECRET = 'XTARJJ2DOUADKOAQ4GZJ1MY5KG53V2EKN3RQXGJBY0SNQXKH';


var latitude = localStorage.getItem("lat");
var longitude = localStorage.getItem("lon");

var restaurantElements = document.querySelectorAll('.restaurant');
var cityElement = document.querySelector('#searched-city');
var cardContainer = document.querySelector('#restaurant-cards');

var searchRestaurants = (latitude, longitude) => {
    return fetch(`https://api.foursquare.com/v2/venues/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${latitude},${longitude}&query=food&sortByPopularity=1&limit=3`, {

      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => data.response.venues)
    .catch(error => {
    console.error(error);
    return null;
  });
};


function displayCityName() {
    if(localStorage.getItem('cityName')){
        cityElement.textContent = localStorage.getItem('cityName');
    }
    else {
        cityElement.textContent = "UNKNOWN";
    }
};

function displayRestaurants() {

    // var restaurants = await searchRestaurants(latitude, longitude);
    // restaurantElements.forEach((element, index) => {
        var nameElement = document.querySelector('.frame__title');
        var ratingElement = document.querySelector('.frame__subtitle');
        var userElement = document.querySelector('.frame__body .frame__title');
        var reviewRatingElement = document.querySelector('.frame__body .frame__subtitle');
        var reviewTextElement = document.querySelector('.frame__body blockquote');

        //   nameElement.textContent = restaurants[index].name;
        //   ratingElement.textContent = `Rating: ${restaurants[index].rating}`;
        //   userElement.textContent = restaurants[index].reviews[0].user.name;
        //   reviewRatingElement.textContent = `Rating: ${restaurants[index].reviews[0].rating}`;
        //   reviewTextElement.textContent = restaurants[index].reviews[0].text;

        console.log(nameElement);
        console.log(ratingElement);
        console.log(userElement);
        console.log(reviewRatingElement);
        console.log(reviewTextElement);
    // });
};

displayCityName();
displayRestaurants();
searchRestaurants(latitude, longitude);


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
