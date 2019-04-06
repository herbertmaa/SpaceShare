$(document).ready(function () {

    //Hides the loading overlay after all scripts have been loaded. 
    //There is a one second delay so that there is a smooth transition for the loading bar.

    setTimeout(function () {
        $('#loading_overlay').css("display", "none");
        $('.container').removeClass('hidden');
    }, 1000);

    $('#update-edit').on('click', () => {
        //all elements should be entered if a change needs to be made.
        var elements = document.getElementById("message-form").elements;
        var validInput = false;
        for (var i = 0; elements.length > i; i++) {
            if (elements[i].length == 0) {
                invalidInput = true;
                break;
            }
        }
        if (validInput) {
            var address = elements[0].value;
            var addressArray = address.split(",");
            updateListing(addressArray[0], addressArray[1], addressArray[2], elements[1].value, elements[2].value, elements[3].value, keyToChange);
            location.reload();
        }
    });
    $('#content').on('click', 'button', function () {

        var classNames = $(this).attr("class").toString().split(' ');
        $.each(classNames, function (i, className) {
            if ((className).startsWith("-L")) {
                keyToChange = className;
            }
        });

    });
    $('.modal-content').on('click', '#delete_confirm', function () {

        var regex = new RegExp("DELETE");

        if ($('#type_delete').val().match(regex)) {

            $('#confirm_delete').modal('toggle')
            $('#confirm_delete_form').trigger('reset');
            if (keyToChange != undefined) {

                var query = firebase.database().ref('/Listings');
                query.child(keyToChange).remove();
                console.log("deleted");
            }

        } else {

            $('#type_delete_holder ').addClass("is-invalid");

        }
    });

});
