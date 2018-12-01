<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class Title extends database
{
    public $result = array();
    public function GETT()
    {
        if (isset($_SESSION["UNM"])) {
            $titleRows = $this->getrows("SELECT  * FROM  title");
            if (count($titleRows) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($titleRows); $i++) {
                    $this->result[] = array("status" => "Okey", "tid" => $titleRows[$i]['tid'], "tnm" => $titleRows[$i]['tnm'], );
                }
                return $this->result;
            }
        }
    }
} ?>