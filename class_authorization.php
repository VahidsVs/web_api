<?php
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
    function isAuthorized($authToken, $sessionToken, $key)
    {

        $isAuthorized = false;
        $cipher = $GLOBALS["iniConfig"]["encrypt-algorythm"];
        $iv = $GLOBALS["iniConfig"]["encrypt-iv"];
        $authToken = str_replace("CMS ", "", $authToken);
        $decryptedToken = openssl_decrypt($authToken, $cipher, $key, 10, $iv);
      

        if (str_replace("\\", "", $authToken) == str_replace("\\", "", $sessionToken))
        {
            $isAuthorized = true;
            $userData = explode(":", $decryptedToken);
            $userId = $userData[0];
            $userRole = $userData[1];
            $userLoginTime = $userData[2];
        }

        return $isAuthorized;

    }
}

?>