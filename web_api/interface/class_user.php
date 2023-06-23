<?php
include_once("../../model/class_users.php");
include_once("../../class_authorization.php");
include_once("../../class_captcha.php");

$GLOBALS["iniConfig"] = parse_ini_file("../../config.ini");

class User
{
	private $accessCodes;
	private $accessCaptcha;
	private $accessUsers;
	private $pk_user;
	private $username;
	private $password;
	private $firstname;
	private $lastname;
	private $httpResponseCode;
	private $jsonData;
	private $isDataOK = true;
	private $key;
	function __construct($action, $parameters, $orderBy = null, $limit = null)
	{
		$this->accessUsers = new Users();
		$this->accessCaptcha = new Captcha();
		if ($action == "selectByUsernameAndPassword")
			self::selectByUsernameAndPassword($action, $parameters, $orderBy, $limit);
		if ($action == "insert")
			self::insert($action, $parameters);
		if ($action == "selectAll")
			self::selectAll($action, $parameters, $orderBy, $limit);
		if ($action == "selectByPkUser")
			self::selectByPkUser($action, $parameters, $orderBy, $limit);

	}
	private function selectByPkUser($action, $parameters, $orderBy, $limit)
	{
		$message = [""];

		if (empty($parameters["pkUser"])) {
			$message[0] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (!$this->isDataOK) {
			$this->httpResponseCode = 401;
			$this->jsonData["errors"] = ["pkUser" => $message[0]];
		}
		if ($this->isDataOK) {

				$result = $this->accessUsers->selectByPkUser($action, $parameters, $orderBy, $limit);
			if ($result)
			 {
					$this->jsonData = $result;
					$this->httpResponseCode = 200;
			 }
		}

	}
	private function selectAll($action, $parameters, $orderBy, $limit)
	{
		$result = $this->accessUsers->selectAll($action, $parameters, $orderBy, $limit); {
			$this->jsonData = $result;
			$this->httpResponseCode = 200;
		}
	}
	private function selectByUsernameAndPassword($action, $parameters, $orderBy, $limit)
	{
		$message = ["", "", "", ""];
		if (empty($parameters["username"])) {
			$message[0] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (empty($parameters["password"])) {
			$message[1] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (!$this->isDataOK) {
			$this->httpResponseCode = 400;
			$this->jsonData["errors"] = ["username" => $message[0], "password" => $message[1]];
		} else { //check if username exists
			$result = $this->accessUsers->selectByUsernameAndPassword($action, $parameters, $orderBy, $limit);
			if (!$result) {
				$message[0] = Codes::msg_invalidUsernameOrPassword;
				$this->isDataOK = false;
				$this->httpResponseCode = 400;
				$this->jsonData = ["message" => $message[0]];
			} else {
				$this->password = $result[0]["password"];
				if (!password_verify($parameters["password"], $this->password)) //verify password hash to login user
				{
					$message[0] = Codes::msg_invalidUsernameOrPassword;
					$this->isDataOK = false;
					$this->httpResponseCode = 400;
					$this->jsonData = ["message" => $message[0]];
				} else {
					if ($this->isDataOK) {
						$this->pk_user = $result[0]["pk_user"];
						$this->username = $result[0]["username"];
						$this->firstname = $result[0]["firstname"];
						$this->lastname = $result[0]["lastname"];
						$token = $this->pk_user;
						$token = "" . $token . ":admin" . ":" . time();
						$cipher = $GLOBALS["iniConfig"]["encrypt-algorythm"];
						$accessAuthorization = new Authorization();
						$this->key = $accessAuthorization->createRandomKey();
						$iv = $GLOBALS["iniConfig"]["encrypt-iv"];
						$ecnryptedToken = openssl_encrypt($token, $cipher, $this->key, 10, $iv);
						$this->httpResponseCode = 200;
						$this->jsonData = ["token" => $ecnryptedToken];
					}
				}
			}
		}
	}
	private function insert($action, $parameters)
	{

		$message = ["", "", "", "", "", "", "", ""];
		if (empty($parameters["username"])) {
			$message[0] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}
		if (!empty($parameters["username"]) && intval(strlen($parameters["username"]) < $GLOBALS["iniConfig"]["min-username-length"])) {
			$message[1] = Codes::msg_isLessThan8chars;
			$this->isDataOK = false;
		}
		if (empty($parameters["password"])) {

			$message[2] = Codes::msg_isRequired;
			$this->isDataOK = false;

		}
		if (!empty($parameters["password"]) && intval(strlen($parameters["password"]) < $GLOBALS["iniConfig"]["min-password-length"])) {
			$message[3] = Codes::msg_isLessThan8chars;
			$this->isDataOK = false;
		}
		if (empty($parameters["passwordConfirm"])) {
			$message[4] = Codes::msg_isRequired;
			$this->isDataOK = false;

		}
		if (empty($parameters["firstname"])) {
			$message[5] = Codes::msg_isRequired;
			$this->isDataOK = false;
		}

		if (empty($parameters["lastname"])) {
			$message[6] = Codes::msg_isRequired;
			$this->isDataOK = false;

		}
		if ($parameters["password"] !== $parameters["passwordConfirm"]) {
			$message[7] = Codes::msg_PassAndPassConfirmNotSame;
			$this->isDataOK = false;

		}
		if (!$this->isDataOK) {
			$this->httpResponseCode = 400;
			$this->jsonData["errors"] = ["username" => $message[0] . "" . $message[1], "password" => $message[2] . "" . $message[3], "passwordConfirm" => $message[4] . $message[7], "firstname" => $message[5], "lastname" => $message[6]];
			return $this->isDataOK;
		}

		if ($this->isDataOK) {

			$parameters["password"] = password_hash($parameters["password"], PASSWORD_DEFAULT);
			$result = $this->accessUsers->insert($action, $parameters);
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
	public function getUsername()
	{
		return $this->username;
	}
	public function getPkUser()
	{
		return $this->pk_user;
	}
	public function getKey()
	{
		return $this->key;
	}
	#endregion
}

?>