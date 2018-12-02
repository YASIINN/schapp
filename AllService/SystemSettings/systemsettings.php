<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class SystemSettings extends database
{
    public $result = array();
    function GETSYS()
    {
        if (isset($_SESSION["UNM"])) {
            $sysrows = $this->select("systemsettings","1",array());
            if (count($sysrows) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($sysrows); $i++) {
                    $this->result[] = array("status" => "Okey", "ssid" => $sysrows[$i]['ssid'], "pjscontenjan" => $sysrows[$i]['pjscontenjan'], "emailaddres" => $sysrows[$i]["emailaddres"], "emailpass" => $sysrows[$i]["emailpass"], "notice" => $sysrows[$i]['notice'], "quotaoneducator" => $sysrows[$i]['quotaoneducator']);
                }
                return $this->result;
            }
        }
    }
    function SETSYS($param)
    {
        if (isset($_SESSION["UNM"])) {
            for ($index = 0; $index < count($param); $index++) {
                $data = array(
                    "pjscontenjan" =>
                        $param[$index]['pjscontenjan'],
                    "emailaddres" => $param[$index]['emailaddres'],
                    "emailpass" => $param[$index]['emailpass'],
                    "notice" => $param[$index]['notice'],
                    "quotaoneducator" => $param[$index]['quotaoneducator']
                );
                $updatesys = $this->update("systemsettings", $data, "ssid=?", array(1));
            }
            if ($updatesys) {
                $this->result = array("status" => "SuccedUpdate");
                return $this->result;
            } else {
                $this->result = array("status" => "None");
                return $this->result;
            }
        }
    }
}
?>