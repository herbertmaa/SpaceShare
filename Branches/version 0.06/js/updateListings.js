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
