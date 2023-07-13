<?php
include_once("class_database.php");

class ParentsCategories
{
	private $tableName = "parents_category";
	private $accessDatabase;
	function __construct()
	{
		$this->accessDatabase = new Database();
	}
	function select($action, $parameters, $orderBy = null, $limit = null)
	{
		$condition = "";
		$bindParams = null;
		$query = "Select * From  $this->tableName Where 1=1  $condition ";
		$result = $this->accessDatabase->executeAndFetch("select", $query, $bindParams, $orderBy, $limit);
		return $result;
	}

}



?>