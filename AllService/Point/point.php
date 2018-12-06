<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class Point extends database
{
    public $result = array();
    public function ADD($pdata)
    {
        if (isset($_SESSION["UNM"])) {
            for ($i = 0; $i < count($pdata); $i++) {
                $data = array(
                    "uid" => $pdata[$i]['uid'],
                    "lid" => $pdata[$i]['lid'],
                    "upnt" => $pdata[$i]['upnt'],
                    'upperiod' => $pdata[$i]['upperiod'],
                    "pjid"=>$pdata[$i]['pjid']
                );
                $addRows = $this->insert('userpoint', $data);
            }
            if ($addRows) {
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
                $delete = $this->delete("userpoint", $where,array($allparam[$index]['uid']));
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