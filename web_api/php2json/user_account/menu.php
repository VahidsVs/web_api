<?php
include_once("../../class_menu.php");
include_once("../../class_authorization.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

$headers=getallheaders();
session_start();
$accessAuthorization=new Authorization();
$isAuthorized["auth"]=$isAuthorized["aa"]=false;
if (array_key_exists("Authorization", $headers) && array_key_exists("token", $_SESSION) && array_key_exists("key", $_SESSION))
    $isAuthorized = $accessAuthorization->isAuthorized($headers["Authorization"], $_SESSION["token"], $_SESSION["key"], RolesTitle::role_permissionLevelManagement);
    if($isAuthorized["auth"]&&$isAuthorized["aa"])
    {
    $param["userId"] = $_SESSION["userId"];
    $accessMenu = new Menu();
    $jsonData = $accessMenu->getMenu($param);
    http_response_code(200);
    echo json_encode($jsonData);
} else {
    http_response_code(401);
    $unathorizedMsg = ["message" => "Unauthorized access!"];
    echo json_encode($unathorizedMsg);
}


?>