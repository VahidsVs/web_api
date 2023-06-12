<?php
include("class_database.php");

class RolesInGroup
{
	private $tableName = "roles_in_group";
	private $accessDatabase;
	function __construct()
	{
		$this->accessDatabase = new Database();
	}
	function select($action, $parameters, $orderBy = null, $limit = null)
	{
		$condition = "";
		$bindParams = null;
		if (array_key_exists("fk", $parameters)) {
			$bindParams["param"][0] = $parameters["fk"];
			$condition .= " And fk_group_role = ?";

		} 
		$query = "Select * From $this->tableName,roles Where 1=1 And fk_role=pk_role  $condition ";

		$result = $this->accessDatabase->executeAndFetch($action, $query, $bindParams, $orderBy, $limit);

		return $result;
	}
	function insertDelete($action, $parameters, $orderBy = null, $limit = null)
	{
		$bindParamsInsert["param"] = $bindParamsDelete["param"] = $fromDB = $fromUI = $placesDelete = $placesInsert = [];
		$errorCodeInsert = $errorCodeDelete = null;
		$param["fk"] = $parameters["fkGroup"];
		$resultSelect = self::select("Select", $param);
		foreach ($resultSelect as $res) {
			$fromDB[] = $res["fk_role"]; //From DB
		}
		if ($parameters["roles"])
			$fromUI = (explode(",", $parameters["roles"])); //From UI;
		$intersectFull = array_merge(array_intersect(array_intersect($fromUI, $fromDB), array_intersect($fromDB, $fromUI))); //Full Intersect DB & UI
		$diffFullUI = array_merge(array_diff($fromUI, $intersectFull), array_diff($intersectFull, $fromUI)); // Insert To DB
		$diffFullDB = array_merge(array_diff($fromDB, $intersectFull), array_diff($intersectFull, $fromDB)); // Delete From DB
		if ($diffFullUI) {
			foreach ($diffFullUI as $keyVal) { //Insert To DB

				$placesInsert[] = "(?,?)";
				array_push($bindParamsInsert["param"], $parameters["fkGroup"], $keyVal);
			}
			$query = "Insert Into $this->tableName (fk_group_role,fk_role) Values " . implode(",", $placesInsert);
			$errorCodeInsert = $this->accessDatabase->executeAndFetch($action, $query, $bindParamsInsert, $orderBy, $limit);
		}
		if ($diffFullDB) { //Delete From DB	
			$bindParamsDelete["param"][] = $parameters["fkGroup"];
			foreach ($diffFullDB as $keyVal) {
				$placesDelete[] = "?";
				$bindParamsDelete["param"][] = $keyVal;
			}
			$query = "Delete From $this->tableName Where fk_group_role = ? And fk_role In (" . implode(",", $placesDelete) . ")";
			$errorCodeDelete = $this->accessDatabase->executeAndFetch($action, $query, $bindParamsDelete, $orderBy, $limit);
		}

		if ($errorCodeInsert == 1452 || $errorCodeDelete == 1452) {
			$code = Codes::msg_constraintRoleInGroup;
		}
		if (is_null($errorCodeInsert) && is_null($errorCodeDelete)) {
			$code = Codes::msg_SuccessfulCUD;
		}
		return ["code" => $code];
	}

}



?>