<?php
include("../../interface/class_user.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");


// New Data Input
    session_start();
    $param["pkUser"]=$_SESSION["userId"];
    $accessClass = new User("selectByPkUser", $param);
    $jsonData = $accessClass->getJsonData();
    http_response_code($accessClass->getHttpResponseCode());
    echo json_encode($jsonData);

?>