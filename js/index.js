var myUserId;

var accessToken;

var pageAccessToken = "EAACEdEose0cBAK5UNBtp9oEsf8RRjJViz0oZB6lS4xS6QEhnFNuZAVBhFFZAkkrUQIqfHI2sfr4g1DuO7kwEGoioC8fof1pfCfSiigjx14c9cRyA92UAYHGGHmwNDqWZBDK7pCSpUvSLGinzpONg6Re2P568dffaJrVOGOVOZCgZDZD";

// This function is called when a Users status was changed to logged in.
// Hides the login-button
// Displays the logout-button
function changeToLoggedIn(){
  document.getElementById('fb-loginbutton').style.display = "none";
  document.getElementById('fb-logoutbutton').style.display = "block";
  document.getElementById('details').style.display = "block";
  requestAllUserFields();
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

  accessToken = authResponse.accessToken;
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


var permissions_tags = {
profile:'public_profile',
friends:'user_friends',
email:'email',
about:'user_about_me',
books:'user_actions.books',
fitnes:'user_actions.fitness',
music:'user_actions.music',
news:'user_actions.news',
video:'user_actions.video',
birthday:'user_birthday',
education:'user_education_history',
events:'user_events',
games:'user_games_activity',
hometown:'user_hometown',
likes:'user_likes',
location:'user_location',
managed_groups:'user_managed_groups',
photos:'user_photos',
posts:'user_posts',
relationships:'user_relationships',
relationship_details:'user_relationship_details',
religion:'user_religion_politics',
places:'user_tagged_places',
videos:'user_videos',
website:'user_website',
work:'user_work_history',
friendlists:'read_custom_friendlists',
insights:'read_insights',
audience:'read_audience_network_insights',
mailboxes:'read_page_mailboxes',
pages:'manage_pages',
publish_pages:'publish_pages',
publish_actions:'publish_actions',
event:'rsvp_event',
pages_list:'pages_show_list',
pages_manage_cta:'pages_manage_cta',
pages_manage_instant_articles:'pages_manage_instant_articles',
ads_read:'ads_read',
ads_management:'ads_management',
business_management:'business_management',
pages_messaging:'pages_messaging',
pages_messaging_phone_number:'pages_messaging_phone_number'};




var user_fields_type_description = ['id',
'numeric string',
'The id of this persons user account. This ID is unique to each app and cannot be used across different apps. Our upgrade guide provides more information about app-specific IDs',
'about',
'string',
'Equivalent to the bio field',
'age_range',
'AgeRange',
'The age segment for this person expressed as a minimum and maximum age. For example, more than 18, less than 21.',
'bio',
'string',
'A short bio, found on a persons profile in the "About This Person" section',
'birthday',
'string',
'The persons birthday. This is a fixed format string, like MM/DD/YYYY. However, people can control who can see the year they were born separately from the month and day so this string can be only the year (YYYY) or the month + day (MM/DD)',
'context',
'UserContext',
'Social context for this person',
'cover',
'CoverPhoto',
'The persons cover photo',
'currency',
'Currency',
'The persons local currency information',
'devices',
'list<UserDevice>',
'The list of devices the person is using. This will return only iOS and Android devices',
'education',
'list<EducationExperience>',
'The persons education',
'email',
'string',
'The persons primary email address listed on their profile. This field will not be returned if no valid email address is available',
'favorite_athletes',
'list<Experience>',
'Athletes the person likes',
'favorite_teams',
'list<Experience>',
'Sports teams the person likes',
'first_name',
'string',
'The persons first name',
'gender',
'string',
'The gender selected by this person, male or female. This value will be omitted if the gender is set to a custom value',
'hometown',
'Page',
'The persons hometown',
'inspirational_people',
'list<Experience>',
'The persons inspirational people',
'install_type',
'enum',
'Install type',
'installed',
'bool',
'Is the app making the request installed?',
'interested_in',
'list<string>',
'Genders the person is interested in',
'is_shared_login',
'bool',
'Is this a shared login (e.g. a gray user)',
'is_verified',
'bool',
'People with large numbers of followers can have the authenticity of their identity manually verified by Facebook. This field indicates whether the persons profile is verified in this way. This is distinct from the verified field',
'languages',
'list<Experience>',
'Facebook Pages representing the languages this person knows',
'last_name',
'string',
'The persons last name',
'link',
'string',
'A link to the persons Timeline',
'locale',
'string',
'The persons locale',
'location',
'Page',
'The persons current location as entered by them on their profile. This field is not related to check-ins',
'meeting_for',
'list<string>',
'What the person is interested in meeting for',
'middle_name',
'string',
'The persons middle name',

'name',
'string',
'The persons full name',
'name_format',
'string',
'The persons name formatted to correctly handle Chinese, Japanese, or Korean ordering',
'payment_pricepoints',
'PaymentPricepoints',
'The persons payment pricepoints',
'political',
'string',
'The persons political views',
'public_key',
'string',
'The persons PGP public key',
'quotes',
'string',
'The persons favorite quotes',
'relationship_status',
'string',
'The persons relationship status',
'religion',
'string',
'The persons religion',
'security_settings',
'SecuritySettings',
'Security settings',
'shared_login_upgrade_required_by',
'datetime',
'The time that the shared loginneeds to be upgraded to Business Manager by',
'significant_other',
'User',
'The persons significant other',
'sports',
'list<Experience>',
'Sports played by the person',
'test_group',
'unsigned int32',
'Platform test group',
'third_party_id',
'string',
'A string containing an anonymous, but unique identifier for the person. You can use this identifier with third parties',
'timezone',
'float (min: -24) (max: 24)',
'The persons current timezone offset from UTC',
'updated_time',
'datetime',
'Updated time',
'verified',
'bool',
'Indicates whether the account has been verified. This is distinct from the is_verified field. Someone is considered verified if they take any of the following actions:',
'video_upload_limits',
'VideoUploadLimits',
'Video upload limits',
'viewer_can_send_gift',
'bool',
'Can the viewer send a gift to this person?',
'website',
'string',
'The persons website',
'work',
'list<WorkExperience>',
'Details of a persons work experience'];

function requestAllUserFields(){
	var fieldsString = '';
	var i = 0;
	fieldsString += user_fields_type_description[0];
	// Increment by 3 because 3 entrys form a unit of one field
	for (i=3;i<
    user_fields_type_description.length;
    //125;
    i=i+3){
		fieldsString += ',' + user_fields_type_description[i];
	}
  	console.log("The fieldsString: " + fieldsString );
	FB.api('/me', 'get', {accessToken: /*pageA*/accessToken, fields: fieldsString }, function(response) {
		console.log(response);
		displayFieldResponse(response);
	});
}

function displayFieldResponse(response){

	var table = document.createElement("table");
	// Create an empty <thead> element and add it to the table:
	var header = table.createTHead();
	// Create an empty <tr> element and add it to the first position of <thead>:
	var row = header.insertRow(0);
	// Insert a new cell (<td>) at the first position of the "new" <tr> element:
	var cell = row.insertCell(0);
	// Add some bold text in the new cell:
	cell.innerHTML = "<b>Table of all userfields</b>";

	var i=0;
	for(i=0;i<user_fields_type_description.length;i=i+3){
		//console.log(response[i]);
		row = header.insertRow(-1); // Header is at Row 0 so + 1
		cell = row.insertCell(0);
		cell.innerHTML = user_fields_type_description[i];
		cell = row.insertCell(1);
		cell.innerHTML = user_fields_type_description[i+2];
		cell = row.insertCell(2);
		console.log(response[user_fields_type_description[i]]);
		cell.innerHTML = response[user_fields_type_description[i]];
	}

  document.body.appendChild(table);
}
