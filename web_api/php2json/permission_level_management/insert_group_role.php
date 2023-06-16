<?php
include_once("../../interface/class_group_role.php");
include_once("../../class_authorization.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

$headers=getallheaders();
session_start();
$accessAuthorization=new Authorization();
$isAuthorized=$accessAuthorization->isAuthorized($headers["Authorization"],$_SESSION["token"],$_SESSION["key"],RolesTitle::role_permissionLevelManagement);

if($isAuthorized)
{
$accessGroupRole = new GroupRole("Insert", $_POST);
http_response_code($accessGroupRole->getHttpResponseCode());
echo json_encode($accessGroupRole->getJsonData());
}
else
{
http_response_code(401);
$unathorizedMsg=["message"=>"Unauthorized access!"];
echo json_encode($unathorizedMsg);
}

?>
