/*
Pseudocode area
1:Get the page elements
2:load apis
3: place items in appropriate divs
4:
*/
$("#searchForm").on("submit", function (e) {
  e.preventDefault();
  var zip = $("#citySearch").val();

  const documenuURL = {
    async: true,
    crossDomain: true,
    url: "https://documenu.p.rapidapi.com/restaurants/zip_code/" + zip,
    method: "GET",
    headers: {
      "x-api-key": "0078f0df6388023e57146b690339b490",
      "x-rapidapi-key": "1bdc3065cbmsh2c702c1ffdb66ccp134e9ejsnbef151daa780",
      "x-rapidapi-host": "documenu.p.rapidapi.com",
    },
  };

  $.ajax(documenuURL).done(function (response) {
    console.log(response.data);
    buildRestaurantResults(response.data);
  });

  // fetch(documenuURL)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (restaurantResponse) {
  //     console.log(restaurantResponse);

  //     buildRestaurantResults(restaurantResponse.data);
  //   })
  //   .catch(function (error) {
  //     console.log("Error while fetching:", error);
  //   });
});

function buildRestaurantResults(data) {
  $("#restaurantHeader").empty();
  $("#restaurantInfo").empty();
  console.log(data);

  var restaurantNumber = Math.round(Math.random() * data.length - 1);
  console.log(restaurantNumber);

  var selectedRestaurant = data[restaurantNumber].restaurant_name;
  // var restaurantCuisines = data[restaurantNumber].cuisines;
  var restaurantPriceRange = data[restaurantNumber].price_range;
  var restaurantAddress = data[restaurantNumber].address.formatted;
  var restaurantContact = data[restaurantNumber].restaurant_phone;
  var restaurantWebsite = data[restaurantNumber].restaurant_website;
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
  addressEl.text("Address: " + restaurantAddress);
  contactEl.text("Phone #: " + restaurantContact);
  $("#restaurantHeader").append(restaurantEl);
  // $("#restaurantInfo").append(cuisinesEl);
  $("#restaurantInfo").append(priceEl);
  $("#restaurantInfo").append(addressEl);
  $("#restaurantInfo").append(contactEl);
  $("#restaurantInfo").append(restaurantWebsiteEl);
  $("#restaurantInfo").append(restaurantReservationEl);
}

// leslie's
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
    for (let i = 0; i < favorites.length; i++) {
      var h4 = $("<h4>");
      var text = favorites[i];
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
  r.removeAttribute("hidden");
});

$("#searchForm").on("submit", function (e) {
  e.preventDefault();
  var city = $("#citySearch").val();
  var openBrewURL =
    "https://api.openbrewerydb.org/breweries/search?query=" + city;

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

  // localStorage.getItem(buildBreweryResults);
  // localStorage.setItem(cityListEl, buildBreweryResults);

  // cityButton.text = $('#searchBar').val();
  // $('searchResults').append.cityButton;
});

function buildBreweryResults(data) {
  $("#breweryHeader").empty();
  $("#breweryInfo").empty();

  console.log(data);
  var breweryNumber = Math.round(Math.random() * data.length - 1);
  console.log(breweryNumber);
  var selectedBrewery = data[breweryNumber].name;
  var breweryType = data[breweryNumber].brewery_type;
  var breweryCity = data[breweryNumber].city;
  var breweryAddress = data[breweryNumber].street;
  var breweryContact = data[breweryNumber].phone;
  var breweryWebpage = data[breweryNumber].website_url;

  breweryEl = $("<ul>");
  typeEl = $("<li>");
  cityEl = $("<li>");
  addressEl = $("<li>");
  contactEl = $("<li>");
  breweryLinkEl = $(
    '<li><a target=_blank href="' +
      breweryWebpage +
      '" >' +
      breweryWebpage +
      "</a></li>"
  );

  breweryEl.addClass(".info");
  typeEl.addClass(".infoSub");
  cityEl.addClass(".infoSub");
  addressEl.addClass(".infoSub");
  contactEl.addClass(".infoSub");
  breweryLinkEl.addClass(".infoSub");
  breweryLinkEl.addClass(".breweryLinkEl");
  breweryEl.text(selectedBrewery);
  typeEl.text("Brewery Type: " + breweryType);
  cityEl.text("City: " + breweryCity);
  addressEl.text("Street: " + breweryAddress);
  contactEl.text("Phone #: " + breweryContact);

  $("#breweryHeader").append(breweryEl);
  $("#breweryInfo").append(typeEl);
  $("#breweryInfo").append(cityEl);
  $("#breweryInfo").append(addressEl);
  $("#breweryInfo").append(contactEl);
  $("#breweryInfo").append(breweryLinkEl);
}