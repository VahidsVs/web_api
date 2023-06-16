<?php
include_once("../../interface/class_role.php");
include_once("../../class_authorization.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$headers=getallheaders();
session_start();
$accessAuthorization=new Authorization();
$isAuthorized=$accessAuthorization->isAuthorized($headers["Authorization"],$_SESSION["token"],$_SESSION["key"],RolesTitle::role_permissionLevelManagement);

if($isAuthorized["auth"]&&$isAuthorized["aa"])
{
    
$accessRole = new Role("Select", $_GET);
http_response_code($accessRole->getHttpResponseCode());
echo json_encode($accessRole->getJsonData());
}

else
{
http_response_code(401);
$unathorizedMsg=["message"=>"Unauthorized access!"];
echo json_encode($unathorizedMsg);
}

?>
