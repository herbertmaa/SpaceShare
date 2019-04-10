$(document).ready(function () {

    //Generates the listings
    //Hides the loading overlay after all scripts have been loaded. 
    //There is a one second delay so that there is a smooth transition for the loading bar.    

    //A callback function that is called when the user has logged in.
    firebase.auth().onAuthStateChanged(function (user) {
        if (userID != null) {
            generateMyListings(userID);
        }
    });

    
    /** Load bar for this page. **/
    setTimeout(function () {
        $('#loading_overlay').css("display", "none");
        $('.hidden').removeClass('hidden');
    }, 1000);

    
    /**Add an event listener to the update-buttons on this page **/
    $('#update-edit').on('click', () => {

        //all elements should be entered if a change needs to be made.
        var elements = document.getElementById("message-form").elements;
        var validInputs = true;
        var MAX_INPUTS = 5; // Address, Width, Height, Length, and Description
        
        //This will check if any of the inputs are not correct within the modal that loads up after a user clicks edit. If even one is incorrect this loop will break and the value of validInputs will be set to false

        for (var i = 0; MAX_INPUTS > i; i++) {

            console.log("i: " + i + " " + elements[i]);

            if (elements[i].value.length == 0) {
                validInputs = false;
                break;
            }
        }

        /**If all inputs are valid (length > 0) then this functionw will call updateListings with the variables within the modal form **/ 
        
        if (validInputs) {
            var address = elements[0].value;
            var addressArray = address.split(",");
            updateListings(addressArray[0], addressArray[1], addressArray[2], elements[1].value, elements[2].value, elements[3].value, elements[4].value, keyToChange);
            $('#content_edit').modal({
                show: false
            });
            location.reload();
        } else {

            /** If the inputs are invalid (length not greater than 0) then an error will pop up **/
            alert("Please check your inputs for errors!");

        }
    });


    /** Adds an event handler for when the user clicks the EDIT button this function will be called **/

    $('#content').on('click', 'button', function () {

        var classNames = $(this).attr("class").toString().split(' ');
        $.each(classNames, function (i, className) {
            if ((className).startsWith("-L")) {
                keyToChange = className;
            }
        });

        updateForm(keyToChange);

    });

    /** An event handler for when the user clicks the delete button. This function will load up the confirm delete modal and check if the user enters the correct input "DELETE" before he/she can delete **/
    
    $('#confirm_delete_form').on('click', '#delete_confirm', function () {

        var regex = new RegExp("DELETE");

        if ($('#type_delete').val().match(regex)) {

            console.log("hello");
            $('#confirm_delete').modal('toggle')
            $('#confirm_delete_form').trigger('reset');
            if (keyToChange != undefined) {

                var query = firebase.database().ref('/Listings');
                query.child(keyToChange).remove();
            }
            location.reload();

        } else {

            $('#type_delete_holder').addClass("is-invalid");

        }
    });

});

/** This method adds placeholders to the modal that is loaded when the EDIT button is clicked" **/

function updateForm(listingKey) {

    var query = firebase.database().ref('/Listings/' + listingKey);
    query.on('value', function (snapshot) {

        $('#autocomplete').attr("placeholder", snapshot.child('Address').val());
        $('#width').attr("placeholder", snapshot.child('Width').val());
        $('#height').attr("placeholder", snapshot.child('Height').val());
        $('#length').attr("placeholder", snapshot.child('Length').val());
        $('#new_descript').attr("placeholder", snapshot.child('Description').val());

    });

}
