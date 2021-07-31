/*
Pseudocode area
1:Get the page elements
2:load apis
3: place items in appropriate divs
4:
*/
$('#searchForm').on('submit', function(e){
    e.preventDefault();
    var zip = $('#zipCode').val();

    var documenuURL = "https://api.documenu.com/v2/restaurant/4072702673999819?key=0078f0df6388023e57146b690339b490";

    fetch(documenuURL)
  .then(function(response){
    return response.json()
  })
  .then(function(datarestaurantResponse) {
    console.log(RestaurantResponse)

    buildRestaurantResults(RestaurantResponse)
   })
  .catch(function(error){
    console.log('Error while fetching:', error);
  })
  });

  function buildRestaurantResults(data) {
   $("#restaurantHeader").empty();
   $("#restaurantInfo").empty();
     console.log(data);

  var restaurantNumber = (Math.round((Math.random() * data.length-1)));
    console.log(restaurantNumber);

  var selectedRestaurant = data[restaurantNumber].restaurant_name;
  var restaurantCuisines = data[restaurantNumber].restaurant_id.cuisines;
  var restaurantPriceRange = data[restaurantNumber].price_range;
  var restaurantAddress = data[restaurantNumber].restaurant_id.address;
  var restaurantContact = data[restaurantNumber].restaurant_phone;
  var restaurantWebsite = data[restaurantNumber].restaurant_website;
  restaurantEl = $('<ul>');
  cuisinesEl = $('<li>')
  priceEl = $('<li>');
  addressEl = $('<li>');
  contactEl = $('<li>');
  restaurantWebsiteEl = $('<li><a href="'+restaurantWebsite+'" >'+restaurantWebsite+'</a></li>');
  restaurantEl.addClass('.info');
  cuisinesEl.addClass('.info');
  priceEl.addClass('.infoSub');
  addressEl.addClass('.infoSub');
  contactEl.addClass('.infoSub');
  restaurantWebsiteEl.addClass('.infoSub');
  restaurantWebsiteEl.addClass('.restaurantWebsiteEl');
  restaurantEl.text(selectedRestaurant);
  cuisinesEl.text("Food Offerings: " + restaurantCuisines);
  typeEl.text("Restaurant Price Range From 1 Being the Least Expensive to 4 Being the Most: " + restaurantPriceRange);
  addressEl.text("Address: " + restaurantAddress);
  contactEl.text("Phone #: " + restaurantContact);
  $("#restaurantHeader").append(restaurantEl);
  $("#restaurantInfo").append(cuisinesEl)
  $("#restaurantInfo").append(priceEl);
  $("#restaurantInfo").append(addressEl);
  $("#restaurantInfo").append(contactEl);
  $("#restaurantInfo").append(restaurantWebsiteEl);
  }