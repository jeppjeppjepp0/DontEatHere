var API_KEY = '70Qz_TnQu1CogX0wCS1CoMbduwaXZhLz_Mk2UY8nPdkSjVqwUTphv4secp5O5YT83wQt-DvkZBPAGDfOU25DNxeCrDnlY2kB5MF0tSFbFqMQS-Xy_lflAezsmnQ0ZHYx';

var urlParams = new URLSearchParams(window.location.search);
var latitude = urlParams.get('latitude');
var longitude = urlParams.get('longitude');

var restaurantElements = document.querySelectorAll('.restaurant');
var cityElement = document.querySelector('#searched-city');
var cardContainer = document.querySelector('#restaurant-cards');

var searchRestaurants = async (latitude, longitude) => {
  try {
    var response = await fetch(`https://api.yelp.com/v3/businesses/search?term=food&latitude=${latitude}&longitude=${longitude}&sort_by=rating&limit=3`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    var data = await response.json();
    return data.businesses;
  } catch (error) {
    console.error(error);
    return null;
  }
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