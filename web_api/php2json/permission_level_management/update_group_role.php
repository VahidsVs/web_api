
<?php
include_once("../../interface/class_group_role.php");
include_once("../../class_authorization.php");
include_once("../../class_roles_title.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

$headers=getallheaders();
session_start();
$accessAuthorization=new Authorization();
if (array_key_exists("Authorization", $headers) && array_key_exists("token", $_SESSION) && array_key_exists("key", $_SESSION)) {
    $isAuthorized = $accessAuthorization->isAuthorized($headers["Authorization"], $_SESSION["token"], $_SESSION["key"], RolesTitle::role_permissionLevelManagement);
if($isAuthorized["auth"]&&$isAuthorized["aa"])
{
$jsonPost = json_decode(file_get_contents('php://input'), true);

$accessGroupRole = new GroupRole("Update", $jsonPost);
http_response_code($accessGroupRole->getHttpResponseCode());
echo json_encode($accessGroupRole->getJsonData());
}}
else
{
http_response_code(401);
$unathorizedMsg=["message"=>"Unauthorized access!"];
echo json_encode($unathorizedMsg);
}

?>
