<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class Project extends database
{
    public $result = array();
    public function GET()
    {
        if (isset($_SESSION["UNM"])) {
            $allProjectRows = $this->getrows("SELECT  * FROM  projectall p INNER JoIN user u on p.uid=u.uid");
            if (count($allProjectRows) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($allProjectRows); $i++) {
                    $this->result[] = array(
                        "status" => "Okey",
                        "pjid" => $allProjectRows[$i]['pjid'],
                        "pjnm" => $allProjectRows[$i]['pjnm'],
                        "pjtechnology" => $allProjectRows[$i]["pjtechnology"],
                        "pjcntn" => $allProjectRows[$i]["pjcntn"],
                        "pjperiod" => $allProjectRows[$i]["pjperiod"],
                        "uid" => $allProjectRows[$i]["uid"],
                        "ufnm" => $allProjectRows[$i]["ufnm"] . " " . $allProjectRows[$i]["ulnm"],
                        "pjquota" => $allProjectRows[$i]["pjquota"],
                    );
                }
            }
            return $this->result;
        }
    }
    public function GETWHERE($where, $allparam)
    {
        if (isset($_SESSION["UNM"])) {
            $fparam = array();
            for ($index = 0; $index < count($allparam); $index++) {
                array_push($fparam, $allparam[$index]);
            }
            $allProjectRows = $this->select("projectall",$where,$fparam);
            // $this->getrows("SELECT  * FROM  projectall  WHERE $where", $fparam);
            if (count($allProjectRows) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($allProjectRows); $i++) {
                    $this->result[] = array(
                        "status" => "Okey",
                        "pjid" => $allProjectRows[$i]['pjid'],
                        "pjnm" => $allProjectRows[$i]['pjnm'],
                        "pjtechnology" => $allProjectRows[$i]["pjtechnology"],
                        "pjcntn" => $allProjectRows[$i]["pjcntn"],
                        "pjperiod" => $allProjectRows[$i]["pjperiod"],
                        "uid" => $allProjectRows[$i]["uid"],
                        "pjquota" => $allProjectRows[$i]["pjquota"],
                    );
                }
                return $this->result;
            }
        }
    }
    public function SET($pjdata, $where,$param)
    {
        if (isset($_SESSION["UNM"])) {
            for ($index = 0; $index < count($pjdata); $index++) {
                $data=array(
                    "pjnm"=> $pjdata[$index]['pjnm'],
                    "pjtechnology"=>$pjdata[$index]['pjtechnology'],
                    "pjcntn"=>$pjdata[$index]['pjcntn'],
                    "pjquota"=>$pjdata[$index]['pjquota'],
                );
            $upP =$this->update("projectall",$data,$where,array($param));
            }
            if ($upP) {
                $this->result = array("status" => "SuccedUpdate");
                return $this->result;
            } else {
                $this->result = array("status" => "None");
                return $this->result;
            }
        }
    }
    public function ADD($lessondata, $pjdata)
    {
        if (isset($_SESSION["UNM"])) {
            $uid = $pjdata[0]['uid'];
            for ($i = 0; $i < count($pjdata); $i++) {
                $data = array(
                    "uid" => $pjdata[$i]['uid'],
                    "pjnm" => $pjdata[$i]['pjnm'],
                    "pjtechnology" => $pjdata[$i]['ptek'],
                    'pjcntn' => $pjdata[$i]['psd'],
                    "pjperiod" => $pjdata[$i]['pperiod'],
                    "pjquota" => $pjdata[$i]['pjquota'],
                );
                $addRows = $this->insert('projectall', $data);
            }
            if ($addRows) {
                $projectRows = $this->getrows("SELECT  * FROM  projectall WHERE uid=?", array($uid));
                $lastindex = count($projectRows) - 1;
                $lastData = $projectRows[$lastindex]['pjid'];
                for ($i = 0; $i < count($lessondata); $i++) {
                    $data = array(
                        "pjid" => $lastData,
                        "lid" => $lessondata[$i]['lesson']
                    );
                    $addlessRows = $this->insert('projectonlesson', $data);
                }
                if ($addlessRows) {
                    $this->result = array("status" => "SuccesAdd");
                    return $this->result;

                } else {
                    $this->result = array("status" => "None");
                    return $this->result;
                }
            } else {
                $this->result = array("status" => "None");
                return $this->result;
            }
        } else {
            $this->result = array("status" => "None");
            return $this->result;
        }
    }
    public function DEL($pjid, $where)
    {
        if (isset($_SESSION["UNM"])) {
            $del = $this->delete("projectall", $where, array($pjid));
            if ($del) {
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