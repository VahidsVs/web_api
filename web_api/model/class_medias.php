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
		$condition = "";
		$bindParams = null;
		if (array_key_exists("title", $parameters)) {
			$bindParams["param"][] = $parameters["title"];
			$condition .= " And title = ?";

		}
				$query = "Select * From  $this->tableName Where 1=1  $condition ";

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
			$condition .= " And title = ?";
		}
		if (array_key_exists("filePath", $parameters)) {
			$bindParams["param"][] = $parameters["filePath"];
			$condition .= " And title = ?";

		}
		$query = "Insert Into $this->tableName (name,extension,path,created_at) Values(?,?,?,now())";
		$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);

	if ($errorCode == 1452) {
		$code = Codes::msg_constraintRoleInGroup;
	}
	if (is_null($errorCode)) {
		$code = Codes::msg_SuccessfulCUD;
	}
	return ["code" => $code];
	}

}



?>