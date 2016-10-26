var accessToken;
var oldStatus;
var fbProfile;

// This is called with the results from from FB.getLoginStatus().
function StatusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === oldStatus) {
        return;
    }

    if (response.status === 'connected') {
        LoginCallbackFacebook();
    } else {
        LogoutCallbackFacebook();
    }
    oldStatus = response.status;
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function CheckLoginState() {
    FB.getLoginStatus(function (response) {
        StatusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '393238210800116',
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.5' // use graph api version 2.5
    });
    CheckLoginState();
};

// This function requests all fields of a Facebookprofile
function RequestAllUserFields() {
    var fieldsString = '';
    var i = 0;
    fieldsString += user_fields_type_description[0];
    // Increment by 3 because 3 entrys form a unit of one field
    for (i = 3; i <
            user_fields_type_description.length;
            //125;
            i = i + 3) {
        fieldsString += ',' + user_fields_type_description[i];
    }
    FB.api('/me', 'get', {accessToken: /*pageA*/accessToken, fields: fieldsString}, function (response) {
        displayFieldResponse(response);
    });
}

// This function requests CSR-relevant fields of a Facebookprofile
function RequestFacebookDetails() {
    var fieldsString = '';
    var i = 0;
    fieldsString += requested_user_field_type_description[0];
    // Increment by 3 because 3 entrys form a unit of one field
    for (i = 3;
            i < requested_user_field_type_description.length;
            i = i + 3) {

        fieldsString += ',' + requested_user_field_type_description[i];
    }
    FB.api('/me', 'get', {accessToken: accessToken, fields: fieldsString}, function (response) {
        fbProfile = response;
        DisplayFacebookDetails(response);
    });
}