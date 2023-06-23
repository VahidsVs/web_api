<?php
include_once("../../interface/class_user.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

	$accessClass = new User("Select", $_POST);
	if ($accessClass->getHttpResponseCode() == 200) {
		session_start();
		$_SESSION["token"] = $accessClass->getJsonData()["token"];
		$_SESSION["key"] = $accessClass->getKey();
		$_SESSION["username"] = $accessClass->getUsername();
		$_SESSION["loginTime"] = time();
		http_response_code($accessClass->getHttpResponseCode());
	} else {
		http_response_code($accessClass->getHttpResponseCode());
	}
	echo json_encode($accessClass->getJsonData());

?>