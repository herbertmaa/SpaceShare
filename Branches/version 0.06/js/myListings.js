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

    setTimeout(function () {
        $('#loading_overlay').css("display", "none");
        $('.container').removeClass('hidden');
    }, 1000);

    $('#update-edit').on('click', () => {

        //all elements should be entered if a change needs to be made.
        var elements = document.getElementById("message-form").elements;
        var validInputs = true;
        var MAX_INPUTS = 4; // Address, Width, Height, Length
        //This will check if any of the inputs are not correct. If even one is incorrect this loop will break and the value of validInputs will be set to false

        for (var i = 0; MAX_INPUTS > i; i++) {
            if (elements[i].value.length == 0) {
                validInputs = false;
                break;
            }
        }

        if (validInputs) {
            var address = elements[0].value;
            var addressArray = address.split(",");
            updateListings(addressArray[0], addressArray[1], addressArray[2], elements[1].value, elements[2].value, elements[3].value, keyToChange);
            $('#content_edit').modal({
                show: false
            });
            location.reload();
        } else {

            alert("Please check your inputs for errors!");

        }
    });
    $('#content').on('click', 'button', function () {

        console.log(this);
        var classNames = $(this).attr("class").toString().split(' ');
        $.each(classNames, function (i, className) {
            if ((className).startsWith("-L")) {
                keyToChange = className;
            }
        });

    });


    $('#confirm_delete_form').on('click', '#delete_confirm', function () {

        var regex = new RegExp("DELETE");

        if ($('#type_delete').val().match(regex)) {

            console.log("hello");
            $('#confirm_delete').modal('toggle')
            $('#confirm_delete_form').trigger('reset');
            if (keyToChange != undefined) {

                var query = firebase.database().ref('/ListingsTest');
                query.child(keyToChange).remove();
            }
            location.reload();

        } else {

            $('#type_delete_holder').addClass("is-invalid");

        }
    });

});
