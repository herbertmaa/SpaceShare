
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
        $('.card').replaceWith(showListings(filterQuery));
    });

    $('#widthSort').on('click', function() {
        var filterQuery = db.ref('/Listings/').orderByChild('City_width').startAt(citySearched).endAt(citySearched + "\uf8ff");
        $('.card').replaceWith(showListings(filterQuery));
    });

    $('#lengthSort').on('click', function() {
        var filterQuery = db.ref('/Listings/').orderByChild('City_length').startAt(localStorage.getItem('City')).endAt(citySearched +"\uf8ff");
        $('.card').replaceWith(showListings(filterQuery));
    });

    function showListings(database) {
        var cityInput, addressInput, heightInput, lengthInput, widthInput, provinceInput, imgURL, descrip, key;

        database.on('value', function(snapshot) {
            snapshot.forEach(function (childSnapshot) {

                cityInput = childSnapshot.val().City;
                addressInput = childSnapshot.val().Address;
                heightInput = childSnapshot.val().Height;
                lengthInput = childSnapshot.val().Length;
                widthInput = childSnapshot.val().Width;
                provinceInput = childSnapshot.val().Province;
                imgURL = childSnapshot.val().ListingImage;
                descrip = childSnapshot.val().Description; 
                key = childSnapshot.val().key;
                if (childSnapshot.val().RentedOut == "NULL") {
                    createCard(cityInput, addressInput, heightInput, lengthInput, widthInput, provinceInput, imgURL, descrip, key);
                } else {
                    createRentedCard(cityInput, addressInput, heightInput, lengthInput, widthInput, provinceInput, imgURL, descrip, key);
                }
            });
        });
        
    }

    // Creates a card with the given inputs.
    function createCard(city, address, height, length, width, province, url, description, key) {
        let card = $('<div class = "card"></div>');
        let cardImg = $('<img class = "card-img-top" alt= "Listing Image">');
        if (url != "NULL") {
        cardImg.attr('src', url);
        } else {
            cardImg.attr('src', "https://images.unsplash.com/photo-1467385829985-2b0fb82b5193?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80");
        }
        let cardBody = $('<div class = "card-body"></div>');
        let cardTitle = $('<h5 class = "card-title">' + address + '<br>' + city + '<br>' + province + '</h5>');
        let cardText = $('<p class = "card-text">Length: ' + length + "&nbspWidth: " + width + '&nbspHeight: ' +  height + '</p>');
        let cardDescrip = $('<p class = "card-text id = "description">' + description + '</p>');
        let button = $('<button type = "button" class = "btn btn-primary request" data-target = "exampleModal" data-toggle = "modal" data-key =' + key + '>Request</button>');

        
        cardBody.append(cardTitle).append(cardText).append(cardDescrip).append(button);
        card.append(cardImg);
        card.append(cardBody);
        $('#cards-container').append(card);

        
    }
    function createRentedCard(city, address, height, length, width, province, url, description, key) {
        let card = $('<div class = "card"></div>');
        let cardImg = $('<img class = "card-img-top" alt= "Listing Image">');
        if (url != "NULL") {
        cardImg.attr('src', url);
        } else {
            cardImg.attr('src', "https://images.unsplash.com/photo-1467385829985-2b0fb82b5193?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80");
        }
        let cardBody = $('<div class = "card-body"></div>');
        let cardTitle = $('<h5 class = "card-title">' + address + '<br>' + city + '<br>' + province + '</h5>');
        let cardText = $('<p class = "card-text">Length: ' + length + "&nbspWidth: " + width + '&nbspHeight: ' +  height + '</p>');
        let cardDescrip = $('<p class = "card-text id = "description">' + description + '</p>');
        let button = $('<button type = "button" class = "btn btn-primary request" data-target = "exampleModal" data-toggle = "modal" data-key =' + key + ' disabled>Reserved</button>');

        
        cardBody.append(cardTitle).append(cardText).append(cardDescrip).append(button);
        card.append(cardImg);
        card.append(cardBody);
        $('#cards-container').append(card);

        
    }
    $('#cards-container').on('click', '.request', function() {
        var button = $(this);
        var key = button.attr('data-key');
        
        $('#exampleModal').modal('toggle');
        $('#requestListing').on('click', function() {
            var regex = new RegExp("REQUEST");
            if ($('#request').val().match(regex)) {
                var request = db.ref('/Listings/' + key);
                request.child('RentedOut').set('RENTED by' + uid);
                window.location.href = 'request.html';
            } else {
                alert("Invalid Entry");
                $('#request').trigger('reset');
            }
        });
    });

});





