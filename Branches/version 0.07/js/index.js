
/** 

Version 1.0.0

This javascript file controls the client side interaction on the index.html page. It will load the customized greeting if the user is logged in.

**/


$(document).ready(function () {

    var uid = localStorage.getItem('uid');
    loadgreeting();
});
