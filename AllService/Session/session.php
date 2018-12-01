<?php
class Session
{
    public $result = array();
    public function GETS()
    {
        session_start();
        $time = $_SERVER['REQUEST_TIME'];
        $timeout_duration = 6000;
        $result = array();
        if ($_SESSION["UNM"] && (time() - $_SESSION["UNM"][0]["userLT"] > $timeout_duration)) {
            session_unset();
            session_destroy();
            $this->result = array("status" => "Session Not Defined");
            return $this->result;
        } else {
            $this->result = array("status" => "SessionDefined");
            return $this->result;
        }
    }
    public function DELS(){
        session_unset(); 
        session_destroy(); 
    }
} ?>