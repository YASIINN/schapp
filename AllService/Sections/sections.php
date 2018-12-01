<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class Sections extends database
{
    public $result = array();
    public function GETWHERE($where, $allparam, $field)
    {
        $fparam = array();
        for ($index = 0; $index < count($allparam); $index++) {
            array_push($fparam, $allparam[$index]);
        }
        $sectionRows = $this->getrows("SELECT  * FROM  $field WHERE $where=?", $fparam);
        if (count($sectionRows) == 0) {
            $this->result = array("status" => "None");
            return $this->result;
        } else {
            for ($i = 0; $i < count($sectionRows); $i++) {
                $this->result[] = array("sid" => $sectionRows[$i]['sid'], "sname" => $sectionRows[$i]['sname'], );
            }
            return $this->result;
        }
    }
    public function GET()
    {
        $sectionRows = $this->getrows("SELECT  * FROM  sections");
        if (count($sectionRows) == 0) {
            $this->result = array("status" => "None");
            return $this->result;
        } else {
            for ($i = 0; $i < count($sectionRows); $i++) {
                $this->result[] = array("sid" => $sectionRows[$i]['sid'], "sname" => $sectionRows[$i]['sname'], );
            }
            return $this->result;
        }
    }
    public function GETUS($sid)
    {
        if (isset($_SESSION["UNM"])) {
            $sectionuserrows = $this->getrows(
                "SELECT * FROM useronsection s INNER JOIN user u on
                s.uid=u.uid 
                INNER JOIN mail m on u.uid=m.uid INNER JOIN
             phone p on u.uid=p.uid 
                WHERE sid=?",
                array($sid)
            );
            if (count($sectionuserrows) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($sectionuserrows); $i++) {
                    $this->result[] = array("status" => "Okey", "uid" => $sectionuserrows[$i]['uid'], "ufnm" => $sectionuserrows[$i]['ufnm'],"ulnm"=> $sectionuserrows[$i]["ulnm"], "pnmbr" => $sectionuserrows[$i]["pnmbr"], "mail" => $sectionuserrows[$i]["mail"], );
                }
                return $this->result;
            }

        }
    }
}

?>