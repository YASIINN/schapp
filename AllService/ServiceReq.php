<?php
header("Content-Type: application/json; charset=UTF-8");
$SN = $_POST['SN'];
$MN = $_POST['MN'];
$result = "";
if ($SN == "Project") {
    include("Project/project.php");
    $pj = new $SN();
    if ($MN == "GET") {
        $result = $pj->$MN();
    } else
        if ($MN == "GETWHERE") {
        $result = $pj->$MN($_POST['where'], $_POST['allparam']);
    } else
        if ($MN == "SET") {
        $issetparam = "";
        if (isset($_POST['param'])) {
            $issetparam = $_POST['param'];
        } else {
            $issetparam = "";
        }
        $result = $pj->$MN($_POST['pjdata'], $_POST['where'], $issetparam);
    } else
        if ($MN == "ADD") {
        $result = $pj->$MN($_POST["lessondata"], $_POST['projectdata']);
    } else
        if ($MN == "DEL") {
        $result = $pj->$MN($_POST['pjid'], $_POST['where']);
    }
    echo json_encode($result);
}
if ($SN == "Lesson") {
    include("Lesson/lesson.php");
    $ls = new $SN();
    if ($MN == "GET") {
        $result = $ls->$MN($_POST['where'], $_POST['allparam']);
    } else
        if ($MN == "ADD") {
        $result = $ls->$MN($_POST['lesson']);
    // } else
    //     if ($MN == "GETWHERE") {
    //     $result = $ls->$MN($_POST['where'], $_POST['allparam'], $_POST['field']);
    } else
        if ($MN == "DEL") {
        $result = $ls->$MN($_POST['where'], $_POST['allparam']);
    } else
        if ($MN == "SET") {
        $issetparam = "";
        if (isset($_POST['param'])) {
            $issetparam = $_POST['param'];
        } else {
            $issetparam = "";
        }
        $result = $ls->$MN($_POST['wparam'], $_POST['where'], $issetparam);
    }
    echo json_encode($result);
}
if ($SN == "Sections") {
    include("Sections/sections.php");
    $sc = new $SN();
    if ($MN == "GETWHERE") {
        $result = $sc->$MN($_POST['where'], $_POST['allparam'], $_POST['field']);
    } else
        if ($MN == "GET") {
        $result = $sc->$MN($_POST['where'], $_POST['allparam']);
        // allparam:[]
    } else if ($MN == "GETUS") {
        $result = $sc->$MN($_POST['sid']);
    }
    echo json_encode($result);
}
if ($SN == "Servicetime") {
    include("Servicetime/servicetime.php");
    $st = new Servicetime();
    $result = $st->getTime();
    echo json_encode($result);
}
if ($SN == "ActiveProject") {
    include("ActiveProject/activeproject.php");
    $ap = new $SN();
    if ($MN == "ADD") {
        $result = $ap->$MN($_POST['pjdata']);
    } else if ($MN == "GET") {
        $result = $ap->$MN();
    } else if ($MN == "GETWHERE") {
        $result = $ap->$MN($_POST['where'], $_POST['allparam']);
    } else if ($MN == "DEL") {
        $result = $ap->$MN($_POST['deldata']);
    } else if ($MN == "GETLP") {
        $result = $ap->$MN($_POST['where'], $_POST['allparam']);
    } else if ($MN == "SET") {
        if (isset($_POST['param'])) {
            $issetparam = $_POST['param'];
        } else {
            $issetparam = "";
        }
        $result = $ap->$MN($_POST['wparam'], $_POST['where'], $issetparam);
    }
    echo json_encode($result);
}
if ($SN == "ProjectOnLesson") {
    include("ProjectOnLesson/projectonlesson.php");
    $pol = new $SN();
    if ($MN == "GETP") {
        $result = $pol->$MN($_POST['where'], $_POST['param']);
    } else if ($MN == "GETU") {
        $result = $pol->$MN($_POST['where'], $_POST['param']);
    } else if ($MN == "DPL") {
        $result = $pol->$MN($_POST['lessondata']);
    } else if ($MN == "APL") {
        $result = $pol->$MN($_POST['lessondata']);
    }
    echo json_encode($result);
}
if ($SN == "LessonOnProject") {
    include("LessonOnProject/lessononproject.php");
    $lop = new $SN();
    if ($MN == "GETP") {
        $result = $lop->$MN($_POST['where'], $_POST['wparam']);
    } else if ($MN == "GETU") {
        $result = $lop->$MN($_POST['where'], $_POST['wparam']);
    }
    echo json_encode($result);
}
if ($SN == "Title") {
    include("Title/title.php");
    $title = new $SN();
    $result = $title->$MN();
    echo json_encode($result);
}
if ($SN == "Authority") {
    include("Authority/authority.php");
    $authority = new $SN();
    $result = $authority->$MN();
    echo json_encode($result);
}
if ($SN == "Session") {
    include("Session/session.php");
    $session = new $SN();
    if ($MN == "DELS") {
        $result = $session->$MN();
    } else {
        $result = $session->$MN();
    }
    echo json_encode($result);
}
if ($SN == "User") {
    include("User/user.php");
    $user = new $SN();
    if ($MN == "GETUL") {
        $result = $user->$MN($_POST['tid']);
    } else if ($MN == "GET") {
        $result = $user->$MN($_POST['name']);
    } else if ($MN == "ADD") {
        $result = $user->$MN($_POST['userdata']);
    } else if ($MN == "GAUW") {
        $result = $user->$MN($_POST['uwhere'], $_POST['uparam'], $_POST['mwhere'], $_POST['mparam'], $_POST['pwhere'], $_POST['pparam']);
    } else if ($MN == "ADDRU") {
        $result = $user->$MN($_POST['userdata']);
    } else if ($MN == "GETPU") {
        $result = $user->$MN($_POST['pass']);
    } else if ($MN == "SETQUOTA") {
        if (isset($_POST['param'])) {
            $issetparam = $_POST['param'];
        } else {
            $issetparam = "";
        }
        $result = $user->$MN($issetparam, $_POST['where'], $_POST['userdata']);
    }
    echo json_encode($result);
}
if($SN=="GeneralSet"){
    include("GeneralSet/generalset.php");
    $generalset = new $SN();
    $result = $generalset->$MN();
    echo json_encode($result);
}
if ($SN == "Login") {
    include("Login/login.php");
    $login = new $SN();
    $result = $login->$MN($_POST['name'], $_POST['pass']);
    echo json_encode($result);
}
if ($SN == "Register") {
    include("Register/register.php");
    $register = new $SN();
    if ($MN == "ADD") {
        $result = $register->$MN($_POST['registerdata']);
    } else if ($MN == "GET") {
        $result = $register->$MN($_POST['where'], $_POST['param']);
    } else if ($MN == "DEL") {
        $issetparam = "";
        if (isset($_POST['param'])) {
            $issetparam = $_POST['param'];
        } else {
            $issetparam = "";
        }
        $result = $register->$MN($_POST['where'], $issetparam);
    } else if ($MN == "DELALL") {
        $result = $register->$MN();
    }
    echo json_encode($result);
}
if ($SN == "SystemSettings") {
    include("SystemSettings/systemsettings.php");
    $settings = new $SN();
    if ($MN == "SETSYS") {
        $result = $settings->$MN($_POST['param'],$_POST['where']);
    } else if ($MN == "GETSYS") {
        $result = $settings->$MN($_POST['where'], $_POST['param']);
    } else if ($MN == "GUPER") {
        $result = $settings->$MN();
    }
    echo json_encode($result);
}
if ($SN == "ActivePonUser") {
    include("ActivePonUser/activeponuser.php");
    $apu = new $SN();
    if ($MN == "ADD") {
        $result = $apu->$MN($_POST['apudata']);
    } else if ($MN == "DEL") {
        $result = $apu->$MN($_POST['allparam'], $_POST['where']);
    } else if ($MN == "GET") {
        $result = $apu->$MN($_POST['where'], $_POST['param']);
    } else if ($MN == "GETMY") {
        $result = $apu->$MN($_POST['where'], $_POST['param']);
    } else if ($MN == "GETAVARAGE") {
        $result = $apu->$MN($_POST['udata']);
    }
    echo json_encode($result);
}
if ($SN == "Point") {
    include("Point/point.php");
    $pnt = new $SN();
    if ($MN == "ADD") {
        $result = $pnt->$MN($_POST['pdata']);
    } else if ($MN == "DEL") {
        $result = $apu->$MN($_POST['allparam'], $_POST['where']);
    }
    echo json_encode($result);
}
if ($SN == "UploadPdf") {
    include("UploadPdf/uploadpdf.php");
    $file = new $SN();
    if ($MN == "ADD") {
        $result = $file->$MN($_POST['file'], $_POST['tfuid'], $_POST['tfname'], $_POST['tfsize'], $_POST['tftype'], $_POST['tfperiod']);
    } else if ($MN == "DEL") {
        $issetparam = "";
        if (isset($_POST['param'])) {
            $issetparam = $_POST['param'];
        } else {
            $issetparam = "";
        }
        $result = $file->$MN($_POST['where'], $issetparam);
    } else if ($MN == "GET") {
        $result = $file->$MN($_POST['where'], $_POST['param']);
    } else if ($MN == "GETF") {
        $result = $file->$MN($_POST['where'], $_POST['param']);
    }
    echo json_encode($result);
}
?>