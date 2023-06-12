<?php
include_once("../../interface/class_group_role.php");
include_once("../../class_authorization.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$headers=getallheaders();
session_start();
$accessAuthorization=new Authorization();
$isAuthorized=$accessAuthorization->isAuthorized($headers["Authorization"],$_SESSION["token"],$_SESSION["key"]);
if($isAuthorized)
{
    
$accessGroupRole = new GroupRole("Select", $_GET);
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
