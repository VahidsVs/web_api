<?php
include_once("class_database.php");

class UsersInGroup
{
	private $tableName = "users_in_group";
	private $accessDatabase;
	function __construct()
	{
		$this->accessDatabase = new Database();
	}
	function selectWithRole($action, $parameters, $orderBy = null, $limit = null)
	{
		$condition = "";
		$bindParams = null;
		if (array_key_exists("userId", $parameters)) {
			$bindParams["param"][0] = $parameters["userId"];
			$condition .= " And fk_user= ?";
		}

		$query = "Select * From  $this->tableName ug,roles_in_group rg,roles r Where ug.fk_group_role = rg.fk_group_role And rg.fk_role = r.pk_role And 1=1  $condition ";

		$result = $this->accessDatabase->executeAndFetch("select", $query, $bindParams, $orderBy, $limit);
		return $result;
	}
	function select($action, $parameters, $orderBy = null, $limit = null)
	{
		$condition = "";
		$bindParams = null;
		if (array_key_exists("fkGroup", $parameters)) {
			$bindParams["param"][0] = $parameters["fkGroup"];
			$condition .= " And fk_group_role = ?";
		}
		if (array_key_exists("fkUser", $parameters)) {
			$bindParams["param"][0] = $parameters["fkUser"];
			$condition .= " And fk_user= ?";
		}

		$query = "Select fk_group_role,fk_user,username,firstname,lastname,mobile,email From  $this->tableName,users Where 1=1 And fk_user=pk_user  $condition ";

		$result = $this->accessDatabase->executeAndFetch("select", $query, $bindParams, $orderBy, $limit);

		return $result;
	}
	function insert($action, $parameters)
	{
		$errorCode = null;
		if (array_key_exists("fkGroup", $parameters)) {
			$bindParams["param"][] = $parameters["fkGroup"];

		}
		if (array_key_exists("fkUser", $parameters)) {
			$bindParams["param"][] = $parameters["fkUser"];

		}
		$parameter["fkUser"] = $parameters["fkUser"];
		$resultSelect = self::select("select", $parameter);
		if (!$resultSelect) {
			$query = "Insert Into $this->tableName (fk_group_role,fk_user) Values(?,?)";
			$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);
		} else {
			$errorCode = $code = Codes::msg_userExistsInGroup;
		}

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
		$errorCode=null;
		if (array_key_exists("fkUser", $parameters)) {
			$bindParams["param"][] = $parameters["fkUser"];
		}
		$query = "Delete From $this->tableName Where fk_user = ?";
	
		$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);

		if ($errorCode == 1451) {
			$code = Codes::msg_constraintRoleInGroup;
		}

		if(is_null($errorCode))
		{
			$code=Codes::msg_SuccessfulCUD;
		}
		return ["code"=>$code];	
	}


}

?>