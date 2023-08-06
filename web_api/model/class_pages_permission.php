<?php
include_once("class_database.php");

class PagesPermission
{
// 	SET  @num := 0;

// UPDATE your_table SET id = @num := (@num+1);

// ALTER TABLE your_table AUTO_INCREMENT =1;
	private $tableName = "pages_permission";
	private $accessDatabase;
	function __construct()
	{
		$this->accessDatabase = new Database();
	}
	function select($action, $parameters, $orderBy = null, $limit = null)
	{
		$condition = "";
		$bindParams = null;
		if (array_key_exists("pageURL", $parameters)) {
			$bindParams["param"][] = $parameters["pageURL"];
			$condition .= " And page_url = ?";
		}

		$query = "Select * From $this->tableName Where 1 = 1 $condition $orderBy $limit";

		$result = $this->accessDatabase->executeAndFetch("select", $query, $bindParams);

		return $result;
	}

	function insert($action, $parameters)
	{
		if (array_key_exists("fk_user", $parameters)) {
			$bindParams["param"][] = $parameters["fk_user"];
		}
		if (array_key_exists("title", $parameters)) {
			$bindParams["param"][] = $parameters["title"];
		}
		if (array_key_exists("slug", $parameters)) {
			$bindParams["param"][] = $parameters["slug"];
		}
		if (array_key_exists("content", $parameters)) {
			$bindParams["param"][] = html_entity_decode($parameters["content"]);
		}
		if (array_key_exists("meta_keyword", $parameters)) {
			$bindParams["param"][] = $parameters["meta_keyword"];
		}
		if (array_key_exists("meta_description", $parameters)) {
			$bindParams["param"][] = $parameters["meta_description"];
		}
		
		$query = "Insert Into $this->tableName (fk_user,title,slug,content,meta_keyword,meta_description,created_at,updated_at)
		 Values(?,?,?,?,?,?,now(),now()) ";

		$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);
		if ($errorCode == 1062) {
			$code = Codes::msg_SlugExists;
		}
		if (is_null($errorCode)) {
			$code = Codes::msg_SuccessfulCUD;
		}
		return ["code" => $code];
	}

	function update($action, $parameters)
	{
		if (array_key_exists("fk_user", $parameters)) {
			$bindParams["param"][] = $parameters["fk_user"];
		}
		if (array_key_exists("title", $parameters)) {
			$bindParams["param"][] = $parameters["title"];
		}
		if (array_key_exists("slug", $parameters)) {
			$bindParams["param"][] = $parameters["slug"];
		}
		if (array_key_exists("content", $parameters)) {
			$bindParams["param"][] =  html_entity_decode($parameters["content"]);
		}
		if (array_key_exists("meta_keyword", $parameters)) {
			$bindParams["param"][] = $parameters["meta_keyword"];
		}
		if (array_key_exists("meta_description", $parameters)) {
			$bindParams["param"][] = $parameters["meta_description"];
		}
		if (array_key_exists("pk", $parameters)) {
			$bindParams["param"][] = $parameters["pk"];
		}
		$query = "Update $this->tableName Set fk_user = ? , title = ? , slug = ? , 
				content = ? , meta_keyword = ? , meta_description = ? , updated_at = now()  Where pk_page = ?";

		$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);
		if ($errorCode == 1062) {
			$code = Codes::msg_groupTitleExists;
		}
		if (is_null($errorCode)) {
			$code = Codes::msg_SuccessfulCUD;
		}
		return ["code" => $code];
	}

	function delete($action, $parameters)
	{

		$errorCode = null;
		if (array_key_exists("pk", $parameters)) {
			$bindParams["param"][] = $parameters["pk"];
		}
		$query = "Delete From $this->tableName Where pk_page = ?";

		$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);

		if ($errorCode == 1451) {
			$code = Codes::msg_constraintGroupRole;
		}

		if (is_null($errorCode)) {
			$code = Codes::msg_SuccessfulCUD;
		}
		return ["code" => $code];
	}

}



?>