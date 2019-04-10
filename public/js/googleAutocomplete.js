/** 

Version 1.0.0
This javascript file controls the client logic related to Google Maps API. It controls the logic for the autocomplete form and the geolocation of a user's location. Using this script, we can provide suggestions to users based on the search query that they typed. This function does not try to fill in a hidden form for a user. 

**/

var placeSearch, autocomplete;

var options = {

    types: ['geocode'],
    componentRestrictions: {
        country: "ca"
    }

};

var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',

};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'), {
            options
        });
    geolocate();
    
}

function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
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
