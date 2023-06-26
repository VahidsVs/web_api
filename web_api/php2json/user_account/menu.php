<?php
include_once("../../interface/class_user_in_group.php");
include_once("../../class_menu.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");


// New Data Input
$param["userId"]=$_SESSION["userId"];


$classMenu = new Menu();
$jsonData=$classMenu->getMenu($param);


    http_response_code($accessClass->getHttpResponseCode());
    echo json_encode($jsonData);
    

?>