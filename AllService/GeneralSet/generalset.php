<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class GeneralSet extends database
{
    public $result = array();
    function GET()
    {
        $sysrows = $this->select("generalsettings", "1", array());
        if (count($sysrows) == 0) {
            $this->result = array("status" => "None");
            return $this->result;
        } else {
            for ($i = 0; $i < count($sysrows); $i++) {
                $this->result[] = array("status" => "Okey", "gsid" => $sysrows[$i]['gsid'], "gstxt" => $sysrows[$i]['gstxt'],
                );
            }
            return $this->result;
        }
    }
}
?>