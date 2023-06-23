<?php
include_once("../../interface/class_user_in_group.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$iniConfig = parse_ini_file("../../config.ini");
session_start();
if (array_key_exists("loginTime",$_SESSION) && (time() - $_SESSION['loginTime'] > $iniConfig["session-timeout"])) {
	// last request was more than 1440 seconds ago
	session_unset(); // unset $_SESSION variable for this page
	session_destroy(); // destroy session data
	$jsonSession["isAnonymous"] = true;
	echo json_encode($jsonSession);

} else {
	if (array_key_exists("username", $_SESSION)) {
		$param["fkUser"]=$_SESSION["userId"];
		$accessClass = new UserInGroup("select", $param);
		$jsonSession["isInGroup"] = false;
		$jsonSession["isAnonymous"] = false;
		$jsonSession["username"] = $_SESSION["username"];
		if(!empty($accessClass->getJsonData()))
		$jsonSession["isInGroup"] = true;
	} else {
		$jsonSession["isAnonymous"] = true;
	}
	echo json_encode($jsonSession);
}

?>