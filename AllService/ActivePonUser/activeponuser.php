<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class ActivePonUser extends database
{
    public $result = array();
    public function GET()
    {
        if (isset($_SESSION["UNM"])) {
            $lessonRows = $this->getrows("SELECT  * FROM  lesson");
            if (count($lessonRows) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($lessonRows); $i++) {
                    $this->result[] = array(
                        "status" => "Okey",
                        "lid" => $lessonRows[$i]['lid'],
                        "lnm" => $lessonRows[$i]['lnm'],
                        "lperiod" => $lessonRows[$i]["lperiod"],
                        "lclass" => $lessonRows[$i]["lclass"],
                        "lcntn" => $lessonRows[$i]["lcntn"],
                        "lcode" => $lessonRows[$i]["lcode"],
                    );
                }
                return $this->result;
            }
        }
    }
    public function ADD($apudata)
    {
        if (isset($_SESSION["UNM"])) {
            for ($i = 0; $i < count($apudata); $i++) {
                $data = array("pjid" => $apudata[$i]['pjid'], "uid" => $apudata[$i]['uid']);
                $adduprows = $this->insert('activeprojectonuser', $data);
            }
            if ($adduprows) {
                $this->result = array("status" => "SuccesAdd");
                return $this->result;

            } else {
                $this->result = array("status" => "None");
                return $this->result;
            }
        }
    }
    public function DEL($allparam,$where){
        if (isset($_SESSION["UNM"])) {
            for ($index = 0; $index < count($allparam); $index++) {
                $delete = $this->delete("activeprojectonuser", $where, array($allparam[$index]['uid']));
            }
            if ($delete) {
                $this->result = array("status" => "SuccesDel");
                return $this->result;
            } else {
                $this->result = array("status" => "None");
                return $this->result;
            }
        }
    }
}
?>