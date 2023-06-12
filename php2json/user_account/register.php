<?php
include("../../interface/class_user.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");


// New Data Input
$accessUser = new User("Insert", $_POST);
http_response_code($accessUser->getHttpResponseCode());
echo json_encode($accessUser->getJsonData());

?>