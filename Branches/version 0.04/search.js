
$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCE2lSLszDUyZEyY--btpdoYs7Ln6PHAXY",
        authDomain: "spaceshare-b68f7.firebaseapp.com",
        databaseURL: "https://spaceshare-b68f7.firebaseio.com",
        projectId: "spaceshare-b68f7",
        storageBucket: "",
        messagingSenderId: "555750963802"
    };


    firebase.initializeApp(config);
    console.log(firebase);

    var db = firebase.database();
    var query = db.ref('/ListingsTest/').orderByChild('City').equalTo(localStorage.getItem('City'));
   // var keys = db.ref('/ListingsTest/' + userUID);


    /* Iterates through the ListingsTest object and then creates as many divs 
    as there are listings*/
    query.on('value', function(snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var cityInput = childSnapshot.val().City;
            var addressInput = childSnapshot.val().Address;
            var heightInput = childSnapshot.val().Height;
            var lengthInput = childSnapshot.val().Length;
            var widthInput = childSnapshot.val().Width;
            var provinceInput = childSnapshot.val().Province;

            var listing = $('<div class = "listing" "container"></div>')
            $("#cards-container").append(listing);

            var img = $("<img src = \"e91a3dcf-c15a-441a-b369-996922364cdc-profile_image-300x300.png\" alt = \"black-image\"></img>")
            listing.append(img)

            var listingContent = $('<div id = "listing-content" class = "container"></div>')
            listingContent.appendTo(listing);
            
            var province = $("<p class = \"total-address\"></p>");
            province.html(addressInput + " &#8226; " +  cityInput + "\n" + provinceInput);

            var dimensions = $('<p class = "dimensions"></p>')
            dimensions.text("Dimensions: " + lengthInput + " x " + widthInput + " x " + heightInput);

            listingContent.append(province, dimensions);
    });
    
});
});

