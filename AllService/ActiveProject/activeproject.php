<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class ActiveProject extends database
{
    public $result = array();
    function ADD($pjdata)
    {
        for ($i = 0; $i < count($pjdata); $i++) {
            $data = array(
                "pjid" => $pjdata[$i]['pjid'],
                "uflag" => $pjdata[$i]['uflag'],
                "apperiod" => $pjdata[$i]['apperiod'],
                'quotaremaning' => $pjdata[$i]['quotaremaning'],
                "apconstqouta" => $pjdata[$i]['apconstqouta']
            );
            $ActiveProjectRows = $this->insert('activeproject', $data);
        }
        if ($ActiveProjectRows) {
            $this->result = array("status" => "SuccesAdd");
            return $this->result;
        } else {
            $this->result = array("status" => "None");
            return $this->result;
        }
    }
    function GET()
    {
        if (isset($_SESSION["UNM"])) {
            $activeProject = $this->getrows("SELECT  * FROM  activeproject ap INNER JoIN 
            projectall p on p.pjid=ap.pjid INNER JOIN
            user u on u.uid=p.uid
            ");
            if (count($activeProject) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($activeProject); $i++) {
                    $this->result[] = array(
                        "status" => "Okey",
                        "pjid" => $activeProject[$i]['pjid'],
                        "pjnm" => $activeProject[$i]['pjnm'],
                        "pjtechnology" => $activeProject[$i]["pjtechnology"],
                        "pjcntn" => $activeProject[$i]["pjcntn"],
                        "pjperiod" => $activeProject[$i]["pjperiod"],
                        "apperiod" => $activeProject[$i]["apperiod"],
                        "uflag" => $activeProject[$i]["uflag"],
                        "uid" => $activeProject[$i]["uid"],
                        "ufnm" => $activeProject[$i]["ufnm"] . " " . $activeProject[$i]["ulnm"],
                        "pjquota" => $activeProject[$i]["pjquota"],
                        "quotaremaning" => $activeProject[$i]["quotaremaning"],
                        "apconstqouta" => $activeProject[$i]["apconstqouta"],
                    );
                }
            }
            return $this->result;
        }
    }
    function GETLP($where, $allparam)
    {
        if (isset($_SESSION["UNM"])) {
            $fparam = array();
            for ($index = 0; $index < count($allparam); $index++) {
                array_push($fparam, $allparam[$index]);
            }
            $activeProject = $this->getrows("SELECT  * FROM  activeproject ap INNER JoIN 
            projectall p on p.pjid=ap.pjid INNER JOIN
            user u on u.uid=p.uid INNER JOIN projectonlesson pl on pl.pjid=p.pjid 
            INNER JOIN lesson l on l.lid=pl.lid WHERE $where
            ", $fparam);
            if (count($activeProject) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {

                for ($i = 0; $i < count($activeProject); $i++) {
                    $this->result[] = array(
                        "status" => "Okey",
                        "pjid" => $activeProject[$i]['pjid'],
                        "pjnm" => $activeProject[$i]['pjnm'],
                        "pjtechnology" => $activeProject[$i]["pjtechnology"],
                        "pjcntn" => $activeProject[$i]["pjcntn"],
                        "pjperiod" => $activeProject[$i]["pjperiod"],
                        "apperiod" => $activeProject[$i]["apperiod"],
                        "uflag" => $activeProject[$i]["uflag"],
                        "uid" => $activeProject[$i]["uid"],
                        "ufnm" => $activeProject[$i]["ufnm"] . " " . $activeProject[$i]["ulnm"],
                        "pjquota" => $activeProject[$i]["pjquota"],
                        "quotaremaning" => $activeProject[$i]["quotaremaning"],
                        "apconstqouta" => $activeProject[$i]["apconstqouta"],
                        "lnm" => $activeProject[$i]["lnm"],
                        "lid" => $activeProject[$i]["lid"],
                    );
                }
            }
            return $this->result;
        }
    }
    function GETWHERE($where, $allparam)
    {
        if (isset($_SESSION["UNM"])) {
            $fparam = array();
            for ($index = 0; $index < count($allparam); $index++) {
                array_push($fparam, $allparam[$index]);
            }
            $activeProjectRow = $this->getrows("SELECT  * FROM  activeproject
                ap INNER JOIN projectall p on ap.pjid=p.pjid
              WHERE $where", $fparam);
            if (count($activeProjectRow) == 0) {
                $this->result = array("status" => "None");
                return $this->result;
            } else {
                for ($i = 0; $i < count($activeProjectRow); $i++) {
                    $this->result[] = array(
                        "status" => "Okey",
                        "pjid" => $activeProjectRow[$i]['pjid'],
                        "pjnm" => $activeProjectRow[$i]['pjnm'],
                        "pjtechnology" => $activeProjectRow[$i]["pjtechnology"],
                        "pjcntn" => $activeProjectRow[$i]["pjcntn"],
                        "pjperiod" => $activeProjectRow[$i]["pjperiod"],
                        "apperiod" => $activeProjectRow[$i]["apperiod"],
                        "uflag" => $activeProjectRow[$i]["uflag"],
                        "pjquota" => $activeProjectRow[$i]["pjquota"],
                        "quotaremaning" => $activeProjectRow[$i]["quotaremaning"],
                        "apconstqouta" => $activeProjectRow[$i]['apconstqouta'],
                    );
                }
                return $this->result;
            }

        }
    }
    function DEL($deldata)
    {
        if (isset($_SESSION["UNM"])) {
            for ($i = 0; $i < count($deldata); $i++) {
                $data = array($deldata[$i]['pjid']);
                $delprojrows = $this->delete("activeproject", "pjid=?", $data);
            }
            if ($delprojrows) {
                $this->result = array("status" => "SuccesDel");
                return $this->result;
            } else {
                $this->result = array("status" => "None");
                return $this->result;
            }
        }
    }
    function SET($wparam, $where, $param)
    {
        if (isset($_SESSION["UNM"])) {
            $fparam = array();
            for ($index = 0; $index < count($wparam); $index++) {
                $data = array(
                    "pjid" => $wparam[$index]["pjid"],
                    "apperiod" => $wparam[$index]["apperiod"],
                    "quotaremaning" => $wparam[$index]["quotaremaning"],
                    "apconstqouta" => $wparam[$index]["apconstqouta"],
                );
                $param = $wparam[$index]["pjid"];
                $upP = $this->update("activeproject", $data, $where, array($param));
            }
            if ($upP) {
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