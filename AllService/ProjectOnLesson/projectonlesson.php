<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class ProjectOnLesson extends database
{
    public $result = array();
    public function GETP($where, $param)
    {
        if (isset($_SESSION["UNM"])) {
            $lessonRows = $this->getrows("SELECT  * FROM  projectonlesson pl  INNER JoIN lesson l
    on pl.lid=l.lid WHERE $where ", array($param));
            if (count($lessonRows) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($lessonRows); $i++) {
                    $this->result[] = array("status" => "Okey", "plid" => $lessonRows[$i]['plid'], "pjid" => $lessonRows[$i]['pjid'], "lid" => $lessonRows[$i]["lid"], "lnm" => $lessonRows[$i]["lnm"], "lperiod" => $lessonRows[$i]["lperiod"], "lclass" => $lessonRows[$i]["lclass"], "lcntn" => $lessonRows[$i]["lcntn"], "lcruid" => $lessonRows[$i]["lcruid"], );
                }
                return $this->result;
            }
        }
    }
    public function GETU($where, $param)
    {
        if (isset($_SESSION["UNM"])) {
            $urows = $this->getrows("SELECT  * FROM  projectall pj INNER JoIN user u 
        on pj.uid=u.uid INNER JOIN mail m on u.uid=m.uid INNER JOIN
        phone p on u.uid=p.uid 
 WHERE $where ", array($param));
            if (count($urows) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($urows); $i++) {
                    $this->result[] = array("status" => "Okey", "uid" => $urows[$i]['uid'], "ufnm" => $urows[$i]['ufnm'] . " " . $urows[$i]["ulnm"], "pnmbr" => $urows[$i]["pnmbr"], "mail" => $urows[$i]["mail"], );
                }
                return $this->result;
            }
        }
    }
    public function DPL($lessondata)
    {
        if (isset($_SESSION["UNM"])) {
            for ($i = 0; $i < count($lessondata); $i++) {
                $delLessid = array($lessondata[$i]['lessondata']);
                $delLess = $this->delete("projectonlesson", "plid=?", $delLessid);
            }
            if ($delLess) {
                $this->result = array("status" => "SuccesDel");
                return $this->result;
            } else {
                $this->result = array("status" => "None");
                return $this->result;
            }
        }
    }
    function APL($lessondata)
    {
        if (isset($_SESSION["UNM"])) {
            for ($i = 0; $i < count($lessondata); $i++) {
                $data = array("pjid" => $lessondata[$i]['pjid'], "lid" => $lessondata[$i]['lessondata']);
                $addlessRows = $this->insert('projectonlesson', $data);
            }
            if ($addlessRows) {
                $this->result = array("status" => "SuccesAdd");
                return $this->result;
            } else {
                $this->result = array("status" => "None");
                return $this->result;
            }
        }
    }
} ?>