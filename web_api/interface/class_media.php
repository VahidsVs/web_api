<?php
include_once("../../model/class_medias.php");
include_once("../../class_codes.php");

$GLOBALS["iniConfig"] = parse_ini_file("../../config.ini");

class Media
{
	private $accessMedias;
	private $httpResponseCode;
	private $jsonData;
	private $isDataOK = true;
	function __construct($action, $parameters, $orderBy = null, $limit = null)
	{
		$this->accessMedias = new Medias();
		if ($action == "select")
			self::select($action, $parameters, $orderBy, $limit);
		if ($action == "insert")
			self::insert($action, $parameters);
		if ($action == "delete")
			self::delete($action, $parameters);

	}
	private function select($action, $parameters, $orderBy, $limit)
	{
			$result = $this->accessMedias->select($action, $parameters, $orderBy, $limit);
			$this->jsonData = $result;
			$this->httpResponseCode = 200;
	}
	private function insert($action, $parameters)
	{
		$message["fileName"]=$message["fileExtension"]=$message["fileSize"]=$message["filePath"]=null;
		if (empty($parameters["fileName"])) {
			$message["fileName"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["fileExtension"])) {
			$message["fileExtension"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["fileSize"])) {
			$message["fileSize"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["filePath"])) {
			$message["filePath"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (!$this->isDataOK) {
			$this->httpResponseCode = 400;
			$this->jsonData["errors"] = ["fileName" => $message["fileName"],"fileExtension" => $message["fileExtension"],"fileSize"=>$message["fileSize"],"filePath" => $message["filePath"]];
		}
		if ($this->isDataOK) {
			$result = $this->accessMedias->insert($action, $parameters);
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

		if (empty($parameters["pk"])) {
			$message[0] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}

		if (!$this->isDataOK) {
			$this->httpResponseCode = 400;
			$this->jsonData["errors"] = ["pk" => $message[0]];
		}

		if ($this->isDataOK) {
			$result = $this->accessMedias->delete($action, $parameters);
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