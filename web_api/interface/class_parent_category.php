<?php

include_once("../../model/class_parents_category.php");
include_once("../../class_codes.php");

$GLOBALS["iniConfig"] = parse_ini_file("../../config.ini");

class ParentCategory
{
	private $accessParentCategory;
	private $httpResponseCode;
	private $jsonData;
	private $isDataOK = true;
	function __construct($action, $parameters, $orderBy = null, $limit = null)
	{
		$this->accessParentCategory = new ParentsCategories();
		if ($action == "select")
			self::select($action, $parameters, $orderBy, $limit);
	}
	private function select($action, $parameters, $orderBy, $limit)
	{
		if ($this->isDataOK) {
		$result = $this->accessParentCategory->select($action, $parameters, $orderBy, $limit);
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