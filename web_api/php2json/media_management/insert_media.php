<?php
include_once("../../interface/class_media.php");
include_once("../../class_codes.php");
include_once("../../class_authorization.php");
include_once("../../class_roles_title.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$iniConfig = parse_ini_file("../../config.ini");
$headers = getallheaders();
session_start();
$accessAuthorization = new Authorization();
$isAuthorized["auth"] = $isAuthorized["aa"] = false;
if (array_key_exists("Authorization", $headers) && array_key_exists("token", $_SESSION) && array_key_exists("key", $_SESSION))
  $isAuthorized = $accessAuthorization->isAuthorized($headers["Authorization"], $_SESSION["token"], $_SESSION["key"], RolesTitle::role_mediaManagement);

if ($isAuthorized["auth"] && $isAuthorized["aa"]) {
  $targetDir = "";
  $uploadPath = "../../../uploads";
$targetFile = $targetDir . basename($_FILES["fileUpload"]["name"]);
  $isUploadOk = true;
  $fileExtension = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
  $fileName = $_FILES["fileUpload"]["name"];
  $fileSize = $_FILES["fileUpload"]["size"];
  $fileTempName = $_FILES["fileUpload"]["tmp_name"];
  $renamedFileName = str_replace("." . $fileExtension, "", $fileName) . uniqid() . "." . $fileExtension;


  // Check file size
  if ($fileSize > $iniConfig["max-file-size"]) {
    $jsonData["get"]["fileUploadSize"] = Codes::msg_invalidFileSize;
    http_response_code(400);
    $isUploadOk = false;
  }

  // Allow certain file formats
  if (!in_array($fileExtension, ["jpg", "jpeg", "png"])) {
    $jsonData["errors"]["fileUploadExtension"] = Codes::msg_invalidFileExtension;
    http_response_code(400);
    $isUploadOk = false;
  }

  // Check if $isUploadOk is set to 0 by an error
  if ($isUploadOk) {
    // if everything is ok, try to upload file
    if (move_uploaded_file($fileTempName, "$uploadPath/$renamedFileName")) {
      $params["fileName"]=$renamedFileName;
      $params["fileExtension"]=$fileExtension;
      $params["filePath"]="/uploads";
      $accessClass = new Media("insert", $params);
      http_response_code($accessClass->getHttpResponseCode());
      echo json_encode($accessClass->getJsonData());
    } else {
      $jsonData["errors"]["media"] = Codes::msg_ErrorUploadingFile;
      http_response_code(400);
      echo json_encode($jsonData);
    }
  } else {
    http_response_code(400);
    echo json_encode($jsonData);
  }

} else {
  http_response_code(401);
  $unathorizedMsg = ["message" => "Unauthorized access!"];
  echo json_encode($unathorizedMsg);
}

?>