<?php
class Database
{
    function __construct()
    {

    }
    public function executeAndFetch($action, $query, $bindParams, $orderBy = null, $limit = null)
    {
        $iniConfig = parse_ini_file("../../config.ini");

        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $mysqli = new mysqli($iniConfig["db_host"], $iniConfig["db_user"], $iniConfig["db_password"], $iniConfig["db_name"]);
        mysqli_set_charset($mysqli, 'utf8mb4');

        $stmt = $mysqli->prepare($query);
        try {
            if (!is_null($bindParams))
                $stmt->execute($bindParams["param"]);
            else
                $stmt->execute();
        } catch (mysqli_sql_exception $e) {
            return $e->getCode();

        }

        if ($action == "select") {
            $result = $stmt->get_result();
            $fetchArray = $result->fetch_all(MYSQLI_ASSOC);
            //$fetchArray = $result->fetch_all(PDO::FETCH_ASSOC);
            if (!$fetchArray)
                $fetchArray = [];
            return $fetchArray;
        }
    }
}
?>