<?php
include("../../interface/class_contact_us.php");
include_once("../../class_codes.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

// New Data Input
session_start();
if (array_key_exists("captchaCode", $_POST) && ($_POST["captchaCode"] == $_SESSION["captchaCode"])) {
    $accessClass = new ContactUs("Insert", $_POST);
    $jsonData = $accessClass->getJsonData();
    http_response_code($accessClass->getHttpResponseCode());
} else {
    if (!array_key_exists("captchaCode", $_POST))
        $jsonData["errors"]["captchaCode"] = Codes::msg_isRequired;
    else
        $jsonData["errors"]["captchaCode"] = Codes::msg_invalidCaptchaInput;
    http_response_code(400); //Invalid captcha input
}
echo json_encode($jsonData);

?>