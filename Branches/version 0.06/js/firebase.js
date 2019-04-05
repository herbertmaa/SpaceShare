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
            // Leave the lines as is for the providers you want to offer your users.
            //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            //firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            //firebase.auth.PhoneAuthProvider.PROVIDER_ID
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

        //User is logged in
        //Update the navigation bar so there are affordances regarding the login status of the user
        $("#signup").hide();
        $("#signup2").hide();
        $("#login").hide();
        $("#login2").hide();
        var navb = document.getElementsByClassName("navbar-nav");
        navb[0].style.visibility = "visible";
        userID = firebase.auth().currentUser.uid;

        //Renames the main greeting to Welcome back if you are on the home page
        if ($('#main-greeting').length != 0) {

            $("#main-greeting").text("Welcome back, " + user.displayName + "!");
            $("#main-greeting").css("visibility", "visible");
        }
        if ($('#srch').length != 0) {
            $("#srch").css("visibility", "visible");
        }

        //Initialize the image reference then call getProfileImage()
        imageRef = firebase.database().ref('ProfileImages/' + userID);
        getProfileImage();
        listingImageRef = firebase.database().ref('ListingImages/' + userID);

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
        loggedIn = true;
        $('#loading_overlay').css("display", "none");
        if ($('#main-greeting').length != 0) {
            $("#main-greeting").css("visibility", "visible");
        }
        if ($('#srch').length != 0) {
            $("#srch").css("visibility", "visible");
        }
        /**
        var maingreet = document.getElementById("main-greeting");
        maingreet.style.visibility = "visible";
        $('.container').removeClass('hidden');
        **/
    }
});


function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
    location.href = "index.html"
}


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
        ListingImage: imageURL
        City_height: city + "_" + height;
        City_length:city + "_" + length;
        City_width:city + "_" + width;
    };

    var updates = {};
    updates['ListingsTest/' + newPostKey] = postData;
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
