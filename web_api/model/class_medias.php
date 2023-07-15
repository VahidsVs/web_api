<?php
include_once("class_database.php");

class Medias
{
	private $tableName = "medias";
	private $accessDatabase;
	function __construct()
	{
		$this->accessDatabase = new Database();
	}
	function select($action, $parameters, $orderBy = null, $limit = null)
	{
		$iniConfig = parse_ini_file("../../config.ini");
		$condition = "";
		$bindParams = null;
		if (array_key_exists("pk", $parameters)) {
			$bindParams["param"][0] = $parameters["pk"];
			$condition .= " And pk_media = ?";

		}
		$query = "Select *, Concat('{$iniConfig["server_name"]}',path,name) as full_path From  $this->tableName Where 1=1 $condition ";

		$result = $this->accessDatabase->executeAndFetch("select", $query, $bindParams, $orderBy, $limit);

		return $result;
	}

	function insert($action, $parameters)
	{
		$bindParams = null;
		if (array_key_exists("fileName", $parameters)) {
			$bindParams["param"][] = $parameters["fileName"];
		}
		if (array_key_exists("fileExtension", $parameters)) {
			$bindParams["param"][] = $parameters["fileExtension"];
		}
		if (array_key_exists("fileSize", $parameters)) {
			$bindParams["param"][] = $parameters["fileSize"];
		}
		if (array_key_exists("filePath", $parameters)) {
			$bindParams["param"][] = $parameters["filePath"];
		}
		$query = "Insert Into $this->tableName (name,extension,size,path,created_at) Values(?,?,?,?,now())";
		$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);

		if ($errorCode == 1452) {
			$code = Codes::msg_constraintRoleInGroup;
		}
		if (is_null($errorCode)) {
			$code = Codes::msg_SuccessfulCUD;
		}
		return ["code" => $code];
	}
	function delete($action, $parameters)
	{
		$errorCode = null;
		if (array_key_exists("pk", $parameters)) {
			$bindParams["param"][] = $parameters["pk"];
		}
		$resultMedia = self::select("select", $parameters)[0];
		$filePath = "../../../{$resultMedia["path"]}{$resultMedia["name"]}";
		$query = "Delete From $this->tableName Where pk_media = ?";
		if (file_exists($filePath))
		{
		$status = unlink($filePath);
		$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);
		}
		if ($errorCode == 1451) {
			$code = Codes::msg_constraintRoleInGroup;
		}

		if (is_null($errorCode)) {
			$code = Codes::msg_SuccessfulCUD;
		}
		return ["code" => $code];
	}

}



?>