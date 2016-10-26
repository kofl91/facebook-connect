<?php

if (empty($_POST))
{
    return;
}

$jsonObj = $_POST['msg'];
$parameterData = json_decode($jsonObj,true);

$password = "mypassword";

// Create the keypair
$config = array(
    "digest_alg" => "sha256",
    "private_key_bits" => 2048,
    "private_key_type" => OPENSSL_KEYTYPE_RSA,
);
    
// Create the private and public key
$res = openssl_pkey_new($config);

$dn = array(
    "countryName" => 'DE',
    "stateOrProvinceName" => 'stateOrProvinceName',
    "localityName" => 'localityName',
    "organizationName" => 'organizationName',
    "organizationalUnitName" => 'organizationalUnitName',
    "commonName" => 'commonName',
    "emailAddress" => 'emailAddress@com.de'
);

$csr = openssl_csr_new($dn, $res);
var_dumb($csr);

$certpath = "ca-root.pem";
$fp = fopen($certpath, "r"); 
$certfile = fread($fp, 8192); 
fclose($fp); 
$cacert = openssl_x509_read($certfile);


$keypath = "ca-key.pem";
$fp = fopen($keypath, "r"); 
$keyfile = fread($fp, 8192); 
fclose($fp); 
$pkeyfile = openssl_pkey_get_private($keyfile,"harryisca");

//$privkey = array($pkeyfile, "harryisca");
$sscert = openssl_csr_sign($csr, $cacert, $pkeyfile, 365);

openssl_csr_export($csr, $csrout);
openssl_x509_export($sscert, $certout);
openssl_pkey_export($res, $pkeyout, $password);
file_put_contents('filename.csr', $csrout);
file_put_contents('filename.cer', $certout);
file_put_contents('filename.key', $pkeyout);

$arr = array('status' => "OK", 'pk' => $pkeyout, 'cert' => $certout);

echo json_encode($arr);
?>