




















































































































































// leslie's script
var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
console.log(favorites);

  // Set an event listener to save favorited brewery name to local storage
    $("#brew-fav-btn").on("click", function() {
        var fav = $(".brew-fav-data").text();
        console.log(fav);

         // Save input in local storage
        favorites.push(fav).text;
        localStorage.setItem("favorites", JSON.stringify(favorites));
        $(".brew-fav").css("color", "red");
    })

  // Set an event listener to save favorited restaurant name to local storage
  $("#resto-fav-btn").on("click", function() {
    var fav = $(".resto-fav-data").text();

     // Save input in local storage
    favorites.push(fav).text;
    localStorage.setItem("favorites", JSON.stringify(favorites));
    $(".resto-fav").css("color", "red");
})

    // Set an event listener to display favorited items when My Favorites button is clicked
    $("#favs-btn").on("click", function(event) {
        event.preventDefault();
        var r = document.getElementById("random-info");
        var f = document.getElementById("favorites-info");

        r.setAttribute("hidden", "");
        f.removeAttribute("hidden", "");

        createFavoriteList();

    })

    function createFavoriteList() {
        if(favorites.length === 0) {
        return;
        } 
        else {
            for(let i = 0; i < favorites.length; i++) {
                var h4 = $("<h4>");
                var text = favorites[i];
                h4.text(text);
                $("#list-container").append(h4);                
            }
        }
      }

    // Set an event listener for exit favorites button to close the favorites window
    $("#close-favs").on("click", function(event) {
        event.preventDefault();
        var f = document.getElementById("favorites-info");

        f.setAttribute("hidden", "");
    })