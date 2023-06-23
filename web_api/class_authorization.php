<?php
include_once("../../interface/class_user_in_group.php");

$GLOBALS["iniConfig"] = parse_ini_file("../../config.ini");
class Authorization
{
    function __construct()
    {
	

    }
    function createRandomKey()
    {
        $length = 1;
        $randomKey = substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length / strlen($x)))), 1, $length);
        return $randomKey;
    }
    function isAuthorized($authToken, $sessionToken, $key,$role=null)
    {

        $isAuthorized = false;
        $isActionAuthorized=false;
        $cipher = $GLOBALS["iniConfig"]["encrypt-algorythm"];
        $iv = $GLOBALS["iniConfig"]["encrypt-iv"];
        $authToken = str_replace("CMS ", "", $authToken);
        $decryptedToken = openssl_decrypt($authToken, $cipher, $key, 10, $iv);
      

        if (str_replace("\\", "", $authToken) == str_replace("\\", "", $sessionToken))
        {
            $isAuthorized = true;
            $userData = explode(":", $decryptedToken);
           
            $userRole = $userData[1];
            $userLoginTime = $userData[2];
            $param["userId"]=$userData[0];
           $accessUsersInGroup = new UserInGroup("selectWithRole",$param);
           $JSON_result=$accessUsersInGroup->getJsonData();
           foreach($JSON_result as $jsonRes)
           {
            if( $jsonRes["title"]==$role)
            $isActionAuthorized=true;
           
           }
           if((time()-$userLoginTime)>$GLOBALS["iniConfig"]["session-timeout"])
           $isAuthorized=false;
        }
        

        return ["auth"=>$isAuthorized,"aa"=>$isActionAuthorized];

    }
}

?>