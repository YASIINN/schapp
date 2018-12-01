<?php
session_start();
include('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
$db = new database("root", "", "localhost", "bitirmeproje");
$result = array();
if (isset($_SESSION["UNM"])) {
  if ($_POST['MN'] == "ADD") {
    $tfolder = base64_decode($_POST['file']);
    $tfuid = $_POST['tfuid'];
    $tfname = $_POST['tfname'];
    $tfsize = $_POST['tfsize'];
    $tftype = $_POST['tftype'];
    $data = array(
      'tfolder' => $tfolder,
      'tfname' => $tfname,
      'tfsize' => $tfsize,
      "tftype" => $tftype,
      "tfuid" => $tfuid,
    );
    $ekle = $db->insert("trnskriptfolder", $data);
    if ($ekle) {
      echo json_encode($result = array("status" => "SuccesAdd"));
    } else {
      echo json_encode($result = array("status" => "None"));
    }
  }
}
?>