// This function is called when a Users status was changed to logged in.
// Hides the login-button
// Displays the logout-button
function changeToLoggedIn(){
  document.getElementById('fb-loginbutton').style.display = "none";
  document.getElementById('fb-logoutbutton').style.display = "";
}

// This function is called when a Users status was changed to logged out.
// Displays the login-button
// Hides the logout-button
function changeToLoggedOut(){
  document.getElementById('fb-loginbutton').style.display = "";
  document.getElementById('fb-logoutbutton').style.display = "none";
}


// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI();
    changeToLoggedIn();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
    changeToLoggedOut();
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
    changeToLoggedOut();
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

// This funcion logs out a user.
function logoutUser(){
  FB.logout(function(response) {
    // user is now logged out
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '393238210800116',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  FB.api('/me', function(response) {
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}

// Here we initialize the buttons
document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('fb-logoutbutton').addEventListener(
    'click',
    logoutUser);
});
