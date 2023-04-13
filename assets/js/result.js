var API_KEY = 'fsq3b7GK2pzwGDNSHc+R0X6LmzlOcr4+aKCRMEfbmYXljlA=';

var latitude = localStorage.getItem("lat");
var longitude = localStorage.getItem("lon");


var searchRestaurants = (latitude, longitude) => {
    return fetch(`https://api.yelp.com/v3/businesses/search?term=food&latitude=${latitude}&longitude=${longitude}&sort_by=rating&limit=3`, {

      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    .then(response => response.json())
    .then(data => data.businesses)
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
