<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$iniConfig = parse_ini_file("../../config.ini");


$target_dir = "";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$isUploadOk = true;
$fileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$fileName=$_FILES["fileToUpload"]["name"];
$renamedFileName=str_replace(".".$fileType,"",$fileName ).uniqid ().".".$fileType;

// Check file size
if ($_FILES["fileToUpload"]["size"] > $iniConfig["max-file-size"]) {
  echo "Sorry, your file is too large.".$_FILES["fileToUpload"]["size"];
  $isUploadOk = false;
}

// Allow certain file formats
if(!in_array($fileType,["jpg","jpeg","png"])){
  echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $isUploadOk = false;
}

// Check if $isUploadOk is set to 0 by an error
if ($isUploadOk) {
// if everything is ok, try to upload file
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $renamedFileName)) {

echo json_encode($jsonData);
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}
else {
    echo "Sorry, your file was not uploaded.";
  // if everything is ok, try to upload file
  } 
?>