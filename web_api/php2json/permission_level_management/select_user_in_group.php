<?php
include_once("../../interface/class_user_in_group.php");
include_once("../../class_authorization.php");
include_once("../../class_roles_title.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$headers=getallheaders();
session_start();
$accessAuthorization=new Authorization();
$isAuthorized["auth"]=$isAuthorized["aa"]=false;
if (array_key_exists("Authorization", $headers) && array_key_exists("token", $_SESSION) && array_key_exists("key", $_SESSION))
    $isAuthorized = $accessAuthorization->isAuthorized($headers["Authorization"], $_SESSION["token"], $_SESSION["key"], RolesTitle::role_permissionLevelManagement);


if($isAuthorized["auth"]&&$isAuthorized["aa"])
{
    
$accessClass = new UserInGroup("select", $_GET);
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
