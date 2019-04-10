// Initialize Firebase
var config = {
    apiKey: "AIzaSyCE2lSLszDUyZEyY--btpdoYs7Ln6PHAXY",
    authDomain: "spaceshare-b68f7.firebaseapp.com",
    databaseURL: "https://spaceshare-b68f7.firebaseio.com",
    projectId: "spaceshare-b68f7",
    storageBucket: "spaceshare-b68f7.appspot.com",
    messagingSenderId: "555750963802"

};
firebase.initializeApp(config);

var imageLink = null;
var listingImageRef = null;
var imageRef = null;
var loggedIn = false;
var userID = null;
var storage = firebase.storage();

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
//Firebase default configuration
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
    // Terms of service url.
    tosUrl: 'terms.html',
    // Privacy policy url.
    privacyPolicyUrl: 'terms.html'

};

// Load the login container
ui.start('#firebaseui-auth-container', uiConfig); // load our login

// This tells us if the user has logged in. 

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        if ($('.prfl-user-icon').length != 0) {
            $('.prfl-user-icon').css("visibility", "visible");
        }

        //Initialize the image reference then call getProfileImage()
        imageRef = firebase.database().ref('ProfileImages/' + userID);
        getProfileImage();
        listingImageRef = firebase.database().ref('ListingImages/' + userID);

    } else {
        if ($('.prfl-user-icon').length != 0) {
            $('.prfl-user-icon').css("visibility", "visible");
        }
    }
});


/* function that changes the navbar based on if your logged in or not */
/* ALL PAGES USE THIS FUNCTION */
function navb(){
    firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //User is logged in
        $("#signup").hide();
        $("#signup2").hide();
        $("#login").hide();
        $("#login2").hide();
        var navb = document.getElementsByClassName("navbar-nav");
        navb[0].style.visibility = "visible";
    } else {
        console.log("not logged in");
        $("#myprofile").hide();
        $("#myprofile2").hide();
        $("#mylistings").hide();
        $("#mylistings2").hide();
        $("#logout").hide();
        $("#logout2").hide();
        $("#signup").show();
        $("#signup2").show();
        $("#login").show();
        $("#login2").show();
        var navb = document.getElementsByClassName("navbar-nav");
        navb[0].style.visibility = "visible";
    }
});
}

navb();

/* changes index.html greeting if your are logged in or not */
/* only index.html uses this function */
function greeting(){
    firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //User is logged in
        userID = firebase.auth().currentUser.uid;
        $("#main-greeting").text("Welcome back, " + user.displayName + "!");
        $("#main-greeting").css("visibility", "visible");
    } else {
        console.log("not logged in");
            $("#main-greeting").css("visibility", "visible");
    }
    });
}

/* changed profile pic to your accounts */
/* Only profile.html uses this function */
/**
function profimg(){
    firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //User is logged in
        //Initialize the image reference then call getProfileImage()
        imageRef = firebase.database().ref('ProfileImages/' + userID);
        getProfileImage();
        listingImageRef = firebase.database().ref('ListingImages/' + userID);

    } else {
        // function can't be called if your not logged in
    }
});
}
**/
function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
    location.href = "index.html"
}

profimg();

/*
A function that creates a post in FireBase
*/
function createPost(lsaddress, city, province, length, width, height, description, imageURL) {
    // Get a key for a new Post.

    let newPostKey = firebase.database().ref().push().key;
    /** let userID = firebase.auth().currentUser.uid; **/
    console.log(newPostKey);

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
    console.log(uid);

    if (imageURL === null) {
        imageURL = "NULL";
        //If the user has not uploaded an image that is okay, set this variable as "NULL"
    }
    var postData = {
        Address: lsaddress,
        key: newPostKey,
        City: city,
        Province: province,
        Length: length,
        Width: width,
        Height: height,
        Account: uid,
        Description: description,
        RentedOut: "NULL",
        ListingImage: imageURL,
        City_height: city + "_" + height,
        City_length: city + "_" + length,
        City_width: city + "_" + width
    };

    var updates = {};
    updates['Listings/' + newPostKey] = postData;
    firebase.database().ref().update(updates);

}


/*
             A jQuery function that grabs information from a form and assigns it to constants
             and then calls the createPosts function 
         */

$(function postForm() {

    /** firebase.initializeApp(config); **/
    $(".js-form").on('submit', event => {
        var user = firebase.auth().currentUser;
        if (user == null) {
            event.preventDefault();
            $('#user_login').modal('toggle');
            // window.alert("Please login");
            // location.href("#user_login"); 
        }
        if (user != null) {
            event.preventDefault();

            var address = $('#autocomplete').val();
            address = address.replace(/,/g, "");
            var addressArray = address.split(" ");
            var streetAddress;

            for (var i = 0;
                (addressArray.length - 3) > i; i++) {
                if (i == 0) {

                    // The first address component 

                    streetAddress = addressArray[i];

                } else {
                    // Not the first address component
                    var temp = (" ").concat(addressArray[i]);
                    streetAddress = streetAddress.concat(temp);

                }


            }

            const city = addressArray[addressArray.length - 3];
            const province = addressArray[addressArray.length - 2];
            const length = $('#make_length').val();
            const width = $('#make_width').val();
            const height = $('#make_height').val();
            const description = $('textarea#descrip').val();

            console.log(streetAddress, city, province, length, width, height);
            createPost(streetAddress, city, province, length, width, height, description, imageLink);
            handleComplete();
        }
        // redirect();
        // window.location.replace("succpost.html");
        // }
        /**
        if (user == null){
            event.preventDefault();
            $('#user_login').modal('toggle')
            // window.alert("Please login");
            // location.href("#user_login"); 
        }
        **/
        // window.location.replace("succpost.html");
        // location.href = "succpost.html";
    })
});

function handleComplete() {
    window.setTimeout(function () {

        // Move to a new location or you can do something else
        window.location.href = "succpost.html";

    }, 500);
};

function redirect() {
    window.location.replace("succpost.html");
    return false;
}


function getProfileImage() {

    imageRef.on('value', function (snapshot) {
        if (snapshot != null) {
            $('.prfl-user-icon').css({
                "background-image": "url(" + snapshot.val().url + ")"
            });
        }
    });


}


/** A function that loads the default user information in the profile page **/

function loadDefaultInfo() {


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            let currentUser = firebase.auth().currentUser;
            firebase.database().ref("/Profiles/" + currentUser.uid).once("value", snapshot => {
                if (snapshot.exists()) {
                    $("#full_name").attr("placeholder", snapshot.val().Name);
                    $("#full_name").attr("value", snapshot.val().Name);

                    $("#description").attr("placeholder", snapshot.val().Description);
                    $("#description").attr("value", snapshot.val().Description);

                    $("#phone_number").attr("placeholder", snapshot.val().Phone);
                    $("#phone_number").attr("value", snapshot.val().Phone);

                    $("#your_address").attr("placeholder", snapshot.val().Address);
                    $("#your_address").attr("value", snapshot.val().Address);

                    $("#your_email").attr("placeholder", snapshot.val().Email);
                    $("#your_email").attr("value", snapshot.val().Email);

                } else {
                    console.log("Profile does not exist. No information to load.");
                }
            });

        } else {


            //user is not logged in.
        }
    });

}
/** A function that creates a user's profile. This method does not check if the profile has already been created. As that functionality is in the function checkProfileExists(). If a profile has already been created, no changes are made to the database. **/
function createProfile() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            let currentUser = firebase.auth().currentUser;
            //Create the user's profile in Firebase if it does not currently exist
            var postData = {
                Name: currentUser.displayName,
                Address: "Enter your address",
                Phone: "Enter your phone number",
                Description: "A description about yourself in 200 characters or less",
                Email: currentUser.email
            };
            var updates = {};
            updates['Profiles/' + currentUser.uid] = postData;
            firebase.database().ref().update(updates);
            console.log("created profile");

        } else {


            //user is not logged in.
        }
    });
}

/** A method that checks if a user's profile already exists in the Firebase database, if the user's profile does not exist, this function calls the callback function passed to it **/

function checkProfileExists(success, fail) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let currentUser = firebase.auth().currentUser;
            //Check if the the Profile has been created yet in the database
            firebase.database().ref("/Profiles/" + currentUser.uid).once("value", snapshot => {
                if (snapshot.exists()) {
                    console.log("User already exists in the database!");
                    //The user already exists in Firebase.
                    success; //Call the success() function if the profile exists.
                } else {
                    fail; //Call the fail() function if the profile does not exist.
                }
            });
        } else {
            //The user is not logged in.
        }
    });
}
