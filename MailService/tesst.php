<?php
include('../dbclas/pdocls.php');
// header("Content-Type: application/json; charset=UTF-8");
$db = new database("root", "", "localhost", "bitirmeproje");
$result = array();
// $table = array("projectonlesson", "projectall","user");
$tablerelation = array( "pjid","pjid","uid");
$a="t14";
$table = array("lesson", "user", "mail","phone");
$tablerelation = array("lcruid", "uid", "uid","uid");
// $urows = $this->getrows("SELECT  * FROM  lesson l  INNER JoIN user u 
//     on l.lcruid=u.uid INNER JOIN mail m on u.uid=m.uid INNER JOIN
//     phone p on u.uid=p.uid 
//        WHERE  $where", array($wparam));
// $res=
// // echo $res[1];
// "SELECT  * FROM  projectonlesson pl  INNER JoIN projectall pa
//             on pl.pjid=pa.pjid    INNER JoIN user u on u.uid=pa.uid   WHERE  $where"
// function jtable($table, $tablerelation)
// {

//     $res = "";
//     for ($i = 0; $i < count($table); $i++) {
//         $t = "t" . $i;
//         if ($i == 0) {
//             $res .= " " . $table[$i] . " " . $t . "  " . "INNER JOIN";
//         } else if($i==count($table)-1){
//             $prev=explode("t",$t);
//             $prev=$prev[1]-1;
//              $res .= " ".$table[$i]. " "  .$t  . " ON" . " " . $t.'.'.$tablerelation[$i].'='."t". $prev.'.'.$tablerelation[$i-1] . "  ";
//         } else {
//            $prev=explode("t",$t);
//            $prev=$prev[1]-1;
//             $res .= " ".$table[$i]. " "  .$t  . " ON" . " " . $t.'.'.$tablerelation[$i].'='."t". $prev.'.'.$tablerelation[$i-1] . "  " . "INNER JOIN";
//         }

//     }
//   return $res;
// }

// $projrows = $this->getrows("SELECT  * FROM  
// activeprojectonuser ap INNER JOIN projectall p on ap.pjid=p.pjid 
// INNER JOIN user u on p.uid=u.uid
// WHERE $where", array($id));
$asd=$db->getrows("SELECT  * FROM  
activeprojectonuser ap INNER JOIN projectall p on ap.pjid=p.pjid 
INNER JOIN user u on p.uid=u.uid 


WHERE ap.uid=?",array(105));
print_r($asd);
// $query=jtable($table, $tablerelation);
// $q2="SELECT * FROM".$query;
// $t=$db->getrows($q2);
// print_r($t);
// echo "</br>";
// echo $q2;
// $son=$db->getrows($q2);  
// print_r($son);
// "SELECT  * FROM  projectall p INNER JoIN user u on p.uid=u.uid"
?>