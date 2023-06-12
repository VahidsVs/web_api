<?php
include("../../interface/class_user.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

$accessUser = new User("Select", $_POST);

if ($accessUser->getHttpResponseCode()==200) {
	session_start();
	$_SESSION["isAnonymous"] = false;
	$_SESSION["token"] = $accessUser->getJsonData()["token"];
	$_SESSION["key"] = $accessUser->getKey();
	$_SESSION["username"] = $accessUser->getUsername();
	http_response_code($accessUser->getHttpResponseCode());
} else {
	session_start();
	$_SESSION = null;
	$_SESSION["isAnonymous"] = true;
	http_response_code($accessUser->getHttpResponseCode());
} 
echo json_encode($accessUser->getJsonData());

?>