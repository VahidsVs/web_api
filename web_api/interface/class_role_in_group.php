<?php

include_once("../../model/class_roles_in_group.php");
include_once("../../class_codes.php");

$GLOBALS["iniConfig"] = parse_ini_file("../../config.ini");

class RoleInGroup
{
	private $accessRolesInGroup;
	private $httpResponseCode;
	private $jsonData;
	private $isDataOK = true;
	function __construct($action, $parameters, $orderBy = null, $limit = null)
	{
		$this->accessRolesInGroup = new RolesInGroup();
		if ($action == "select")
			self::select($action, $parameters, $orderBy, $limit);
		if ($action == "insertDelete")
			self::insertDelete($action, $parameters);
	}
	private function select($action, $parameters, $orderBy, $limit)
	{
		$message=[""];
				if (empty($parameters["fk"])) {
					$message[0]= Codes::msg_isRequired;
					$this->isDataOK = false;
				}
				if(!$this->isDataOK)
				{
					$this->httpResponseCode = 400;
				$this->jsonData["errors"] = ["fk" => $message[0]];
				}

				$result = $this->accessRolesInGroup->select($action, $parameters, $orderBy, $limit);
				//if ($result) 
				{
					$this->jsonData = $result;
					$this->httpResponseCode = 200;
				}
				
	}
	private function insertDelete($action, $parameters)
	{
		$this->isDataOK = true;
		$message = [""];

				if (empty($parameters["fkGroup"])) {
					$message[0] = Codes::msg_isRequired;
					$this->isDataOK = false;
				}

				if (!$this->isDataOK) {
					$this->httpResponseCode = 400;
					$this->jsonData["errors"] = ["fkGroup" => $message[0]];
				}
				if ($this->isDataOK) {
				
					$result = $this->accessRolesInGroup->insertDelete($action, $parameters);
					if($result["code"]=="msgSuccessfulCUD")
					{
					$this->httpResponseCode = 200;
					$this->jsonData=["msg"=>$result["code"]];
					}
					else
					{
					$this->httpResponseCode = 400;
					$this->jsonData=["message"=>$result["code"]];
					}

				}

	}

	#region Get Methods
	public function getHttpResponseCode()
	{
		return $this->httpResponseCode;
	}
	public function getJsonData()
	{
		return $this->jsonData;
	}
	#endregion
}

?>