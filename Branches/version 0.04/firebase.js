// Initialize Firebase
var config = {
    apiKey: "AIzaSyCE2lSLszDUyZEyY--btpdoYs7Ln6PHAXY",
    authDomain: "spaceshare-b68f7.firebaseapp.com",
    databaseURL: "https://spaceshare-b68f7.firebaseio.com",
    projectId: "spaceshare-b68f7",
    storageBucket: "",
    messagingSenderId: "555750963802"
};


firebase.initializeApp(config);

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
    tosUrl: 'index.html',
    // Privacy policy url.
    privacyPolicyUrl: 'index.html'




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
        
        //Renames
        
        $("#main-greeting").text("Welcome back, " + user.displayName);
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
