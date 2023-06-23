<?php

include_once("../../model/class_group_roles.php");
include_once("../../class_codes.php");

$GLOBALS["iniConfig"] = parse_ini_file("../../config.ini");

class GroupRole
{
	private $accessGroupRoles;
	private $httpResponseCode;
	private $jsonData;
	private $isDataOK = true;
	function __construct($action, $parameters, $orderBy = null, $limit = null)
	{
		$this->accessGroupRoles = new GroupRoles();
		if ($action == "Select")
			self::select($action, $parameters, $orderBy, $limit);
		if ($action == "Insert")
			self::insert($action, $parameters);
		if ($action == "Update")
			self::update($action, $parameters);
		if ($action == "Delete")
			self::delete($action, $parameters);

	}
	private function select($action, $parameters, $orderBy, $limit)
	{
				$result = $this->accessGroupRoles->select($action, $parameters, $orderBy, $limit);
			//	if ($result)
				{
					$this->jsonData = $result;
					$this->httpResponseCode = 200;
				}

	}
	private function insert($action, $parameters)
	{
		$message = [""];
				if (empty($parameters["title"])) {
					$message[0] = Codes::msg_isRequired;
					$this->isDataOK = false;
				}

				if (!$this->isDataOK) {
					$this->httpResponseCode = 400;
					$this->jsonData["errors"] = ["title" => $message[0]];
				}

				if ($this->isDataOK) {
					$result = $this->accessGroupRoles->insert($action, $parameters);
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
	private function update($action, $parameters)
	{
		$this->isDataOK = true;
		$message = [];

				if (empty($parameters["pk"])) {
					$message[0] = Codes::msg_isRequired;
					$this->isDataOK = false;
				}
				if (empty($parameters["item"]["title"])) {
					$message[1] = Codes::msg_isRequired;
					$this->isDataOK = false;
				}
				
				if (!$this->isDataOK) {
					$this->httpResponseCode = 400;
					$this->jsonData["errors"] = ["pk" => $message[0],"title" => $message[1]];
				}

				if ($this->isDataOK) {
					$result = $this->accessGroupRoles->update($action, $parameters);
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
	private function delete($action, $parameters)
	{
		$this->isDataOK = true;
		$message = [""];

				if (empty($parameters["pk"])) {
					$message[0] = Codes::msg_isRequired;
					$this->isDataOK = false;
				}

				if (!$this->isDataOK) {
					$this->httpResponseCode = 400;
					$this->jsonData["errors"] = ["pk" => $message[0]];
				}

				if ($this->isDataOK) {
					$result = $this->accessGroupRoles->delete($action, $parameters);
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