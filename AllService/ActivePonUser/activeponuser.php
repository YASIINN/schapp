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
                $data = array("pjid" => $apudata[$i]['pjid'], "uid" => $apudata[$i]['uid'], "sid" => $apudata[$i]['sid'], "seqnmbr" => $apudata[$i]['seqnmbr']);
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
            WHERE $where ORDER BY ap.seqnmbr ASC", array($id));
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
                        "seqnmbr" => $projrows[$i]["seqnmbr"],
                    );
                }
                return $this->result;
            }
        }
    }
    public function GETMY($where, $param)
    {
        if (isset($_SESSION["UNM"])) {
            $fparam = array();
            for ($index = 0; $index < count($param); $index++) {
                array_push($fparam, $param[$index]);
            }
            $projrows = $this->getrows("SELECT * FROM `activeprojectonuser` ap INNER JOIN
             projectall p on ap.pjid=p.pjid INNER JOIN user u on u.uid=ap.uid WHERE  $where", $fparam);
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
                        // "lnm" => $projrows[$i]["lnm"],
                        // "lid" => $projrows[$i]["lid"],
                        "seqnmbr" => $projrows[$i]["seqnmbr"],
                    );
                }
                return $this->result;
            }
        }
    }
    public function GETAVARAGE($udata)
    {
        // SELECT AVG(upnt) FROM userpoint WHERE pjid=41 AND uid=105
        // SELECT AVG(upnt) FROM userpoint WHERE pjid=41
        if (isset($_SESSION["UNM"])) {
            for ($i = 0; $i < count($udata); $i++) {
                $where=$udata[$i]['where'];
                $param=$udata[$i]['param'];
                $fparam = array();
                for ($index = 0; $index < count($param); $index++) {
                    array_push($fparam, $param[$index]);
                }
                $avarage = $this->getrows("SELECT uid,pjid, AVG(upnt) FROM userpoint WHERE $where",$fparam);
                $this->result[] = array(
                    "status" => "Okey",
                    "uid" => $avarage[0]['uid'],
                    "pjid"=>$avarage[0]['pjid'],
                    "AVG(upnt)" => $avarage[0]['AVG(upnt)'],
                );
            }
            return $this->result;


        }

    }
}
?>