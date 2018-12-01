<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class UploadPdf extends database
{
    public $result = array();
    public function ADD($tfolder, $tfuid, $tfname, $tfsize, $tftype)
    {
        $tfolder = base64_decode($tfolder);
        if (isset($_SESSION["UNM"])) {
            $data = array(
                'tfolder' => $tfolder,
                'tfname' => $tfname,
                'tfsize' => $tfsize,
                "tftype" => $tftype,
                "tfuid" => $tfuid,
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
    public function DEL(){

    }
    public function GET(){
        if (isset($_SESSION["UNM"])) {
            $tf = $this->getrows("SELECT * FROM trnskriptfolder");
            if (count($tf) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($tf); $i++) {
                    $this->result[] = array("status" => "Okey", "tfname" => $tf[$i]['tfname']);
                }
                return $this->result;
            }
        }
    }
}
?>