<?php
include_once("../../interface/class_post.php");
include_once("../../class_authorization.php");
include_once("../../class_roles_title.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    $accessClass = new Page("select", $_GET);
    http_response_code($accessClass->getHttpResponseCode());
    echo json_encode($accessClass->getJsonData());

?>