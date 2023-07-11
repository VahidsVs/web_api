<?php
include_once("class_database.php");

class Posts
{
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
			$bindParams["param"][0] = $parameters["pk"];
			$condition .= " And pk_post = ?";

		}
		if (array_key_exists("slug", $parameters)) {
			$bindParams["param"][1] = $parameters["slug"];
			$condition .= " And slug = ?";

		}
				$query = "Select $this->tableName.*,users.username,cat.title as cat_title, pac.title as pac_title From  $this->tableName, categories cat, parents_category pac, users Where $this->tableName.fk_category = cat.pk_category And
				 cat.fk_parent_category = pac.pk_parent_category And $this->tableName.fk_user = users.pk_user And  1=1  $condition ";
	
		$result = $this->accessDatabase->executeAndFetch("select", $query, $bindParams, $orderBy, $limit);

		return $result;
	}

	function insert($action, $parameters)
	{
		if (array_key_exists("title", $parameters)) {
			$bindParams["param"][0] = $parameters["title"];
		}
		if (array_key_exists("slug", $parameters)) {
			$bindParams["param"][1] = $parameters["slug"];
		}
		if (array_key_exists("summary", $parameters)) {
			$bindParams["param"][2] = $parameters["summary"];
		}
		if (array_key_exists("fk_category", $parameters)) {
			$bindParams["param"][3] = $parameters["fk_category"];
		}
		if (array_key_exists("content", $parameters)) {
			$bindParams["param"][4] = $parameters["content"];
		}
		if (array_key_exists("meta_keyword", $parameters)) {
			$bindParams["param"][5] = $parameters["meta_keyword"];
		}
		if (array_key_exists("meta_description", $parameters)) {
			$bindParams["param"][6] = $parameters["meta_description"];
		}
		if (array_key_exists("status", $parameters)) {
			$bindParams["param"][7] = $parameters["status"];
		}

		$query = "Insert Into $this->tableName (fk_user,title,slug,summary,fk_category,content,meta_keyword,meta_description,status,created_at)
		 Values(?,?,?,?,?,?,?,?,?,?) ";
	
		$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);
		if($errorCode==1062)
		{
			$code=Codes::msg_groupSlugExists;
		}
		if(is_null($errorCode))
		{
			$code=Codes::msg_SuccessfulCUD;
		}
		return ["code"=>$code];	}

		function update($action, $parameters)
	{
		if (!empty($parameters["item"]["title"])) {
			$bindParams["param"][0] = $parameters["item"]["title"];
		}

		if (!empty($parameters["pk"])) {
			$bindParams["param"][1] = $parameters["pk"];
		}

				$query = "Update $this->tableName Set title = ? Where pk_group_role = ?";
	

		$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);
		if($errorCode==1062)
		{
			$code=Codes::msg_groupTitleExists;
		}
		if(is_null($errorCode))
		{
			$code=Codes::msg_SuccessfulCUD;
		}
		return ["code"=>$code];	
	}

	function delete($action, $parameters)
	{
		
		$errorCode=null;
		if (array_key_exists("pk", $parameters)) {
			$bindParams["param"][0] = $parameters["pk"];
		}
		$query = "Delete From $this->tableName Where pk_group_role = ?";
	
		$errorCode = $this->accessDatabase->executeAndFetch($action, $query, $bindParams);
	
		if ($errorCode == 1451) {
			$code = Codes::msg_constraintGroupRole;
		}

		if(is_null($errorCode))
		{
			$code=Codes::msg_SuccessfulCUD;
		}
		return ["code"=>$code];	
	}

}



?>