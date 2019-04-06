
$(document).ready(function() {

    var db = firebase.database();
    var query = db.ref('/Listings/').orderByChild('City').equalTo(localStorage.getItem('City'));
   // var keys = db.ref('/Listings/' + userUID);

   console.log(query)
;    /* Iterates through the Listings object and then creates as many divs 
    as there are listings*/

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
    }


    query.on('value', function(snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var cityInput = childSnapshot.val().City;
            var addressInput = childSnapshot.val().Address;
            var heightInput = childSnapshot.val().Height;
            var lengthInput = childSnapshot.val().Length;
            var widthInput = childSnapshot.val().Width;
            var provinceInput = childSnapshot.val().Province;
            var imgURL = childSnapshot.val().ListingImage;
            console.log(imgURL);
           $('<div class="card"><img class="card-img-top" src=' + imgURL + 'alt="Card image cap"><div class="card-body"><h5 class="card-title">' +   addressInput + '<br>' +   cityInput + '<br>'  + provinceInput + '</h5><p class="card-text">' + "Dimensions: " + lengthInput + ' x ' +  widthInput + ' x ' +  heightInput + '</p><a href="#" class="btn btn-primary">Request</a></div></div>').appendTo('#cards-container');
        });
    });
    $('#heightSort').on('click', function() {
        var filterQuery = db.ref('/Listings/').orderByChild('City_height').startAt(localStorage.getItem('City'));
        filterQuery.on('value', function(snapshot) {
            console.log(snapshot);
            $('#cards-container').empty();
            snapshot.forEach(function (childSnapshot) {
               

               console.log(childSnapshot.val().City_height);
                    var cityInput = childSnapshot.val().City;
                    var addressInput = childSnapshot.val().Address;
                    var heightInput = childSnapshot.val().Height;
                    var lengthInput = childSnapshot.val().Length;
                    var widthInput = childSnapshot.val().Width;
                    var provinceInput = childSnapshot.val().Province;
                    var imgURL = childSnapshot.val().ListingImage;
                    $('<div class="card"><img class="card-img-top" src=' + imgURL + 'alt="Card image cap"><div class="card-body"><h5 class="card-title">' +   addressInput + '<br>' +   cityInput + '<br>'  + provinceInput + '</h5><p class="card-text">' + "Dimensions: " + lengthInput + ' x ' +  widthInput + ' x ' +  heightInput + '</p><a href="#" class="btn btn-primary">Request</a></div></div>').appendTo('#cards-container');
                });
        }); 
    });
    $('#widthSort').on('click', function() {
        var filterQuery = db.ref('/ListingsTest/').orderByChild('City_width').startAt(localStorage.getItem('City'));
        filterQuery.on('value', function(snapshot) {
            console.log(snapshot);
            $('#cards-container').empty();
            snapshot.forEach(function (childSnapshot) {
               

               console.log(childSnapshot.val().City_height);
                    var cityInput = childSnapshot.val().City;
                    var addressInput = childSnapshot.val().Address;
                    var heightInput = childSnapshot.val().Height;
                    var lengthInput = childSnapshot.val().Length;
                    var widthInput = childSnapshot.val().Width;
                    var provinceInput = childSnapshot.val().Province;
                    var imgURL = childSnapshot.val().ListingImage;
                    $('<div class="card"><img class="card-img-top" src=' + imgURL + 'alt="Card image cap"><div class="card-body"><h5 class="card-title">' +   addressInput + '<br>' +   cityInput + '<br>'  + provinceInput + '</h5><p class="card-text">' + "Dimensions: " + lengthInput + ' x ' +  widthInput + ' x ' +  heightInput + '</p><a href="#" class="btn btn-primary">Request</a></div></div>').appendTo('#cards-container');
                });
        }); 
    });
    $('#lengthSort').on('click', function() {
        var filterQuery = db.ref('/Listings/').orderByChild('City_length').startAt(localStorage.getItem('City'));
        filterQuery.on('value', function(snapshot) {
            
            $('#cards-container').empty();
            snapshot.forEach(function (childSnapshot) {
                console.log(snapshot.val());

               console.log(childSnapshot.val().City_height);
                    var cityInput = childSnapshot.val().City;
                    var addressInput = childSnapshot.val().Address;
                    var heightInput = childSnapshot.val().Height;
                    var lengthInput = childSnapshot.val().Length;
                    var widthInput = childSnapshot.val().Width;
                    var provinceInput = childSnapshot.val().Province;
                    var imgURL = childSnapshot.val().ListingImage;
                    $('<div class="card"><img class="card-img-top" src=' + imgURL + 'alt="Card image cap"><div class="card-body"><h5 class="card-title">' +   addressInput + '<br>' +   cityInput + '<br>'  + provinceInput + '</h5><p class="card-text">' + "Dimensions: " + lengthInput + ' x ' +  widthInput + ' x ' +  heightInput + '</p><a href="#" class="btn btn-primary">Request</a></div></div>').appendTo('#cards-container');
                });
        }); 
    });
});

