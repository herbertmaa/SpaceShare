$(document).ready(function () {

    checkProfileExists(loadDefaultInfo, createProfile);
    
    var fileButton = document.getElementById('image_button');

    fileButton.addEventListener('change', function (e) {

        console.log("a file was uploaded into the browser");
        var file = e.target.files[0];
        const myNewFile = new File([file], 'profile.png', {
            type: file.type
        });

        // Reference to the storage bucket
        var storageRef = firebase.storage().ref("/img/" + userID + "/" + myNewFile.name);
        var uploader = $('#uploader');

        console.log(uploader);
        uploader.css("display", "block");
        // Loads the file into firebase
        var task = storageRef.put(file);

        task.on('state_changed', 
        function progress(snapshot) {
            console.log("testing");
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 25;
            

            // Progress Bar
            uploader.val(percentage);
            window.setTimeout(() =>{

                uploader.val(uploader.val() + percentage);
                window.setTimeout(() =>{

                    uploader.val(uploader.val() + percentage);
                    window.setTimeout(() =>{
                        uploader.val(uploader.val() + percentage);

                    }, 50);
                }, 75);

            }, 100);


        },
        function error(err) {

        },
        function complete() {

        }
        );
        task.then(() => {

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



    //Add an event listener to the "Update Profile" button
    $('#update-edit').on('click', () => {

        checkInput(function (name, address, phone, description, email) {
            changeProfile(name, address, phone, description, email);
        });
    });

});

/** A function that creates a post in FireBase **/
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

/** This function will check if any of the inputs are not correct. If even one is incorrect this loop will break and the value of validInputs will be set to false **/
function checkInput(callback) {


    var elements = document.getElementById("profile-form").elements;
    var validInputs = true;
    var MAX_INPUTS = 5; //Image, ImageButton, Name, Description, Phone #, Address, and Email

    for (var i = 2; MAX_INPUTS >= i; i++) {
        if (elements[i].value.length == 0) {

            console.log(elements[i].value.length);
            validInputs = false;
            console.log("invalid");
            break;
        }
    }
    if (validInputs) {
        console.log("called callback");

        callback(elements[2].value, elements[4].value, elements[3].value, $("#description").val(), elements[5].value);

    } else {
        alert("Please check your inputs for errors!");
    }

}
