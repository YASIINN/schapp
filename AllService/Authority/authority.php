<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class Authority extends database
{
    public $result = array();
    public function GETA()
    {
        if (isset($_SESSION["UNM"])) {
            $db = new Authority("root", "", "localhost", "bitirmeproje");
            $autRows =  $this->getrows("SELECT  * FROM  authority");
            if (count($autRows) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($autRows); $i++) {
                    $this->result[] = array("status" => "Okey", "autid" => $autRows[$i]['autid'], "autnm" => $autRows[$i]['autnm'], );
                }
                return $this->result;
            }
        }
    }
} ?>