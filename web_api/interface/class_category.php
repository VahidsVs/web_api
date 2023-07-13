<?php

include_once("../../model/class_categories.php");
include_once("../../class_codes.php");

$GLOBALS["iniConfig"] = parse_ini_file("../../config.ini");

class Category
{
	private $accessCategory;
	private $httpResponseCode;
	private $jsonData;
	private $isDataOK = true;
	function __construct($action, $parameters, $orderBy = null, $limit = null)
	{
		$this->accessCategory = new Categories();
		if ($action == "select")
			self::select($action, $parameters, $orderBy, $limit);
	}
	private function select($action, $parameters, $orderBy, $limit)
	{
		if (empty($parameters["fk_parent_category"])) {
			$message["fk_parent_category"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (!$this->isDataOK) {
			$this->httpResponseCode = 400;
			$this->jsonData["errors"] = ["fk_parent_category" => $message["fk_parent_category"]];
		}
		if ($this->isDataOK) {
		$result = $this->accessCategory->select($action, $parameters, $orderBy, $limit);
		{
				$this->jsonData = $result;
				$this->httpResponseCode = 200;
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