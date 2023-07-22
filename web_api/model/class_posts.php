<?php
include_once("class_database.php");

class Posts
{
// 	SET  @num := 0;

// UPDATE your_table SET id = @num := (@num+1);

// ALTER TABLE your_table AUTO_INCREMENT =1;
	private $tableName = "posts";
	private $accessDatabase;
	function __construct()
	{
		$this->accessDatabase = new Database();
	}
	function select($action, $parameters, $orderBy = null, $limit = null)
	{
		$condition = "";
		$bindParams = null;
		if (array_key_exists("pk", $parameters)) {
			$bindParams["param"][] = $parameters["pk"];
			$condition .= " And pk_post = ?";
		}
		if (array_key_exists("slug", $parameters)) {
			$bindParams["param"][] = $parameters["slug"];
			$condition .= " And slug = ?";
		}
		if (array_key_exists("pac", $parameters)) {
			$bindParams["param"][] = $parameters["pac"];
			$condition .= " And pac.pk_parent_category = ?";
		}
		if (array_key_exists("cat", $parameters)) {
			$bindParams["param"][] = $parameters["cat"];
			$condition .= " And cat.pk_category = ?";
		}
		$query = "Select $this->tableName.*,users.username,Concat(users.firstname,' ',users.lastname) as fullname, cat.title as cat_title, cat.fk_parent_category, pac.title as pac_title From  $this->tableName, categories cat, parents_category pac, users Where $this->tableName.fk_category = cat.pk_category And
				 cat.fk_parent_category = pac.pk_parent_category And $this->tableName.fk_user = users.pk_user And $this->tableName.status = 'Published' And  1=1  $condition $orderBy $limit";

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
		if (array_key_exists("summary", $parameters)) {
			$bindParams["param"][] = $parameters["summary"];
		}
		if (array_key_exists("fk_category", $parameters)) {
			$bindParams["param"][] = $parameters["fk_category"];
		}
		if (array_key_exists("content", $parameters)) {
			$bindParams["param"][] = html_entity_decode($parameters["content"]);
		}
		if (array_key_exists("thumbnail_path", $parameters)) {
			$bindParams["param"][] = $parameters["thumbnail_path"];
		}
		if (array_key_exists("meta_keyword", $parameters)) {
			$bindParams["param"][] = $parameters["meta_keyword"];
		}
		if (array_key_exists("meta_description", $parameters)) {
			$bindParams["param"][] = $parameters["meta_description"];
		}
		if (array_key_exists("status", $parameters)) {
			$bindParams["param"][] = $parameters["status"];
		}
		
		$query = "Insert Into $this->tableName (fk_user,title,slug,summary,fk_category,content,thumbnail_path,meta_keyword,meta_description,status,created_at,updated_at)
		 Values(?,?,?,?,?,?,?,?,?,?,now(),now()) ";

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
		if (array_key_exists("summary", $parameters)) {
			$bindParams["param"][] = $parameters["summary"];
		}
		if (array_key_exists("fk_category", $parameters)) {
			$bindParams["param"][] = $parameters["fk_category"];
		}
		if (array_key_exists("content", $parameters)) {
			$bindParams["param"][] =  html_entity_decode($parameters["content"]);
		}
		if (array_key_exists("thumbnail_path", $parameters)) {
			$bindParams["param"][] = $parameters["thumbnail_path"];
		}
		if (array_key_exists("meta_keyword", $parameters)) {
			$bindParams["param"][] = $parameters["meta_keyword"];
		}
		if (array_key_exists("meta_description", $parameters)) {
			$bindParams["param"][] = $parameters["meta_description"];
		}
		if (array_key_exists("status", $parameters)) {
			$bindParams["param"][] = $parameters["status"];
		}
		if (array_key_exists("pk", $parameters)) {
			$bindParams["param"][] = $parameters["pk"];
		}
		$query = "Update $this->tableName Set fk_user = ? , title = ? , slug = ? , summary = ? , fk_category = ? ,
				content = ? , thumbnail_path = ? , meta_keyword = ? , meta_description = ? , status = ? , updated_at = now()  Where pk_post = ?";

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
		$query = "Delete From $this->tableName Where pk_post = ?";

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