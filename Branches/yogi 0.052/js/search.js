
$(document).ready(function() {

    var db = firebase.database();
    var query = db.ref('/ListingsTest/').orderByChild('City').equalTo(localStorage.getItem('City'));
   // var keys = db.ref('/ListingsTest/' + userUID);

   console.log(query)
;    /* Iterates through the ListingsTest object and then creates as many divs 
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
           $('.card-img-top').attr('src', 'img/black.png');
        });
    });
    $('#heightSort').on('click', function() {
        var filterQuery = db.ref('/ListingsTest/').orderByChild('City_height').startAt(localStorage.getItem('City'));
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
                    $('<div class="card"><img class="card-img-top" src="" alt="Card image cap"><div class="card-body"><h5 class="card-title">' +   addressInput + '<br>' +   cityInput + '<br>'  + provinceInput + '</h5><p class="card-text">' + "Dimensions: " + lengthInput + ' x ' +  widthInput + ' x ' +  heightInput + '</p><a href="#" class="btn btn-primary">Request</a></div></div>').appendTo('#cards-container');
                    $('.card-img-top').attr('src', 'img/black.png');
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
                    $('<div class="card"><img class="card-img-top" src="" alt="Card image cap"><div class="card-body"><h5 class="card-title">' +   addressInput + '<br>' +   cityInput + '<br>'  + provinceInput + '</h5><p class="card-text">' + "Dimensions: " + lengthInput + ' x ' +  widthInput + ' x ' +  heightInput + '</p><a href="#" class="btn btn-primary">Request</a></div></div>').appendTo('#cards-container');
                    $('.card-img-top').attr('src', 'img/black.png');
            });
        }); 
    });
    $('#lengthSort').on('click', function() {
        var filterQuery = db.ref('/ListingsTest/').orderByChild('City_length').startAt(localStorage.getItem('City'));
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
                    $('<div class="card"><img class="card-img-top" src="" alt="Card image cap"><div class="card-body"><h5 class="card-title">' +   addressInput + '<br>' +   cityInput + '<br>'  + provinceInput + '</h5><p class="card-text">' + "Dimensions: " + lengthInput + ' x ' +  widthInput + ' x ' +  heightInput + '</p><a href="#" class="btn btn-primary">Request</a></div></div>').appendTo('#cards-container');
                    $('.card-img-top').attr('src', 'img/black.png');
            });
        }); 
    });
});

