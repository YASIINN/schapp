    <?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    include('../dbclas/pdocls.php');
    require 'PHPMailer/PHPMailer/src/Exception.php';
    require 'PHPMailer/PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/PHPMailer/src/SMTP.php';
    header("Content-Type: application/json; charset=UTF-8");
    $result = false;
    $mail = new PHPMailer(true);
    $ead = "";
    $epass = "";

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';
    if (isset($_POST['systemcheck'])) {
        $ead = $_POST['maildata'][0]['mail'];
        $epass = $_POST['maildata'][0]['epass'];
        $messega = $_POST['maildata'][0]['messega'];
        $mail->addAddress($ead, 'Email Adres Değişimi');
    } else {
        $db = new database("root", "", "localhost", "bitirmeproje");
        $sysrows = $db->getrows("SELECT * FROM systemsettings");
        $ead = $sysrows[0]['emailaddres'];
        $epass = $sysrows[0]['emailpass'];
        $maildata = $_POST['maildata'];
        for ($i = 0; $i < count($maildata); $i++) {
            $umail = $maildata[$i]['mail'];
            $messega = $maildata[$i]['messega'];
            $mail->addAddress($umail, 'Kişisel');
        }
    }
    $mail->Username = $ead;
    $mail->Password = $epass;
    $mail->setFrom($ead, 'Kayıt Doğrulama');
    $mail->addReplyTo($ead, 'Bilgi');
    $mail->isHTML(true);
    $mail->Subject = 'Kayıt Aktivitasyon Kodu';
    $mail->Body = $messega;
    $mail->AltBody = ' ';
    if ($mail->Send()) {
        $result = true;
    } else {
        $result = false;
    }
    if ($result == true) {
        $result = array("status" => "Succes");
        echo json_encode($result);
    } else {
        $result = array("status" => "None");
        echo json_encode($result);
    }
    ?>