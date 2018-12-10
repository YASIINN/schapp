<?php
include('../dbclas/pdocls.php');
// header("Content-Type: application/json; charset=UTF-8");
$db = new database("root", "", "localhost", "bitirmeproje");
    $tf = $db->select("trnskriptfolder","1",array());
    header("Content-Type:application/vnd.ms-word");
    header("Content-Disposition:attachment;Filename=asdsad.doc");
    header("Pragma:no-cache");
    header("Expires:0");
 echo  $tf[0]['tfolder'];
?>