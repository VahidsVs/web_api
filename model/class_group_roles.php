<?php
include("class_database.php");

class GroupRoles
{
	private $tableName = "group_roles";
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

	function insert($action, $parameters)
	{
		if (array_key_exists("title", $parameters)) {
			$bindParams["param"][0] = $parameters["title"];
		}

				$query = "Insert Into $this->tableName (pk_group_role,title) Values(UUID(),?) ";
	
		$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);
		if($errorCode==1062)
		{
			$code=Codes::msg_groupTitleExists;
		}
		if(is_null($errorCode))
		{
			$code=Codes::msg_SuccessfulCUD;
		}
		return ["code"=>$code];	}

		function update($action, $parameters)
	{
		if (!empty($parameters["item"]["title"])) {
			$bindParams["param"][0] = $parameters["item"]["title"];
		}

		if (!empty($parameters["pk"])) {
			$bindParams["param"][1] = $parameters["pk"];
		}

				$query = "Update $this->tableName Set title = ? Where pk_group_role = ?";
	

		$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);
		if($errorCode==1062)
		{
			$code=Codes::msg_groupTitleExists;
		}
		if(is_null($errorCode))
		{
			$code=Codes::msg_SuccessfulCUD;
		}
		return ["code"=>$code];	
	}

	function delete($action, $parameters)
	{
		
		$errorCode=null;
		if (array_key_exists("pk", $parameters)) {
			$bindParams["param"][0] = $parameters["pk"];
		}
		$query = "Delete From $this->tableName Where pk_group_role = ?";
	
		$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);
	
		if ($errorCode == 1451) {
			$code = Codes::msg_constraintGroupRole;
		}

		if(is_null($errorCode))
		{
			$code=Codes::msg_SuccessfulCUD;
		}
		return ["code"=>$code];	
	}

}



?>