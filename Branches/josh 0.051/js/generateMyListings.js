     function generateMyListings(myUserID) {
         /** This function generates existing listings that a user created,
         if no listings exist it will create a message letting the user know to create some listings 
         Return type = 1 if it found listings and Return Type = 0 if No listings were found 
         **/
         var foundListings = 0;
         var query = firebase.database().ref('/ListingsTest');
         query.on('value', function (snapshot) {
             snapshot.forEach(function (childSnapshot) {
                 if (childSnapshot.child('Account').val() == myUserID) {
                     console.log(childSnapshot.child('key').val());
                     let tempContainer = $("<div class = 'edit-container'> </div>");
                     let tempRow1 = $('<div class = "row "> </div>')
                     let tempDiv = $('<div class= "col-6"> </div>');
                     let tempRow2 = $('<div class = "row"> </div>');
                     let tempDiv3 = $('<div class = "col-3"> </div>');
                     let tempDiv4 = $('<div class = "col-3"> </div>');
                     let tempButton = $("<div class = 'edit-button'> <button type= 'button' class='mdl-button mdl-js-button mdl-button--raised " + childSnapshot.child('key').val() + "' data-toggle = 'modal' data-target = '#content_edit'>EDIT</a></div>");

                     let tempButton2 = $("<div class = 'delete-button " + childSnapshot.child('key').val() + "'><button type = 'button' class='mdl-button mdl-js-button mdl-button--raised " + childSnapshot.child('key').val() + "' data toggle='modal' data-target='#confirm_delete'>DELETE</a></div>");
                     
                     tempDiv.text('Address: ' + childSnapshot.child('Address').val() + ', ' + childSnapshot.child('City').val());
                     tempDiv3.text('Width: ' + childSnapshot.child('Width').val());
                     tempDiv4.text('Height: ' + childSnapshot.child('Height').val());

                     tempRow2.append(tempDiv3).append(tempDiv4).append(tempButton).append(tempButton2);
                     tempRow1.append(tempDiv);
                     tempContainer.append(tempRow1).append(tempRow2);
                     $('#content').append(tempContainer);
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
                 let tempDiv = $('<div> <h4> Your Existing Listings </h4></div>');
                 $('#first_row').append(tempDiv);
                 return 1;
             }
         });
     }
