/*
Pseudocode area
1:Get the page elements
2:load apis
3: place items in appropriate divs
4:
*/
$('#searchForm').on('submit', function(e){
    e.preventDefault();
    var city = $('#citySearch').val();
    var state = $('#stateSearch').val();
    var cityListEl = $('<li>').text(city);
    var openTableURL = "https://opentable.herokuapp.com/api" + city
  fetch(openTableURL)
  .then(function(response){
    return response.json()
  })
  .then(function(data) {
    buildRestaurantResults(data)
   })
  .catch(function(error){
     console.log('Error while fetching:', error);
  });
  })
  function buildRestaurantResults(data) {
   $("#restaurantHeader").empty();
   $("#restaurantInfo").empty();
    console.log(data);

  var restaurantNumber = (Math.round((Math.random() * data.length-1)));
    console.log(restaurantNumber);
  var selectedRestaurant = data[restaurantNumber].name;
  var restaurantPrice = data[restaurantNumber].price;
  var restaurantAddress = data[restaurantNumber].address;
  var restaurantContact = data[restaurantNumber].phone;
  var restaurantReservation = data[restaurantNumber].reserve_url;
  restaurantEl = $('<ul>');
  priceEl = $('<li>');
  addressEl = $('<li>');
  contactEl = $('<li>');
  restaurantReservationEl = $('<li><a href="'+reserve_url+'" >'+reserve_url+'</a></li>');
  restaurantEl.addClass('.info');
  priceEl.addClass('.infoSub');
  addressEl.addClass('.infoSub');
  contactEl.addClass('.infoSub');
  restaurantReservationEl.addClass('.infoSub');
  restaurantReservationEl.addClass('.restaurantReservationEl');
  restaurantEl.text(selectedRestaurant);
  typeEl.text("Restaurant Price Range From 1 Being the Least Expensive to 4 Being the Most: " + restaurantPrice);
  addressEl.text("Address: " + restaurantAddress);
  contactEl.text("Phone #: " + restaurantContact);
  $('#restaurantHeader').append(restaurantEl);
  $("#restaurantInfo").append(priceEl);
  $("#restaurantInfo").append(addressEl);
  $("#restaurantInfo").append(contactEl);
  $("#restaurantInfo").append(restaurantReservationEl);
  }