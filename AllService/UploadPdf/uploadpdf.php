<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class UploadPdf extends database
{
    public $result = array();
    public function ADD($tfolder, $tfuid, $tfname, $tfsize, $tftype,$tfperiod)
    {
        $tfolder = base64_decode($tfolder);
        if (isset($_SESSION["UNM"])) {
            $data = array(
                'tfolder' => $tfolder,
                'tfname' => $tfname,
                'tfsize' => $tfsize,
                "tftype" => $tftype,
                "tfuid" => $tfuid,
                'tfperiod'=>$tfperiod
            );
            $addFolder = $this->insert('trnskriptfolder', $data);
            if ($addFolder) {
                $this->result = array("status" => "SuccesAdd");
                return $this->result;
            } else {
                $this->result = array("status" => "None");
                return $this->result;
            }
        }
    }
    public function DEL($where, $param)
    {
        $delete =$this->delete("trnskriptfolder",$where,array($param));
        if ($delete) {
            $this->result = array("status" => "SuccesDel");
            return $this->result;
        } else {
            $this->result = array("status" => "None");
            return $this->result;
        }
    }
    public function GET($where, $param)
    {
        if (isset($_SESSION["UNM"])) {
            $fparam = array();
            for ($index = 0; $index < count($param); $index++) {
                array_push($fparam, $param[$index]);
            }
            $tf =$this->getrows("SELECT * FROM trnskriptfolder tf INNER JOIN user u on
            tf.tfuid=u.uid
            INNER JOIN useronsection us on us.uid=u.uid
             where $where",$fparam);
            // $this->select("trnskriptfolder",$where,array($param));
            //  $this->getrows("SELECT * FROM trnskriptfolder WHERE $where", array($param));
            if (count($tf) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($tf); $i++) {
                    $this->result[] = array("status" => "Okey", 
                    "tfname" => $tf[$i]['tfname'] ,
                    "ufnm" => $tf[$i]['ufnm'] ,
                    "ulnm" => $tf[$i]['ulnm'] ,
                    "usid" => $tf[$i]['usid'] ,
                    "sid" => $tf[$i]['sid'] ,
                );
                }
                return $this->result;
            }
        }
    }
    public function GETF($where, $param)
    {
        if (isset($_SESSION["UNM"])) {
            $tf = $this->select("trnskriptfolder",$where,array($param));
            // $this->getrows("SELECT * FROM trnskriptfolder WHERE $where", array($param));
            if (count($tf) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($tf); $i++) {
                    $this->result ="data:application/pdf;base64,".base64_encode($tf[$i]['tfolder']);
                }
                return $this->result;
            }
        }
    }
}
?>