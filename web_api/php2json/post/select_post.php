<?php
include_once("../../interface/class_post.php");
include_once("../../class_authorization.php");
include_once("../../class_roles_title.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $_GET["limit"]>=1?$limit="Limit {$_GET["limit"]}":$limit=null;
    $accessClass = new Post("select", $_GET,"Order By updated_at Desc",$limit);
    http_response_code($accessClass->getHttpResponseCode());
    echo json_encode($accessClass->getJsonData());

?>