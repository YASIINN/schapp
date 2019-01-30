<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class Backup extends database
{
    public $result = array();
    public function BackUpAll()
    {
        if (isset($_SESSION["UNM"])) {
            if (true) {
                $this->result = array("status" => "SuccesAdd");
                return $this->result;

            } else {
                $this->result = array("status" => "None");
                return $this->result;
            }
        }
    }



    }
}
?>