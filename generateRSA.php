<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$text;
exec("openssl genrsa -out zertifikat-key.pem 4096",$text);
foreach ($text as $entry)
{
    echo $entry;
}
echo "worked!";
 ?>
