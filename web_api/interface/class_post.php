<?php
include_once("../../model/class_posts.php");
include_once("../../class_codes.php");

$GLOBALS["iniConfig"] = parse_ini_file("../../config.ini");

class Post
{
	private $accessPosts;
	private $httpResponseCode;
	private $jsonData;
	private $isDataOK = true;
	function __construct($action, $parameters, $orderBy = null, $limit = null)
	{
		$this->accessPosts = new Posts();
		if ($action == "select")
			self::select($action, $parameters, $orderBy, $limit);
		if ($action == "insert")
			self::insert($action, $parameters);
		if ($action == "update")
			self::update($action, $parameters);
		if ($action == "delete")
			self::delete($action, $parameters);

	}
	private function select($action, $parameters, $orderBy, $limit)
	{
			$result = $this->accessPosts->select($action, $parameters, $orderBy, $limit);
			$this->jsonData = $result;
			$this->httpResponseCode = 200;
	}
	private function insert($action, $parameters)
	{
		if (empty($parameters["title"])) {
			$message["title"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["slug"])) {
			$message["slug"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["summary"])) {
			$message["summary"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["fk_category"])) {
			$message["fk_category"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["status"])) {
			$message["status"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["content"])) {
			$message["content"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (!$this->isDataOK) {
			$this->httpResponseCode = 400;
			$this->jsonData["errors"] = ["title" => $message["title"],"slug" => $message["slug"],"summary" => $message["summary"],"fk_category" => $message["fk_category"],"status" => $message["status"],"content" => $message["content"]];
		}
		if ($this->isDataOK) {
			$result = $this->accessPosts->insert($action, $parameters);
			if ($result["code"] == "msgSuccessfulCUD") {
				$this->httpResponseCode = 200;
				$this->jsonData = ["msg" => $result["code"]];
			} else {
				$this->httpResponseCode = 400;
				$this->jsonData = ["message" => $result["code"]];
			}
		}
	}
	private function update($action, $parameters)
	{
		if (empty($parameters["pk"])) {
			$message["pk"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["title"])) {
			$message["title"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["slug"])) {
			$message["slug"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["summary"])) {
			$message["summary"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["fk_category"])) {
			$message["fk_category"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["status"])) {
			$message["status"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["content"])) {
			$message["content"] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}

		if (!$this->isDataOK) {
			$this->httpResponseCode = 400;
			$this->jsonData["errors"] = ["pk"=>$message["pk"],"title" => $message["title"],"slug" => $message["slug"],"summary" => $message["summary"],"fk_category" => $message["fk_category"],"status" => $message["status"],"content" => $message["content"]];
		}

		if ($this->isDataOK) {
			$result = $this->accessPosts->update($action, $parameters);
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
			$result = $this->accessPosts->delete($action, $parameters);
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