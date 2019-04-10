/** This function generates a div container for existing listings that a user previously created,
if no listings exist it will create a message letting the user know to create some listings 
Return type = 1 if it found listings and Return Type = 0 if No listings were found **/

function generateMyListings(myUserID) {

    var foundListings = 0;
    var query = firebase.database().ref('/Listings');
    var cardGroupArray = [];
    query.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {

            if (childSnapshot.child('Account').val() == myUserID) {
                let tempContainer = $("<div class='card text-center border-0'> </div>");
                let tempImage;

                //If there is no image for the listing, load the default image for this listing
                if (childSnapshot.child('ListingImage').val() === "NULL") {
                    tempImage = $("<img src= 'https://images.unsplash.com/photo-1467385829985-2b0fb82b5193?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80' alt='Listing Image' height = '200px' width = '240px'>");
                } else {

                    //This listing has an image. Retrieve this image from Firebase and load into the card.
                    tempImage = $("<img src='" + childSnapshot.child('ListingImage').val() + "' alt='Listing Image' height = '200px' width = '240px'>");
                }

                let tempCardBody = $("<div class='card-body border m-5 rounded'> </div>");

                let tempHeader = $("<h5 class='card-title mt-2'></h5>");
                tempHeader.text('Address: ' + childSnapshot.child('Address').val() + ', ' + childSnapshot.child('City').val());

                let tempDescription = $("<p class='card-text'>" + childSnapshot.child('Description').val() + "</p>");

                let tempAttributeDiv = $('<div> </div>');
                let tempWidthDiv = $('<div> </div>');
                let tempHeightDiv = $('<div> </div>');
                let tempLengthDiv = $('<div> </div>');
                let tempRentedOutDiv = $('<div class = "mt-3"> </div>');

                let tempButton = $("<div style = 'display: inline-block' class = 'm-3 edit-button' > <button type= 'button' class='btn btn-primary " + childSnapshot.child('key').val() + "' data-toggle = 'modal' data-target = '#content_edit'>Edit</a></div>");

                let tempButton2 = $("<div style = 'display: inline-block' class = 'm-3 delete-button style = 'display: inline-block;'" + childSnapshot.child('key').val() + "'><button type = 'button' class='btn btn-primary " + childSnapshot.child('key').val() + "' data-toggle='modal' data-target='#confirm_delete'>Delete</button></div>");

                var widthText = 'Width: ' + childSnapshot.child('Width').val();
                var heightText = 'Height: ' + childSnapshot.child('Height').val();
                var lengthText = 'Length: ' + childSnapshot.child('Length').val();

                tempAttributeDiv.text(lengthText + " " + widthText + " " + heightText);


                /** If the RentedOut key in Firebase is assigned to a user, this listing has already been rented out **/

                if (childSnapshot.child('RentedOut').val() === "NULL") {
                    tempRentedOutDiv.text('Currently available!');
                } else {
                    tempRentedOutDiv.text('Currently rented out!');
                }

                /** Chain append all temporary elements created within this function to the card body. **/
                tempCardBody.append(tempImage).append(tempHeader).append(tempDescription).append(tempAttributeDiv).append(tempRentedOutDiv).append(tempButton).append(tempButton2);
                tempContainer.append(tempCardBody);
                cardGroupArray.push(tempContainer);
                foundListings++;
            } else {
                //The listing does not belong to you. No information should be output to the user
            }

        })
        if (foundListings == 0) {
            var tempContainer = $("<div class = 'add-container container'> <div class = 'row'> <h4> You have no listings! :( <a href = 'postListing.html'> Let's Add Something. </a><h4> </div></div>");
            $('main').append(tempContainer);
            return 0;
        } else {


            if (foundListings % 2 == 1) {

                //If there are odd number of cards, add a padding card to the cardGroupArray
                let tempContainer = $("<div class='card text-center border-0'> </div>");
                cardGroupArray.push(tempContainer);

            }
            var numGroups = Math.round(foundListings / 2);

            for (var i = 0; numGroups > i; i++) {

                var tempGroup = $("<div class = 'card-group border-0'> </div>");
                for (var j = 0; 2 > j; j++) {
                    if (cardGroupArray.length != 0) {
                        tempGroup.prepend(cardGroupArray.pop());
                    }

                }
                $('#content').prepend(tempGroup);

            }

            let tempDiv = $('<div class = "mb-3 mp-3"> <h3> Your Listings </h3></div>');
            $('#content').prepend(tempDiv);
            return 1;
        }
    });
}
