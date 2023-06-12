<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$iniConfig = parse_ini_file("../../config.ini");

		session_start();
		if (isset($_SESSION['loginTime']) && (time() - $_SESSION['loginTime'] > $iniConfig["session-timeout"])) {
			// last request was more than 1440 hours ago
			session_unset();     // unset $_SESSION variable for this page
			session_destroy();   // destroy session data
		}
echo json_encode($_SESSION);

?>