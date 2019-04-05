$(document).ready(function () {

    var fileButton = document.getElementById('image_button');
    fileButton.addEventListener('change', function (e) {
        console.log("a file was uploaded into the browser");
        var file = e.target.files[0];
        var imageKey = firebase.database().ref().push().key;
        const myNewFile = new File([file], 'listing' + imageKey + '.png', {
            type: file.type
        });

        // Reference to the storage bucket
        var storageRef = firebase.storage().ref("/img/ListingImages/" + userID + "/" + myNewFile.name);
                

        // Loads the file into firebase
        storageRef.put(file).then(() => {

            storageRef.getDownloadURL().then(function (url) {
                var imageURL = url;
                createListingPicture(userID, imageURL, changeListingPhoto);
            });

        });

    });
});



/*
A function that creates a post in FireBase
*/
function createListingPicture(uid, imageURL, callback) {

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

    // throws errors if you're not logged in
    var postImage = {
        url: imageURL
    };

    var updates = {};
    updates['/ListingImages/' + uid] = postImage;
    firebase.database().ref().update(updates).then(() => {

        callback();

    });


}


/** This function returns the URL of the image photo **/
function changeListingPhoto() {

    listingImageRef.on('value', function (snapshot) {
        console.log(snapshot);
        if (snapshot != null) {
            $('#listingPhoto').attr("src", snapshot.val().url);
        }
        
        imageLink = snapshot.val().url;
    });
}

