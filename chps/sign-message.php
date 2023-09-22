<?php

$key = 'key.pem';
$req = $_POST['request'];


$privateKey = openssl_get_privatekey(file_get_contents($key));


$signature = null;
openssl_sign($req, $signature, $privateKey);


if ($signature) {
  header("Content-type: text/plain");
  echo base64_encode($signature);
  exit(0);
}


return 'Error signing message';
exit(1);