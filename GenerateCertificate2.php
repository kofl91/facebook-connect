<?php
$password = "harryisca";

if (empty($_POST))
{
    return;
}

$csr2 = (string)trim(htmlspecialchars($_POST["msg"]));
$csr2 = str_replace("*-*","+",$csr2);

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

$sscert = openssl_csr_sign($csr2, $cacert, $pkeyfile, 365);

openssl_x509_export($sscert, $certout);
echo $certout;
?>