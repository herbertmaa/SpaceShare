// This sample uses the Autocomplete widget to help the user select a
// place, then it retrieves the address components associated with that
// place, and then it populates the form fields with those details.
// This sample requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete, map, infoWindow;

var options = {

    types: ['geocode'],
    componentRestrictions: {
        country: "ca"
    }

};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            
            lat: -34.397,
            lng: 150.644
        },
        zoom: 14
    });

    //infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.

    /**
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //infoWindow.setPosition(pos);
            //infoWindow.setContent('Location found.');
            //infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }**/


}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',

};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.

    console.log("hello world");
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'), {
            options
        });

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    //autocomplete.setFields('address_components');

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}
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
function initialize() {
    
    initMap();
    geocode();
    //initAutocomplete();
}


function initializeMapAutoComplete(){
    initMap();
    
    geocode();
   
    initAutocomplete();
}
function geocode() {

    //location should be this person's address 
    // call this function after the address has been filled in
    
    var addressArray = localStorage.getItem('Address');
    var key = 'AIzaSyDVs8DbkrG8d9ZUUCw9zrv2uZ-RL9sLbCQ'
    var url = ('https://maps.googleapis.com/maps/api/geocode/json' + '?address=' + addressArray[0] + '+' + addressArray[1] + '+' + addressArray[2] + ',' + addressArray[3] + ',+' + addressArray[4] + '&key=' + key);
    console.log(addressArray);
    $.ajax({
        dataType: 'json',
        url: url,
        data: { format: "json-list"},
        success: function(data){
            
            map.setCenter(data['results'][0].geometry.location);
            var marker = new google.maps.Marker({
            map: map,
            position: data['results'][0].geometry.location

            });
        }
        
    });

}
