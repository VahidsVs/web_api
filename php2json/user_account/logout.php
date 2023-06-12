<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$headers = getallheaders();
//echo $headers["Authorization"];
session_start();
session_unset();
session_destroy();
http_response_code(200);
$jsonData = ["statusCode" => 200];
echo json_encode($jsonData);
?>