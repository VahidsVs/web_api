<?php
include("../../model/class_users_in_group.php");
$GLOBALS["iniConfig"] = parse_ini_file("../../config.ini");
include_once("../../class_codes.php");

class UserInGroup
{
	private $accessUsersInGroup;
	private $httpResponseCode;
	private $jsonData;
	private $isDataOK = true;
	function __construct($action, $parameters, $orderBy = null, $limit = null)
	{
		$this->accessUsersInGroup = new UsersInGroup();
		if ($action == "select")
			self::select($action, $parameters, $orderBy, $limit);
		if ($action == "insert")
			self::insert($action, $parameters);
		if ($action == "delete")
			self::delete($action, $parameters);
		if ($action == "selectWithRole")
			self::selectWithRole($action, $parameters, $orderBy, $limit);
	}
	private function selectWithRole($action, $parameters, $orderBy, $limit)
	{
		$message = [""];
		if (empty($parameters["userId"])) {
			$message[0] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}

		if (!$this->isDataOK) {
			$this->httpResponseCode = 400;
			$this->jsonData["errors"] = ["userId" => $message[0]];
		}
		if ($this->isDataOK) {
			$result = $this->accessUsersInGroup->selectWithRole($action, $parameters, $orderBy, $limit);
			$this->jsonData = $result;
			$this->httpResponseCode = 200;

		}
	}
	private function select($action, $parameters, $orderBy, $limit)
	{
		$result = $this->accessUsersInGroup->select($action, $parameters, $orderBy, $limit);
		//if ($result) 
		{
			$this->jsonData = $result;
			$this->httpResponseCode = 200;
		}

	}
	private function insert($action, $parameters)
	{
		$this->isDataOK = true;
		$message = ["", ""];

		if (empty($parameters["fkGroup"])) {
			$message[0] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["fkUser"])) {
			$message[1] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}

		if (!$this->isDataOK) {
			$this->httpResponseCode = 400;
			$this->jsonData["errors"] = ["fkGroup" => $message[0], "fkUser" => $message[1]];
		}
		if ($this->isDataOK) {

			$result = $this->accessUsersInGroup->insert($action, $parameters);
			if ($result["code"] == "msgSuccessfulCUD") {
				$this->httpResponseCode = 200;
				$this->jsonData = ["msg" => $result["code"]];
			} else {
				$this->httpResponseCode = 400;
				$this->jsonData = ["message" => $result["code"]];
			}

		}

	}
	private function delete($action, $parameters)
	{
		$this->isDataOK = true;
		$message = [""];

		if (empty($parameters["fkUser"])) {
			$message[0] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}

		if (!$this->isDataOK) {
			$this->httpResponseCode = 400;
			$this->jsonData["errors"] = ["fkUser" => $message[0]];
		}

		if ($this->isDataOK) {
			$result = $this->accessUsersInGroup->delete($action, $parameters);
			if ($result["code"] == "msgSuccessfulCUD") {
				$this->httpResponseCode = 200;
				$this->jsonData = ["msg" => $result["code"]];
			} else {
				$this->httpResponseCode = 400;
				$this->jsonData = ["message" => $result["code"]];
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