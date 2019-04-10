let db = firebase.database();

$(document).ready(function () {

    var citySearched = localStorage.getItem('City')
    var query = db.ref('/Listings/').orderByChild('City').equalTo(citySearched);



    var length = localStorage.getItem('Length');
    var width = localStorage.getItem('Width');
    var height = localStorage.getItem('Height');
    //var uid = localStorage.getItem('uid');
    //var loggedIn = localStorage.getItem('uid') != "";
    showListings(query);

    $('#heightSort').on('click', function () {
        // looks for listings for the searched city and sorts them

        /* Orders them by City_height 
         * For ex Vancouver_09
         * Shows all the listings with the Vancouver and then sorts them lexicograhically on their height, width or length.
         */
        var filterQuery = db.ref('/Listings/').orderByChild('City_height').startAt(citySearched).endAt(citySearched + "_\uf8ff");
        $('.card').replaceWith(showListings(filterQuery));
    });

    $('#widthSort').on('click', function () {
        var filterQuery = db.ref('/Listings/').orderByChild('City_width').startAt(citySearched).endAt(citySearched + "_\uf8ff");
        $('.card').replaceWith(showListings(filterQuery));
    });

    $('#lengthSort').on('click', function () {
        var filterQuery = db.ref('/Listings/').orderByChild('City_length').startAt(citySearched).endAt(citySearched + "_\uf8ff");
        $('.card').replaceWith(showListings(filterQuery));
    });

    function showListings(database) {
        var cityInput, addressInput, heightInput, lengthInput, widthInput, provinceInput, imgURL, descrip, key;
        var count = 0;
        database.on('value', function (snapshot) {

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


                var greaterThanHeight = heightInput >= height;
                var greaterThanLength = lengthInput >= length;
                var greaterThanWidth = widthInput >= width;
                if (childSnapshot.val().RentedOut == "NULL" && (greaterThanHeight &&
                        greaterThanLength && greaterThanWidth)) {

                    createCard(cityInput, addressInput, heightInput, lengthInput, widthInput, provinceInput, imgURL, descrip, key);
                    count++;

                } else if (childSnapshot.val().RentedOut != "NULL" && (greaterThanHeight &&
                        greaterThanLength && greaterThanWidth)) {
                    createRentedCard(cityInput, addressInput, heightInput, lengthInput, widthInput, provinceInput, imgURL, descrip, key);
                    count++;
                }
            });
            if (count == 0) {
                $('#dropdownMenuButton').css("display", "none");
                $('#cards-container').append('<h3 class = "h3 mt-5 pt-5">Sorry! no listings found :(</h3>');
            } else {

                $('#dropdownMenuButton').css("visibility", "visible");
            }
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
        let cardText = $('<p class = "card-text">Length: ' + length + "&nbspWidth: " + width + '&nbspHeight: ' + height + '</p>');
        let cardDescrip = $('<p class = "card-text description">' + description + '</p>');
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
        let cardText = $('<p class = "card-text">Length: ' + length + "&nbspWidth: " + width + '&nbspHeight: ' + height + '</p>');
        let cardDescrip = $('<p class = "card-text description">' + description + '</p>');
        let button = $('<button type = "button" class = "btn btn-primary request" data-target = "exampleModal" data-toggle = "modal" data-key =' + key + ' disabled>Reserved</button>');


        cardBody.append(cardTitle).append(cardText).append(cardDescrip).append(button);
        card.append(cardImg);
        card.append(cardBody);
        $('#cards-container').append(card);


    }
    $('#cards-container').on('click', '.request', function () {
        var button = $(this);
        var key = button.attr('data-key');

        checkLoggedIn(function () {return loadConfirmRequest(key);}, function () {
                $('#user_login').modal('toggle');
            });
    });


});


function loadConfirmRequest(key) {

    console.log("loadConfirmRequest was called");
    $('#exampleModal').modal('toggle');
    $('#requestListing').on('click', function () {
        var regex = new RegExp("REQUEST");

        if (($('#request').val().match(regex))) {


            checkLoggedIn(function () {
                requestListing(key);

            }, function () {
                console.log("User is not logged in");
            });

            //request.child('RentedOut').set(uid);
            //window.location.href = 'succrequest.html';




        } else if (($('#request').val().match(regex))) {
            alert("Invalid Entry");
            $('#request').trigger('reset');
        }

    });
}
