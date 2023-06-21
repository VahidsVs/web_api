<?php
include("../../interface/class_contact_us.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

// New Data Input
$accessUser = new ContactUs("Insert", $_POST);
http_response_code($accessUser->getHttpResponseCode());
echo json_encode($accessUser->getJsonData());

?>