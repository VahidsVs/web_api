<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$iniConfig = parse_ini_file("../../config.ini");
session_start();
if (array_key_exists("loginTime",$_SESSION) && (time() - $_SESSION['loginTime'] > $iniConfig["session-timeout"]) || !array_key_exists("isAnonymous", $_SESSION)) {
	// last request was more than 1440 seconds ago
	session_unset(); // unset $_SESSION variable for this page
	session_destroy(); // destroy session data
	$jsonSession["isAnonymous"] = true;
	echo json_encode($jsonSession);

} else {
	if (array_key_exists("username", $_SESSION)) {
		$jsonSession["isAnonymous"] = false;
		$jsonSession["username"] = $_SESSION["username"];
		$jsonSession["isInGroup"] = false;
	} else {
		$jsonSession["isAnonymous"] = true;
	}
	echo json_encode($jsonSession);
}

?>