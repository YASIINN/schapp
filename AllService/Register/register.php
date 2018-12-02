<?php
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class Register extends database
{
    public $result = array();
    public $activationKey;
    public function ADD($registerdata)
    {
        $activationKey = bin2hex(openssl_random_pseudo_bytes(2));
        for ($i = 0; $i < count($registerdata); $i++) {
            $data = array(
                "rtnm" => $registerdata[$i]['ad'],
                "rtlnm" => $registerdata[$i]['soyad'],
                "rtsno" => $registerdata[$i]['ogrno'],
                "rttcno" => $registerdata[$i]['tcno'],
                "rtemail" => $registerdata[$i]['email'],
                "rtrcode" => $activationKey,
                "phone" => $registerdata[$i]['tel'],
                "sid" => $registerdata[$i]['sid'],
                "uaccept" => "X",
            );
            $addRows = $this->insert('registertemp', $data);
        }
        if ($addRows) {
            $this->result[] = array("status" => "SuccesAdd", "activationkey" => $activationKey);
            return $this->result;
        } else {
            $this->result = array("status" => "None");
            return $this->result;
        }
    }
    public function GET($where, $param)
    {
        $fparam = array();
        for ($index = 0; $index < count($param); $index++) {
            array_push($fparam, $param[$index]);
        }
        $getRegisterRows = $this->select("registertemp",$where,$fparam);
        // $this->getrows("SELECT  * FROM registertemp WHERE $where", $fparam);
        if (count($getRegisterRows) == 0) {
            $this->result = array("status" => "None");
            return $this->result;
        } else {
            for ($i = 0; $i < count($getRegisterRows); $i++) {
                $this->result[] = array("status" => "Okey", "rtid" => $getRegisterRows[$i]['rtid'], "rtnm" => $getRegisterRows[$i]['rtnm'], "rtlnm" => $getRegisterRows[$i]["rtlnm"], "rtsno" => $getRegisterRows[$i]["rtsno"], "rttcno" => $getRegisterRows[$i]["rttcno"], "rtemail" => $getRegisterRows[$i]["rtemail"], "rtrcode" => $getRegisterRows[$i]['rtrcode'], "phone" => $getRegisterRows[$i]['phone'], "sid" => $getRegisterRows[$i]['sid'], "uaccept" => $getRegisterRows[$i]['uaccept']);
            }
            return $this->result;
        }
    }
    public function DEL($where, $param)
    {
        $delete =$this->delete("registertemp",$where,array($param));
        if ($delete) {
            $this->result = array("status" => "SuccesDel");
            return $this->result;
        } else {
            $this->result = array("status" => "None");
            return $this->result;
        }
    }
    public function DELALL()
    {
        $delete = $this->delete("registertemp", "1", array());
        if ($delete) {
            $this->result = array("status" => "SuccesDel");
            return $this->result;
        } else {
            $this->result = array("status" => "None");
            return $this->result;
        }
    }
} ?>