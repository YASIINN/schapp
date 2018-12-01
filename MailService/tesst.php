<?php
include('../dbclas/pdocls.php');
// header("Content-Type: application/json; charset=UTF-8");
$db = new database("root", "", "localhost", "bitirmeproje");
$result=array();
// header("Content-type:application/pdf");
//
$test =$db->getrows("SELECT * FROM trnskriptfolder");
echo   "data:application/pdf;base64,".base64_encode($test[0]['tfolder']);

// echo  'data:application/pdf;base64,'.base64_encode($test[0]['tfolder']);
// $blob_data = fbsql_read_blob($test[0]['tfolder']);
// echo $blob_data;
// $content=$test[0]['tfname'];   
//     header('Content-type: application/pdf');
//     header('Content-Disposition: inline; filename="' . $content . '"');
//     header('Content-Transfer-Encoding: binary');
//     header('Accept-Ranges: bytes');
//     ob_clean();
//     ob_flush ();
//     @readfile($test[0]['tfolder']);
//echo file_get_contents($test[0]['tfolder']);
// $content = addslashes(file_get_contents($test[0]['tfname']));

//   header("Content-Disposition: attachment; filename=\\".$test[0]['tfname']."\\");
//   header("Content-Description: PHP Generated Data");
//   echo $content;

?>