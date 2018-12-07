<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class User extends database
{
    public $result = array();
    public function GETUL($tid)
    {
        if (isset($_SESSION["UNM"])) {
            $userLayoutRows = $this->getrows("SELECT  * FROM layout
                    where tid=?", array($tid));
            if (count($userLayoutRows) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($userLayoutRows); $i++) {
                    $this->result[] = array("status" => "Okey", "lid" => $userLayoutRows[$i]['lid'], "lynm" => $userLayoutRows[$i]['lynm'], "lyrouter" => $userLayoutRows[$i]["lyrouter"], "tid" => $userLayoutRows[$i]["tid"], );
                }
                return $this->result;
            }
        }
    }
    public function GET($name)
    {
        if (isset($_SESSION["UNM"])) {
            $uLT = date("Y.m.d");
            $userRows = $this->getrows("SELECT  * FROM user u INNER JoIN title t 
        on u.tid=t.tid INNER JoIN authority a on u.uauthr=a.autid
        INNER JOIN useronsection us on us.uid=u.uid INNER JOIN sections sc on sc.sid=us.sid
        INNER JOIN pass pa on pa.uid=u.uid
            where unm=?", array($name));
            if (count($userRows) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($userRows); $i++) {
                    $this->result[] = array("Status" => "Okey", "uid" => $userRows[$i]['uid'], "ufnm" => $userRows[$i]['ufnm'], "ulnm" => $userRows[$i]["ulnm"], "unm" => $userRows[$i]["unm"], "upnt" => $userRows[$i]["upnt"], "usno" => $userRows[$i]["usno"], "tid" => $userRows[$i]["tid"], "uauthr" => $userRows[$i]["uauthr"], "tnm" => $userRows[$i]["tnm"], "autnm" => $userRows[$i]["autnm"], "uLD" => $uLT, "sid" => $userRows[$i]["sid"], "sname" => $userRows[$i]["sname"], "quotaremain" => $userRows[$i]["quotaremain"], 'pass' => $userRows[$i]["pass"]);
                }
                return $this->result;
            }
        }else{
            $this->result = array("status" => "None");
            session_unset(); 
            session_destroy(); 
            return $this->result;
        }
    }
    public function ADD($userdata)
    {
        if (isset($_SESSION["UNM"])) {
            for ($i = 0; $i < count($userdata); $i++) {
                $data = array(
                    "ufnm" => $userdata[$i]['ufnm'],
                    "ulnm" => $userdata[$i]['ulnm'],
                    "unm" => $userdata[$i]['unm'],
                    "upnt" => $userdata[$i]['upnt'],
                    "usno" => $userdata[$i]['usno'],
                    "tid" => $userdata[$i]['tid'],
                    "uauthr" => $userdata[$i]['uauthr'],
                    "quotaremain" => $userdata[$i]['quotaremain'],
                );
                $addRows = $this->insert('user', $data);
            }
            if ($addRows) {
                $userRows = $this->getrows("SELECT  * FROM user  where unm=?", array($userdata[0]['unm']));
                $uid = $userRows[0]['uid'];
                $data = array(
                    "pass" => $userdata[0]['upass'],
                    "uid" => $uid
                );
                $addpassRows = $this->insert('pass', $data);
                if ($addpassRows) {
                    $data = array(
                        "mail" => $userdata[0]['email'],
                        "uid" => $uid
                    );
                    $addmailRows = $this->insert('mail', $data);
                    if ($addmailRows) {
                        $data = array(
                            "pnmbr" => $userdata[0]['utel'],
                            "uid" => $uid
                        );
                        $addphoneRows = $this->insert('phone', $data);
                        if ($addphoneRows) {
                            $data = array(
                                "sid" => $userdata[0]['sid'],
                                "uid" => $uid
                            );
                            $addsectiononLessonRows = $this->insert('useronsection', $data);
                            if ($addsectiononLessonRows) {
                                $this->result = array("status" => "SuccesAdd", "uid" => $uid);
                                return $this->result;
                            } else {
                                $this->result = array("status" => "None");
                                return $this->result;
                            }
                        } else {
                            $this->result = array("status" => "None");
                            return $this->result;
                        }
                    } else {
                        $this->result = array("status" => "None");
                        return $this->result;
                    }
                } else {
                    $this->result = array("status" => "None");
                    return $this->result;
                }
            } else {
                $this->result = array("status" => "None");
                return $this->result;
            }
        }else{
            $this->result = array("status" => "None");
            session_unset(); 
            session_destroy(); 
            return $this->result;
        }
    }
    public function GAUW($uwhere, $uparam, $mwhere, $mparam, $pwhere, $pparam)
    {
        if (isset($_SESSION["UNM"])) {
            $userWhereRows = $this->getrows("SELECT  * FROM user WHERE $uwhere", array($uparam));
            {
                if (count($userWhereRows) == 0) {
                    $mailWhereRows = $this->getrows("SELECT  * FROM mail WHERE $mwhere", array($mparam));
                    if (count($mailWhereRows) == 0) {
                        $phoneWhereRows = $this->getrows("SELECT  * FROM phone WHERE $pwhere", array($pparam));
                        if (count($phoneWhereRows) == 0) {
                            $this->result = array("status" => "None");
                            return $this->result;
                        } else {
                            $this->result = array("status" => "haveP");
                            return $this->result;
                        }
                    } else {
                        $this->result = array("status" => "haveM");
                        return $this->result;
                    }
                } else {
                    $this->result = array("status" => "haveUNM");
                    return $this->result;
                }
            }
        }
        else{
            $this->result = array("status" => "None");
            session_unset(); 
            session_destroy(); 
            return $this->result;
        }
    }
    public function GETPU($pass)
    {
        if (isset($_SESSION["UNM"])) {
            $upassrows = $this->getrows("SELECT  * FROM pass p
            INNER JOIN user u on p.uid=u.uid
             WHERE  pass=?", array($pass));
            if (count($upassrows) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($upassrows); $i++) {
                    $this->result[] = array("Status" => "Okey", "uid" => $upassrows[$i]['uid'], "ufnm" => $upassrows[$i]['ufnm'], "ulnm" => $upassrows[$i]["ulnm"], "unm" => $upassrows[$i]["unm"], "upnt" => $upassrows[$i]["upnt"], "usno" => $upassrows[$i]["usno"], "tid" => $upassrows[$i]["tid"], "uauthr" => $upassrows[$i]["uauthr"]);
                }
                return $this->result;
            }

        }
    }
    public function SETQUOTA($param,$where,$userdata)
    {
        if (isset($_SESSION["UNM"])) {
            for ($index = 0; $index < count($userdata); $index++) {
                $data=array(
                    "quotaremain"=>$userdata[$index]['quotaremain']
                );
            }
            $updatequota = $this->update("user",$data,$where,array($param));
            if ($updatequota) {
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