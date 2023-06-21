<?php
include_once("../../class_captcha.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");


// New Data Input
$accessCaptcha = new Captcha();
$jsonCaptcha=["base64Captcha"=>$accessCaptcha->createCaptcha()];
http_response_code(200);
echo json_encode($jsonCaptcha);

?>