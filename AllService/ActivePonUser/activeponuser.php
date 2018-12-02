<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class ActivePonUser extends database
{
    public $result = array();
    public function ADD($apudata)
    {
        if (isset($_SESSION["UNM"])) {
            for ($i = 0; $i < count($apudata); $i++) {
                $data = array("pjid" => $apudata[$i]['pjid'], "uid" => $apudata[$i]['uid'], "sid" => $apudata[$i]['sid']);
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
    public function DEL($allparam, $where)
    {
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
    public function GET($where, $id)
    {
        if (isset($_SESSION["UNM"])) {
            $projrows = $this->getrows("SELECT  * FROM  
            activeprojectonuser ap INNER JOIN projectall p on ap.pjid=p.pjid 
            INNER JOIN user u on p.uid=u.uid
            INNER JOIN projectonlesson pl on pl.pjid=p.pjid 
            INNER JOIN lesson l on l.lid=pl.lid
            WHERE $where", array($id));
            if (count($projrows) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($projrows); $i++) {
                    $this->result[] = array(
                        "status" => "Okey",
                        "pjid" => $projrows[$i]['pjid'],
                        "pjnm" => $projrows[$i]['pjnm'],
                        "pjtechnology" => $projrows[$i]["pjtechnology"],
                        "pjcntn" => $projrows[$i]["pjcntn"],
                        "pjperiod" => $projrows[$i]["pjperiod"],
                        "uid" => $projrows[$i]["uid"],
                        "ufnm" => $projrows[$i]["ufnm"] . " " . $projrows[$i]["ulnm"],
                        "pjquota" => $projrows[$i]["pjquota"],
                        "lnm" => $projrows[$i]["lnm"],
                        "lid" => $projrows[$i]["lid"],
                    );
                }
                return $this->result;
            }
        }
    }
}
?>