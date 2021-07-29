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

  var openBrewURL = "https://api.openbrewerydb.org/breweries/search?query=" + city


fetch(openBrewURL)
.then(function(response){
  return response.json()
})
.then(function(data) {
  buildBreweryResults(data)
 })
.catch(function(error){
   console.log('Error while fetching:', error);
});


// localStorage.getItem(buildBreweryResults);
// localStorage.setItem(cityListEl, buildBreweryResults);

// cityButton.text = $('#searchBar').val();
// $('searchResults').append.cityButton;

})

function buildBreweryResults(data) {
 $("#BreweryHeader").empty();
 $("#breweryInfo").empty();


  console.log(data);
var breweryNumber = (Math.round((Math.random() * data.length-1)));
  console.log(breweryNumber);
var selectedBrewery = data[breweryNumber].name;
var breweryType = data[breweryNumber].brewery_type;
var breweryAddress = data[breweryNumber].street;
var breweryContact = data[breweryNumber].phone;
var breweryWebpage = data[breweryNumber].website_url;

breweryEl = $('<ul>');
typeEl = $('<li>');
addressEl = $('<li>');
contactEl = $('<li>');
breweryLinkEl = $('<li><a href="'+breweryWebpage+'" >'+breweryWebpage+'</a></li>');

breweryEl.addClass('.info');
typeEl.addClass('.infoSub');
addressEl.addClass('.infoSub');
contactEl.addClass('.infoSub');
breweryLinkEl.addClass('.infoSub');
breweryLinkEl.addClass('.breweryLinkEl');
breweryEl.text(selectedBrewery);
typeEl.text("Brewery Type: " + breweryType);
addressEl.text("Street: " + breweryAddress);
contactEl.text("Phone #: " + breweryContact);

$('#BreweryHeader').append(breweryEl);
$("#breweryInfo").append(typeEl);
$("#breweryInfo").append(addressEl);
$("#breweryInfo").append(contactEl);
$("#breweryInfo").append(breweryLinkEl);
}