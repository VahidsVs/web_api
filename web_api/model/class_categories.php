<?php
include_once("class_database.php");

class Categories
{
	private $tableName = "categories";
	private $accessDatabase;
	function __construct()
	{
		$this->accessDatabase = new Database();
	}
	function select($action, $parameters, $orderBy = null, $limit = null)
	{
		$condition = "";
		$bindParams = null;
		if (array_key_exists("fk_parent_category", $parameters)) {
			$bindParams["param"][0] = $parameters["fk_parent_category"];
			$condition .= " And fk_parent_category = ?";

		}
		$query = "Select * From  $this->tableName Where 1=1  $condition ";
		$result = $this->accessDatabase->executeAndFetch("select", $query, $bindParams, $orderBy, $limit);
		return $result;
	}

}



?>