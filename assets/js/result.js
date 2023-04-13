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

var restaurantElements = document.querySelectorAll('.restaurant');
var cityElement = document.querySelector('span');

var displayCityName = () => {
  fetch(`https://api.yelp.com/v3/businesses/search?term=food&latitude=${latitude}&longitude=${longitude}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const city = data.businesses[0].location.city;
      const state = data.businesses[0].location.state;
      cityElement.textContent = `${city}, ${state}`;
    })
    .catch((error) => {
      console.error("error");
      cityElement.textContent = 'Unknown city';
    });
};

var displayRestaurants = async () => {
  try {
    var restaurants = await searchRestaurants(latitude, longitude);
    restaurantElements.forEach((element, index) => {
      var nameElement = element.querySelector('.frame__title');
      var ratingElement = element.querySelector('.frame__subtitle');
      var userElement = element.querySelector('.frame__body .frame__title');
      var reviewRatingElement = element.querySelector('.frame__body .frame__subtitle');
      var reviewTextElement = element.querySelector('.frame__body blockquote');

      nameElement.textContent = restaurants[index].name;
      ratingElement.textContent = `Rating: ${restaurants[index].rating}`;
      userElement.textContent = restaurants[index].reviews[0].user.name;
      reviewRatingElement.textContent = `Rating: ${restaurants[index].reviews[0].rating}`;
      reviewTextElement.textContent = restaurants[index].reviews[0].text;
    });
  } catch (error) {
    console.error(error);
  }
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
