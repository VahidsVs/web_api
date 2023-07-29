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
	function __construct($action, $parameters)
	{
		$this->accessPosts = new Posts();
		if ($action == "select")
			self::select($action, $parameters);
		if ($action == "selectWithPagination")
			self::selectWithPagination($action, $parameters);
		if ($action == "insert")
			self::insert($action, $parameters);
		if ($action == "update")
			self::update($action, $parameters);
		if ($action == "delete")
			self::delete($action, $parameters);

	}
	private function selectWithPagination($action, $parameters)
	{
		$key = "pac";
		array_key_exists("page", $parameters) ? $page = $parameters["page"] * 2 - 2 : $page = 0;
		array_key_exists("pageSize", $parameters) ? $limit = "Limit $page,{$parameters["pageSize"]}" : $limit = null;
		array_key_exists("pac", $parameters) ? $parameters["pac"] = openssl_decrypt($parameters["pac"], "AES-128-ECB", $key) : null;

		$orderBy = "Order By updated_at Desc";
		$resultPagination = $this->accessPosts->select($action, $parameters, $orderBy, $limit);

		$total = $this->accessPosts->total($action, $parameters);
		$result["data"]=$resultPagination;
		$result["total"]=$total[0]["total"];		
		$this->jsonData = $result;
		$this->httpResponseCode = 200;
	}
	private function select($action, $parameters)
	{
		$key = "pac";
		//$encrypted_string=openssl_encrypt(2,"AES-128-ECB",$key);
		//$encrypted_string=openssl_encrypt(3,"AES-128-ECB",$key);
		array_key_exists("pageSize", $parameters) ? $limit = "Limit 0,{$parameters["pageSize"]}" : $limit = null;
		array_key_exists("pac", $parameters) ? $parameters["pac"] = openssl_decrypt($parameters["pac"], "AES-128-ECB", $key) : null;
		$orderBy = "Order By updated_at Desc";
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
		if (empty($parameters["fk_user"])) {
			$message["fk_user"] = Codes::msg_isRequired;
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
			$this->jsonData["errors"] = ["title" => $message["title"], "slug" => $message["slug"], "summary" => $message["summary"], "fk_category" => $message["fk_category"], "status" => $message["status"], "content" => $message["content"]];
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
			$this->jsonData["errors"] = ["pk" => $message["pk"], "title" => $message["title"], "slug" => $message["slug"], "summary" => $message["summary"], "fk_category" => $message["fk_category"], "status" => $message["status"], "content" => $message["content"]];
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