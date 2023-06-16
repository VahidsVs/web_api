<?php

include_once("../../model/class_roles.php");
include_once("../../class_codes.php");

$GLOBALS["iniConfig"] = parse_ini_file("../../config.ini");

class Role
{
	private $accessRoles;
	private $httpResponseCode;
	private $jsonData;
	private $isDataOK = true;
	function __construct($action, $parameters, $orderBy = null, $limit = null)
	{
		$this->accessRoles = new Roles();
		if ($action == "Select")
			self::select($action, $parameters, $orderBy, $limit);
	}
	private function select($action, $parameters, $orderBy, $limit)
	{
				$result = $this->accessRoles->select($action, $parameters, $orderBy, $limit);
			//	if ($result)
			 {
					$this->jsonData = $result;
					$this->httpResponseCode = 200;
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