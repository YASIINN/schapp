<?php
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class Login extends database
{
    public $result = array();
    public function LG($unm, $upass)
    {
        $userRows = $this->getrows("SELECT  * FROM user u INNER JoIN title t 
            on u.tid=t.tid INNER JoIN authority a on u.uauthr=a.autid
                where unm=?", array($unm));
        if (count($userRows) == 0) {
            $this->result = array("status" => "None");
            return $this->result;
        } else {
            $uid = $userRows[0]['uid'];
            $passRow =$this->getrows("SELECT  * FROM pass where uid=?", array($uid));
            if (count($passRow) != 0 && $passRow[0]['pass'] != $upass) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($userRows); $i++) {
                    session_start();
                    $this->result[] = array("status" => "Okey", "uid" => $userRows[$i]['uid'], "ufnm" => $userRows[$i]['ufnm'], "ulnm" => $userRows[$i]["ulnm"], "unm" => $userRows[$i]["unm"], "upnt" => $userRows[$i]["upnt"], "usno" => $userRows[$i]["usno"], "tid" => $userRows[$i]["tid"], "uauthr" => $userRows[$i]["uauthr"], "tnm" => $userRows[$i]["tnm"], "autnm" => $userRows[$i]["autnm"], "userLT" => time(), );
                }
                $_SESSION["UNM"] = $this->result;
                return $this->result;
            }
        }
    }
} ?>