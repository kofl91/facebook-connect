var myUserId;

// This function is called when a Users status was changed to logged in.
// Hides the login-button
// Displays the logout-button
function changeToLoggedIn(){
  document.getElementById('fb-loginbutton').style.display = "none";
  document.getElementById('fb-logoutbutton').style.display = "block";
  document.getElementById('details').style.display = "block";
}

// This function is called when a Users status was changed to logged out.
// Displays the login-button
// Hides the logout-button
function changeToLoggedOut(){
  document.getElementById('fb-loginbutton').style.display = "block";
  document.getElementById('fb-logoutbutton').style.display = "none";
  document.getElementById('details').style.display = "none";
}


// Displays the authResponse.
function displayAuthResponse(authResponse){

  var myNode = document.getElementById('accessTokenList');
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }

  var listEntry = document.createElement('li');
  listEntry.innerHTML = "AccessToken : "+ authResponse.accessToken;
  document.getElementById('accessTokenList').appendChild(listEntry);

  listEntry = document.createElement('li');
  listEntry.innerHTML = "Expires in : " + authResponse.expiresIn +" seconds";
  document.getElementById('accessTokenList').appendChild(listEntry);

  listEntry = document.createElement('li');
  listEntry.innerHTML = "Signed Request : " + authResponse.signedRequest;
  document.getElementById('accessTokenList').appendChild(listEntry);

  listEntry = document.createElement('li');
  listEntry.innerHTML = "UserId : " + authResponse.userID;
  document.getElementById('accessTokenList').appendChild(listEntry);
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  console.log(response);

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
  if (response.authResponse){
    displayAuthResponse(response.authResponse);
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
    xfbml      : false,  // parse social plugins on this page
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
    myUserId = response.id;
  });
}

// Here we initialize the buttons
document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('fb-logoutbutton').addEventListener(
    'click',
    logoutUser);
});

function getParameter(parameter)
{
  FB.api(
      "/"+parameter,
      function (response) {
        if (response && !response.error) {
          /* handle the result */
          console.log(response);
        }
      }
  );
}
