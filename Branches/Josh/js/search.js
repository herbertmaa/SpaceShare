
$(document).ready(function() {

    var citySearched = localStorage.getItem('City')
    var db = firebase.database();
    var query = db.ref('/Listings/').orderByChild('City').equalTo(citySearched);

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    

    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
    }

    showListings(query);

    $('#heightSort').on('click', function() {
        // looks for listings for the searched city and sorts them

    /* Orders them by City_height 
     * For ex Vancouver_09
     * Shows all the listings with the Vancouver and then sorts them lexicograhically on their height, width or length.
     */ 
        var filterQuery = db.ref('/Listings/').orderByChild('City_height').startAt(citySearched).endAt(citySearched + "\uf8ff");
        showListings(filterQuery);
    });

    $('#widthSort').on('click', function() {
        var filterQuery = db.ref('/Listings/').orderByChild('City_width').startAt(citySearched).endAt(citySearched + "\uf8ff");
        showListings(filterQuery);
    });

    $('#lengthSort').on('click', function() {
        var filterQuery = db.ref('/Listings/').orderByChild('City_length').startAt(localStorage.getItem('City')).endAt(citySearched +"\uf8ff");
        showListings(filterQuery);
    });
});

function showListings(database) {
    var cityInput, addressInput, heightInput, lengthInput, widthInput, provinceInput, imgURL, descrip;

    database.on('value', function(snapshot) {
        $('#cards-container').empty();
        snapshot.forEach(function (childSnapshot) {

            cityInput = childSnapshot.val().City;
            addressInput = childSnapshot.val().Address;
            heightInput = childSnapshot.val().Height;
            lengthInput = childSnapshot.val().Length;
            widthInput = childSnapshot.val().Width;
            provinceInput = childSnapshot.val().Province;
            imgURL = childSnapshot.val().ListingImage;
            descrip = childSnapshot.val().Description; 

            // Creates a card with the given inputs.
            createCard(cityInput, addressInput, heightInput, lengthInput, widthInput, provinceInput, imgURL, descrip);
        });
    });
    
}
function createCard(city, address, height, length, width, province, url, description) {
    $('<div class="card"><img class="card-img-top" src=' + url + 'alt="Card image cap"><div class="card-body"><h5 class="card-title">' 
    +   address + '<br>' +   city + '<br>'  + province + '</h5><p class="card-text">' 
    +  "Length: " + length + "&nbsp&nbspWidth: " +  
    width + '&nbsp&nbspHeight: ' +  height + '<br></p>' + '<p class= "card-text" id = "description">\"' + description + '\"</p> <a href="#" class="btn btn-primary">Request</a></div></div>').appendTo('#cards-container');
}

