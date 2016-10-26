
// Displays the CSR-relevant details of a Facebook Profile
function DisplayFacebookDetails(response) {
    document.getElementById("fbDetailPanel").style.display = 'block';
    var detailTable = document.getElementById("fbDetailTable");

    while (detailTable.firstChild) {
        detailTable.removeChild(detailTable.firstChild);
    }

    var header = detailTable.createTHead();
    var row = header.insertRow(-1);
    row.className += "w3-theme-d1";
    var cell = row.insertCell(0);
    cell.innerHTML = "Field";
    cell = row.insertCell(1);
    cell.innerHTML = "Value";
    cell = row.insertCell(2);
    cell.innerHTML = "Description";

    var i = 0;
    for (i = 0; i < requested_user_field_type_description.length; i = i + 3) {
        row = header.insertRow(-1); // Header is at Row 0 so + 1
        cell = row.insertCell(0);
        cell.innerHTML = requested_user_field_type_description[i];
        cell = row.insertCell(1);
        if ("age_range" == requested_user_field_type_description[i]) {
            cell.innerHTML = "older than " + response[requested_user_field_type_description[i]].min;
        } else {
            cell.innerHTML = response[requested_user_field_type_description[i]];
        }
        cell = row.insertCell(2);
        cell.innerHTML = requested_user_field_type_description[i + 2];
    }
}

// Callback from the login in a Facebook account.
function LoginCallbackFacebook() {
    RequestFacebookDetails();
    DisplayCSRPanel();
}

// Callback from the logout of a Facebook account.
function LogoutCallbackFacebook() {
    document.getElementById("csrPanel").style.display = 'none';
    document.getElementById("fbDetailPanel").style.display = 'none';
}

// Displays the Panel for CSR generation
function DisplayCSRPanel() {
    document.getElementById("csrPanel").style.display = 'block';
    document.getElementById("csrTextarea").innerHTML = "";
    document.getElementById("privateKeyTextarea").innerHTML = "";
}

function escapeHtml(text) {
    return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/\+/g, '*-*')
}

var start = new Date();
// Requests a certificate based on social media information
function RequestCert() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            RequestCertCallback(this);
        }
    };
    var text = {
        countryName: fbProfile['locale'].substring(3),
        stateOrProvinceName: 'undefined',
        localityName: 'undefined',
        organizationName: 'Social Media CA',
        organizationalUnitName: fbProfile['name'],
        commonName: 'facebook.com/app_scoped_user_id/' + fbProfile['id'],
        emailAddress: fbProfile['email'],
        name: 'kim',
        password: 'somepw'
    }

    start = new Date();
    var keys = forge.pki.rsa.generateKeyPair(2048);
    var csrPem = createCertificateRequest(text, keys);
    document.getElementById("csrTextarea").innerHTML = csrPem;
    var parameters = "msg=" + escapeHtml(csrPem);
    xhttp.open("POST", "https://192.168.178.46/thesis/fbconnect/GenerateCertificate2.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

function RequestCertCallback(response) {
    //console.log(response.response);
    document.getElementById("certTextarea").innerHTML = response.response;
}

function createCertificateRequest(certInfo, keys) {
    // create a certification request (CSR)
    //var start = new Date();
    var csr = forge.pki.createCertificationRequest();
   // console.log(forge.pki.privateKeyToPem(keys.privateKey));
    document.getElementById("privateKeyTextarea").innerHTML = forge.pki.privateKeyToPem(keys.privateKey);

    csr.publicKey = keys.publicKey;
    csr.setSubject([{
            name: 'commonName',
            value: certInfo.commonName
        }, {
            name: 'countryName',
            value: certInfo.countryName
        }, {
            name: 'organizationName',
            value: certInfo.organizationName
        }, {
            shortName: 'OU',
            value: certInfo.organizationalUnitName
        }, {
            shortName: 'E',
            value: certInfo.emailAddress
        }]);
    // set (optional) attributes
    csr.setAttributes([{
            name: 'challengePassword',
            value: certInfo.password
        }, {
            name: 'unstructuredName',
            value: certInfo.name
        }]);
    // sign certification request
    csr.sign(keys.privateKey);
    var stop = new Date();
    var diff = stop - start;
    console.log("Duration  was: " + diff);
    return forge.pki.certificationRequestToPem(csr);
}


// Here we initialize the buttons
document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('genCsrButton').addEventListener(
            'click',
            RequestCert);
});