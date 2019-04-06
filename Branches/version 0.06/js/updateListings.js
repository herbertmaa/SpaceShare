function updateListings(address, city, province, width, height, length, myKey) {
    if (myKey != undefined) {

        var query = firebase.database().ref('/Listings/' + myKey);

        console.log("hi");
        query.child('Address').set(address);
        query.child('City').set(city);
        query.child('Province').set(province);
        query.child('Width').set(width);
        query.child('Height').set(height);
        query.child('Length').set(length);


    } else {
        console.log("Error finding key");
    }
}
