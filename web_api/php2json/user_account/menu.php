<?php
include_once("../../interface/class_user_in_group.php");
include_once("../../class_menu.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

session_start();
$param["userId"]=$_SESSION["userId"];

$accessMenu = new Menu();
$jsonData=$accessMenu->getMenu($param);

    http_response_code(200);
    echo json_encode($jsonData);

?>