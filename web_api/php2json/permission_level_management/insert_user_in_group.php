<?php
include_once("../../interface/class_user_in_group.php");
include_once("../../class_authorization.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$headers=getallheaders();
session_start();
$accessAuthorization=new Authorization();
$isAuthorized=$accessAuthorization->isAuthorized($headers["Authorization"],$_SESSION["token"],$_SESSION["key"],RolesTitle::role_permissionLevelManagement);

if($isAuthorized)
{
$jsonPost = json_decode(file_get_contents('php://input'), true);
$accessClass = new UserInGroup("Insert", $jsonPost);   
http_response_code($accessClass->getHttpResponseCode());
echo json_encode($accessClass->getJsonData());
}

else
{
http_response_code(401);
$unathorizedMsg=["message"=>"Unauthorized access!"];
echo json_encode($unathorizedMsg);
}

?>
