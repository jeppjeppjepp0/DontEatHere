var yelpEndpoint = "https://api.yelp.com/v3/business/search";

var params = {
    Term: "restaurants",
    location: "San Francisco",
    limit: 3
};

var headers = { 
    Authorization:"Bearer 70Qz_TnQu1CogX0wCS1CoMbduwaXZhLz_Mk2UY8nPdkSjVqwUTphv4secp5O5YT83wQt-DvkZBPAGDfOU25DNxeCrDnlY2kB5MF0tSFbFqMQS-Xy_lflAezsmnQ0ZHYx"
};

fetch(`${yelpEndpoint}?${new URLSearchParams(params)}`, {

})

.then(response => response.json())
.then(data => {

    data.business.forEach(business => {
        console.log(business.name);
    });

})
.catch(error => {
    console.error(error);
});

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