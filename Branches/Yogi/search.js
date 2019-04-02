
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

           
           $('<div class="card"><img class="card-img-top" src="" alt="Card image cap"><div class="card-body"><h5 class="card-title">' +   addressInput + '<br>' +   cityInput + '<br>'  + provinceInput + '</h5><p class="card-text">' + "Dimensions: " + lengthInput + ' x ' +  widthInput + ' x ' +  heightInput + '</p><a href="#" class="btn btn-primary">Request</a></div></div>').appendTo('#cards-container');
           $('.card-img-top').attr('src', 'e91a3dcf-c15a-441a-b369-996922364cdc-profile_image-300x300.png');
    });
    
});
});

