<?php
include_once("class_database.php");

class ContactUss
{
	private $tableName = "contact_us";
	private $accessDatabase;
	function __construct()
	{
		$this->accessDatabase = new Database();
	}
	function select($action, $parameters, $orderBy = null, $limit = null)
	{
		$condition = "";
		$bindParams = null;
		if (array_key_exists("name", $parameters)) {
			$bindParams["param"][0] = $parameters["name"];
			$condition .= " And name = ?";

		}
				$query = "Select * From  $this->tableName Where 1=1  $condition ";

		$result = $this->accessDatabase->executeAndFetch("select", $query, $bindParams, $orderBy, $limit);

		return $result;
	}
	function insert($action, $parameters)
	{
		$errorCode = null;
		if (array_key_exists("name", $parameters)) {
			$bindParams["param"][] = $parameters["name"];
		}
		if (array_key_exists("email", $parameters)) {
			$bindParams["param"][] = $parameters["email"];
		}
		if (array_key_exists("mobile", $parameters)) {
			$bindParams["param"][] = $parameters["mobile"];
		}
		if (array_key_exists("subject", $parameters)) {
			$bindParams["param"][] = $parameters["subject"];
		}
		if (array_key_exists("message", $parameters)) {
			$bindParams["param"][] = $parameters["message"];
		}
			$query = "Insert Into $this->tableName (name,email,mobile,subject,message,created_at) Values(?,?,?,?,?,now())";
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