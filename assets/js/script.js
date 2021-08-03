//function to unhide section where results are stored
function unhideSection() {
  var r = document.getElementById("random-info");
  r.removeAttribute("hidden", "");
}

function hideSection() {
  var f = document.getElementById("favorites-info");
  f.setAttribute("hidden", "");
}

//functon takes the search value, plugs into api and fetches appropriate data, then pasting to the page
//onclick to start function
$("#searchForm").on("submit", function (e) {
  e.preventDefault();
  $(".brew-fav").css("color", "gray");
  $(".resto-fav").css("color", "gray");

  //started with city, changed to zip. Clean up later--
  var zip = $("#citySearch").val();

  //fetches restaurant data
  const documenuURL = {
    async: true,
    crossDomain: true,
    url: "https://documenu.p.rapidapi.com/restaurants/zip_code/" + zip,
    method: "GET",
    headers: {
      "x-api-key": "7f6e218886bdd6f0fce9dc02dfb05fb8",
      "x-rapidapi-key": "1bdc3065cbmsh2c702c1ffdb66ccp134e9ejsnbef151daa780",
      "x-rapidapi-host": "documenu.p.rapidapi.com",
    },
  };
  //sends restaurant data to the restaurant builder
  $.ajax(documenuURL).done(function (response) {
    console.log(response.data);
    buildRestaurantResults(response.data);
  });
});
//restaurant data function- pastes to page
function buildRestaurantResults(data) {
  //clears the area after a new search
  $("#restaurantHeader").empty();
  $("#restaurantInfo").empty();
  console.log(data);
  //this math variable selects a restaurant at random by using math.random on the list of api results from the search data, which is used later
  var restaurantNumber = Math.round(Math.random() * (data.length - 1));
  console.log(restaurantNumber);
  //variables below use the selected restaurant to grab sub data
  var selectedRestaurant = data[restaurantNumber].restaurant_name;
  // var restaurantCuisines = data[restaurantNumber].cuisines;
  var restaurantPriceRange = data[restaurantNumber].price_range;
  var restaurantAddress = data[restaurantNumber].address.formatted;
  var restaurantContact = data[restaurantNumber].restaurant_phone;
  var restaurantWebsite = data[restaurantNumber].restaurant_website;
  //creating a list to apply the data to
  restaurantEl = $("<ul>");
  // cuisinesEl = $("<li>");
  priceEl = $("<li>");
  addressEl = $("<li>");
  contactEl = $("<li>");
  restaurantWebsiteEl = $(
    '<li><a target=_blank href="' +
      restaurantWebsite +
      '" >' +
      restaurantWebsite +
      "</a></li>"
  );
  //add classes to play with how the info looks
  restaurantEl.addClass(".info");
  // cuisinesEl.addClass(".info");
  priceEl.addClass(".infoSub");
  addressEl.addClass(".infoSub");
  contactEl.addClass(".infoSub");
  restaurantWebsiteEl.addClass(".infoSub");
  restaurantWebsiteEl.addClass(".restaurantWebsiteEl");
  restaurantEl.text(selectedRestaurant);
  // cuisinesEl.text("Food Offerings: " + restaurantCuisines);
  priceEl.text(
    "Restaurant Price Range From 1 Being the Least Expensive to 4 Being the Most: " +
      restaurantPriceRange
  );

  //pasting the collected info to give the user intended results
  addressEl.text("Address: " + restaurantAddress);
  contactEl.text("Phone #: " + restaurantContact);
  $("#restaurantHeader").append(restaurantEl);
  // $("#restaurantInfo").append(cuisinesEl);
  $("#restaurantInfo").append(priceEl);
  $("#restaurantInfo").append(addressEl);
  $("#restaurantInfo").append(contactEl);
  $("#restaurantInfo").append(restaurantWebsiteEl);
  // $("#restaurantInfo").append(restaurantReservationEl);

  unhideSection();
  hideSection();
}

// leslie's
//favorites tool--
//uses local storaage to find any favorited items and displayed
var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
console.log(favorites);

// Set an event listener to save favorited brewery name to local storage
$("#brew-fav-btn").on("click", function () {
  var fav = $("#breweryHeader").text();
  console.log(fav);

  // Save input in local storage
  favorites.push(fav).text;
  localStorage.setItem("favorites", JSON.stringify(favorites));
  $(".brew-fav").css("color", "red");
});

// Set an event listener to save favorited restaurant name to local storage
$("#resto-fav-btn").on("click", function () {
  var fav = $("#restaurantHeader").text();

  // Save input in local storage
  favorites.push(fav).text;
  localStorage.setItem("favorites", JSON.stringify(favorites));
  $(".resto-fav").css("color", "red");
});

// Set an event listener to display favorited items when My Favorites button is clicked
$("#favs-btn").on("click", function (event) {
  event.preventDefault();
  var r = document.getElementById("random-info");
  var f = document.getElementById("favorites-info");

  r.setAttribute("hidden", "");
  f.removeAttribute("hidden", "");

  createFavoriteList();
});

function createFavoriteList() {
  if (favorites.length === 0) {
    return;
  } else {
    $("#list-container").empty();
    $("#list-container").html("<h2>My Favorites:</h2");
    var l = JSON.parse(localStorage.getItem("favorites"));
    console.log(l);
    for (let i = 0; i < l.length; i++) {
      var h4 = $("<h4>");
      var text = l[i];
      h4.text(text);
      $("#list-container").append(h4);
    }
  }
}

// Set an event listener for exit favorites button to close the favorites window
$("#close-favs").on("click", function (event) {
  event.preventDefault();
  var f = document.getElementById("favorites-info");
  var r = document.getElementById("random-info");

  f.setAttribute("hidden", "");
  r.setAttribute("hidden", "");
});
//same as restaurant onClick. redundant function due to split work- could clean up later
$("#searchForm").on("submit", function (e) {
  e.preventDefault();
  //zip variable used to grab the postal code from data and dsiplay results in the function
  var zip = $("#citySearch").val();
  //establisheds the API data+user input as a variable
  var openBrewURL =
    "https://api.openbrewerydb.org/breweries/search?query=" + zip;
  //fetches data and sends to the next function
  fetch(openBrewURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      buildBreweryResults(data);
    })
    .catch(function (error) {
      console.log("Error while fetching:", error);
    });
});
//builds the user inputed data and displays to the page to be interacted with
function buildBreweryResults(data) {
  //epmties out any existing brewery data for a new result, if desired
  $("#breweryHeader").empty();
  $("#breweryInfo").empty();

  console.log(data);
  //this math variable selects a brewery at random by using math.random on the list of api results from the search data, which is used later
  var breweryNumber = Math.round(Math.random() * (data.length - 1));
  console.log(breweryNumber);
  //collecting sub-data by using the randomly selected brewery
  var selectedBrewery = data[breweryNumber].name;
  var breweryType = data[breweryNumber].brewery_type;
  var breweryCity = data[breweryNumber].city;
  var breweryPostal = data[breweryNumber].postal_code;
  var breweryAddress = data[breweryNumber].street;
  var breweryContact = data[breweryNumber].phone;
  var breweryWebpage = data[breweryNumber].website_url;
  //establishes a list for the data to be posted in
  breweryEl = $("<ul>");
  typeEl = $("<li>");
  cityEl = $("<li>");
  postalEl = $("<li>");
  addressEl = $("<li>");
  contactEl = $("<li>");
  if (breweryWebpage == null) {
    breweryLinkEl = $("<li>*No webpage available*</li>");
  } else {
    breweryLinkEl = $(
      '<li><a target=_blank href="' +
        breweryWebpage +
        '" >' +
        breweryWebpage +
        "</a></li>"
    );
  }

  //establishing classes to style the posted data
  breweryEl.addClass(".info");
  typeEl.addClass(".infoSub");
  cityEl.addClass(".infoSub");
  postalEl.addClass(".infoSub");
  addressEl.addClass(".infoSub");
  contactEl.addClass(".infoSub");
  breweryLinkEl.addClass(".infoSub");
  // breweryLinkEl.addClass(".breweryLinkEl");
  breweryEl.text(selectedBrewery);
  typeEl.text("Brewery Type: " + breweryType);
  cityEl.text("City: " + breweryCity);
  postalEl.text("Zip Code: " + breweryPostal);
  addressEl.text("Street: " + breweryAddress);
  contactEl.text("Phone #: " + breweryContact);

  //appends all the data to the page to give the user desired results
  $("#breweryHeader").append(breweryEl);
  $("#breweryInfo").append(typeEl);
  $("#breweryInfo").append(cityEl);
  $("#breweryInfo").append(postalEl);
  $("#breweryInfo").append(addressEl);
  $("#breweryInfo").append(contactEl);
  $("#breweryInfo").append(breweryLinkEl);
}
