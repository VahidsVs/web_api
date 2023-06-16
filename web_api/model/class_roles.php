<?php
include_once("class_database.php");

class Roles
{
	private $tableName = "roles";
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
			$bindParams["param"][0] = $parameters["title"];
			$condition .= " And title = ?";

		}
				$query = "Select * From  $this->tableName Where 1=1  $condition ";

		$result = $this->accessDatabase->executeAndFetch($action, $query, $bindParams, $orderBy, $limit);

		return $result;
	}

}



?>