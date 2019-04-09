$(document).ready(function () {

    var fileButton = document.getElementById('image_button');

    fileButton.addEventListener('change', function (e) {

        console.log("a file was uploaded into the browser");
        var file = e.target.files[0];
        const myNewFile = new File([file], 'profile.png', {
            type: file.type
        });

        // Reference to the storage bucket
        var storageRef = firebase.storage().ref("/img/" + userID + "/" + myNewFile.name);

        // Loads the file into firebase
        storageRef.put(file).then(() => {

            storageRef.getDownloadURL().then(function (url) {
                var imageURL = url;
                createPicture(userID, imageURL, getProfileImage);
            });

        });


    });

    setTimeout(function () {
        $('#loading_overlay').css("display", "none");
        $('.hidden').removeClass('hidden');
    }, 1000);


    checkProfileExists(loadDefaultInfo(), createProfile());

});



/*
A function that creates a post in FireBase
*/
function createPicture(uid, imageURL, callback) {

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
    updates['/ProfileImages/' + uid] = postImage;
    firebase.database().ref().update(updates).then(() => {

        callback();


    });


}
