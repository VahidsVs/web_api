<?php
include("class_database.php");
include_once("../../class_codes.php");

class Users
{
	private $tableName = "users";
	private $accessDatabase;
	function __construct()
	{
		$this->accessDatabase = new Database();
	}
	function selectByPkUser($action, $parameters, $orderBy = null, $limit = null)
	{
		$condition = "";
		$bindParams = null;
		if (array_key_exists("pkUser", $parameters)) {
			$bindParams["param"][0] = $parameters["pkUser"];
			$condition .= " And pk_user = ?";

		}
				$query = "Select pk_user,username,firstname,lastname,mobile,email From  $this->tableName
				  Where 1=1  $condition ";
	
		$result = $this->accessDatabase->executeAndFetch($action, $query, $bindParams, $orderBy, $limit);
		
		return $result;
	}
	function selectByUsernameAndPassword($action, $parameters, $orderBy = null, $limit = null)
	{
		$condition = "";
		$bindParams = null;
		if (array_key_exists("username", $parameters)) {
			$bindParams["param"][0] = $parameters["username"];
			$condition .= " And username = ?";

		}
				$query = "Select * From  $this->tableName
				  Where 1=1  $condition ";
	
		$result = $this->accessDatabase->executeAndFetch("select", $query, $bindParams, $orderBy, $limit);
		
		return $result;
	}
	function selectAll($action, $parameters, $orderBy = null, $limit = null)
	{
		$bindParams = null;
				$query = "Select pk_user,username,firstname,lastname,mobile,email,title as groupTitle From  $this->tableName Left Join users_in_group On pk_user=fk_user Left Join group_roles On fk_group_role = pk_group_role
				  Where 1=1 ";
				//  echo $query;
	
		$result = $this->accessDatabase->executeAndFetch("select", $query, $bindParams, $orderBy, $limit);
		
		return $result;
	}

	function insert($action, $parameters)
	{
		if (array_key_exists("username", $parameters)) {
			$bindParams["param"][0] = $parameters["username"];
		}
		if (array_key_exists("password", $parameters)) {
			$bindParams["param"][1] = $parameters["password"];
		}
		if (array_key_exists("firstname", $parameters)) {
			$bindParams["param"][2] = $parameters["firstname"];
		}
		if (array_key_exists("lastname", $parameters)) {
			$bindParams["param"][3] = $parameters["lastname"];
		}
		if (array_key_exists("mobile", $parameters)) {
			$bindParams["param"][4] = $parameters["mobile"];
		}
		if (array_key_exists("email", $parameters)) {
			$bindParams["param"][5] = $parameters["email"];
		}

				$query = "Insert Into $this->tableName (pk_user,username,password,firstname,lastname,mobile,email) Values(UUID(),?,?,?,?,?,?) ";
		
		$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);
		if($errorCode==1062)
		{
			$code=Codes::msg_usernameExists;
		}
		if(is_null($errorCode))
		{
			$code=Codes::msg_SuccessfulCUD;
		}
		return ["code"=>$code];
	}

}

?>