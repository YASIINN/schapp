<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class Lesson extends database
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
    public function ADD($lesson)
    {
        if (isset($_SESSION["UNM"])) {
            for ($i = 0; $i < count($lesson); $i++) {
                $data = array(
                    "lnm" => $lesson[$i]['lnm'],
                    "lperiod" => $lesson[$i]['lperiod'],
                    "lclass" => $lesson[$i]['lclass'],
                    'lcntn' => $lesson[$i]['lcntn'],
                    "lcruid" => $lesson[$i]['lcruid'],
                    "sid" => $lesson[$i]['sid'],
                    "lcode" => $lesson[$i]['lcode']
                );
            }
            $addRows = $this->insert('lesson', $data);
            if ($addRows) {
                $this->result = array("status" => "SuccesAdd");
                return $this->result;
            } else {
                $this->result = array("status" => "None");
                return $this->result;
            }
        }
    }
    public function GETWHERE($where, $allparam, $field)
    {
        if (isset($_SESSION["UNM"])) {
            $fparam = array();
            for ($index = 0; $index < count($allparam); $index++) {
                array_push($fparam, $allparam[$index]);
            }
            $lessonRows = $this->getrows("SELECT  * FROM  $field WHERE $where=?", $fparam);
            if (count($lessonRows) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($lessonRows); $i++) {
                    $this->result[] = array(
                        "status" => "Okey",
                        "where" => "userWhere",
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
    public function DEL($where, $allparam)
    {
        if (isset($_SESSION["UNM"])) {
            $fparam = array();
            for ($index = 0; $index < count($allparam); $index++) {
                array_push($fparam, $allparam[$index]);
            }
            $delete = $this->delete("lesson", $where, $fparam);
            if ($delete) {
                $this->result = array("status" => "SuccesDel");
                return $this->result;
            } else {
                $this->result = array("status" => "None");
                return $this->result;
            }
        }
    }
    public function SET($wparam,$where,$param)
    {
        if (isset($_SESSION["UNM"])) {
            $fparam = array();
            for ($index = 0; $index < count($wparam); $index++) {
                $data=array(
                    "lnm"=> $wparam[$index]["lnm"],
                    "lperiod"=> $wparam[$index]["lperiod"],
                    "lclass"=> $wparam[$index]["lclass"],
                    "lcntn"=> $wparam[$index]["lcntn"],
                    "lcode"=> $wparam[$index]["lcode"],
                );
                $upP= $this->update("lesson",$data,$where,array($param));
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
}
?>