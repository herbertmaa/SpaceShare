/** 

Version 1.0.1
This javascript file controls the client/server logic related to retrieving and loading Google Places and Google Autocomplete

**/

//Initialize the placeSearch,autocomplete, map, and infoWindow

var placeSearch, autocomplete, map, infoWindow;

/** Options for Google Autocomplete **/
var options = {

    types: ['geocode'],
    componentRestrictions: {
        country: "ca"
    }

};

/** This function initializes the map and sets the center point to be Vancouver, B.C. **/
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {

            lat: 49.2827,
            lng: 123.1207
        },
        zoom: 14

    });

}

/** This function handles location errors on the GoogleMaps generated **/
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

/** The form elements that Google Autocomplete will try filling **/

var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',

};

/** This function initializes Google Autocomplete with any form specified as "autocomplete" **/

function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'), {
            options
        });
    autocomplete.addListener('place_changed', fillInAddress);
}


/** This function loads information generated from Google Autocomplete into a form **/
function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}

/** This function initializes Google Maps and locates the user on the generated map based on his search query **/

function initialize() {

    initMap();
    geocode();
    //initAutocomplete();
}

/** This function initializes Google Maps, locates the user on the generated map based on his search query, and initiliazes autocomplete on the page **/

function initializeMapAutoComplete() {
    initMap();
    geocode();
    initAutocomplete();
}

/** This function initializes Google Autocomplete, and biases the results based on the user's location **/

function initializeAutoCompleteGeoLocate() {

    initAutocomplete();
    geolocate();

}
/** This function retrieves data stored in local storage and finds the latitude and longitutde based on that location **/

function geocode() {
    //location should be this person's address 
    // call this function after the address has been filled in

    var address = localStorage.getItem('Address');
    address = address.replace(/,/g, "");
    var addressArray = address.split(" ");
    var key = 'AIzaSyDVs8DbkrG8d9ZUUCw9zrv2uZ-RL9sLbCQ'
    var url = ('https://maps.googleapis.com/maps/api/geocode/json' + '?address=' + addressArray[0] + '+' + addressArray[1] + '+' + addressArray[2] + ',' + addressArray[3] + ',+' + addressArray[4] + '&key=' + key);

    $.ajax({
        dataType: 'json',
        url: url,
        data: {
            format: "json-list"
        },

        success: function (data) {
            map.setCenter(data['results'][0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: data['results'][0].geometry.location

            });
        }

    });

}
