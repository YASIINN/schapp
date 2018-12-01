<?php
session_start();
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
class LessonOnProject extends database
{
   public $result = array();
   public function GETP($where, $wparam)
   {
      if (isset($_SESSION["UNM"])) {
         $lessonRows = $this->getrows("SELECT  * FROM  projectonlesson pl  INNER JoIN projectall pa
            on pl.pjid=pa.pjid    INNER JoIN user u on u.uid=pa.uid   WHERE  $where", array($wparam));
         if (count($lessonRows) == 0) {
            $this->result = array("status" => "None");
            return $this->result;
         } else {
            for ($i = 0; $i < count($lessonRows); $i++) {
               $this->result[] = array("status" => "Okey", "pjid" => $lessonRows[$i]['pjid'], "pjnm" => $lessonRows[$i]['pjnm'], "pjtechnology" => $lessonRows[$i]["pjtechnology"], "pjcntn" => $lessonRows[$i]["pjcntn"], "pjperiod" => $lessonRows[$i]["pjperiod"], "ufnm" => $lessonRows[$i]["ufnm"] . " " . $lessonRows[$i]["ulnm"]);
            }
            return $this->result;
         }
      }
   }
   public function GETU($where, $wparam)
   {
      if (isset($_SESSION["UNM"])) {
         $urows = $this->getrows("SELECT  * FROM  lesson l  INNER JoIN user u 
             on l.lcruid=u.uid INNER JOIN mail m on u.uid=m.uid INNER JOIN
             phone p on u.uid=p.uid 
                WHERE  $where", array($wparam));
         if (count($urows) == 0) {
            $this->result = array("status" => "None");
            return $this->result;
         } else {
            for ($i = 0; $i < count($urows); $i++) {
               $this->result[] = array("status" => "Okey", "uid" => $urows[$i]['uid'], "ufnm" => $urows[$i]['ufnm'] . " " . $urows[$i]["ulnm"], "pnmbr" => $urows[$i]["pnmbr"], "mail" => $urows[$i]["mail"], );
            }
            return $this->result;
         }
      }
   }
} ?>