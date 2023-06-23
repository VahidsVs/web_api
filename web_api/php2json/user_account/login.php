<?php
include_once("../../interface/class_user.php");
include_once("../../class_codes.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

session_start();
if (array_key_exists("captchaCode", $_POST) && ($_POST["captchaCode"] == $_SESSION["captchaCode"])) {
	$accessClass = new User("Select", $_POST);
	$jsonData = $accessClass->getJsonData();
	if ($accessClass->getHttpResponseCode() == 200) {
		$_SESSION["token"] = $accessClass->getJsonData()["token"];
		$_SESSION["key"] = $accessClass->getKey();
		$_SESSION["username"] = $accessClass->getUsername();
		$_SESSION["loginTime"] = time();
		
		http_response_code($accessClass->getHttpResponseCode());
	}
} else {
	if (!array_key_exists("captchaCode", $_POST))
		$jsonData["errors"]["captchaCode"] = Codes::msg_isRequired;
	else
		$jsonData["errors"]["captchaCode"] = Codes::msg_invalidCaptchaInput;
	http_response_code(400); //Invalid captcha input
}
echo json_encode($jsonData);

?>