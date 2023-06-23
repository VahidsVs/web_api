<?php
include_once("../../class_captcha.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");


// New Data Input
session_start();
$accessCaptcha = new Captcha();
$createCaptcha=$accessCaptcha->createCaptcha();
$jsonCaptcha=["base64Captcha"=>$createCaptcha[0]];
$_SESSION["captchaCode"]=$createCaptcha[1];
http_response_code(200);
echo json_encode($jsonCaptcha);

?>