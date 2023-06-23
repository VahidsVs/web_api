<?php

include_once("../../model/class_contact_uss.php");
include_once("../../class_codes.php");

$GLOBALS["iniConfig"] = parse_ini_file("../../config.ini");

class ContactUs
{
    private $accessContactUss;
    private $httpResponseCode;
    private $jsonData;
    private $isDataOK = true;
    function __construct($action, $parameters, $orderBy = null, $limit = null)
    {
        $this->accessContactUss = new ContactUss();
        if ($action == "select")
            self::select($action, $parameters, $orderBy, $limit);
        if ($action == "insert")
            self::insert($action, $parameters);

    }
    private function select($action, $parameters, $orderBy, $limit)
    {
        $result = $this->accessContactUss->select($action, $parameters, $orderBy, $limit);
        //	if ($result)
        {
            $this->jsonData = $result;
            $this->httpResponseCode = 200;
        }

    }
    private function insert($action, $parameters)
    {
        $message = ["", "", "", "", ""];
        if (empty($parameters["name"])) {
            $message[0] = Codes::msg_isRequired;
            $this->isDataOK = false;
        }
        if (empty($parameters["email"])) {
            $message[1] = Codes::msg_isRequired;
            $this->isDataOK = false;
        }
        if (empty($parameters["mobile"])) {
            $message[2] = Codes::msg_isRequired;
            $this->isDataOK = false;
        }
        if (empty($parameters["subject"])) {
            $message[3] = Codes::msg_isRequired;
            $this->isDataOK = false;
        }
        if (empty($parameters["message"])) {
            $message[4] = Codes::msg_isRequired;
            $this->isDataOK = false;
        }

        if (!$this->isDataOK) {
            $this->httpResponseCode = 400;
            $this->jsonData["errors"] = ["name" => $message[0], "email" => $message[1], "mobile" => $message[2], "subject" => $message[3], "message" => $message[4]];
        }

        if ($this->isDataOK) {
            $result = $this->accessContactUss->insert($action, $parameters);
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