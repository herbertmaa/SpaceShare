/** 

Version 3.0.1
This function controls the update listings functionality of our website and calls Firebase methods.

**/



function updateListings(address, city, province, width, height, length, description, myKey) {
    if (myKey != undefined) {

        var query = firebase.database().ref('/Listings/' + myKey);

        query.child('Address').set(address);
        query.child('City').set(city);
        query.child('Province').set(province);
        query.child('Width').set(width);
        query.child('Height').set(height);
        query.child('Length').set(length);
        query.child('Description').set(description);

    } else {
        console.log("Error finding key");
    }
}
