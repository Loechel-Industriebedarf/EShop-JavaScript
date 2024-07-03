<?php
header('Content-Type: text/html; charset=UTF-8');

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';
require 'verifyCaptcha.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_OFF;	                        //Enable verbose debug output; DEBUG_SERVER to turn on
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'SMTP-SERVER';                     		//Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'USERNAME';       						//SMTP username
    $mail->Password   = 'PASSWORD';                      		//SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
	$mail->CharSet = 'UTF-8';									//Fix for umlauts
	$mail->Encoding = PHPMailer::ENCODING_BASE64;				//Fix for umlauts

	if($_POST["captcha"] == null || $_POST["captcha"] == ""){
		throw new Exception('Captcha wurde nicht korrekt gelöst!');
	}
	else{
		$captcha = verifyCaptcha($_POST["captcha"]);
		if($captcha == false){ throw new Exception('Captcha wurde nicht korrekt gelöst!'); }
	}
	
	$msg = 
	"<b>Firma:</b> " . $_POST["firm"] . "<br>" .
	"<b>Kontaktperson:</b> " . $_POST["full_name"] . "<br>" .
	"<b>E-Mail:</b> " . $_POST["email"] . "<br>" .
	"<b>Kundennummer:</b> " . $_POST["custnr"] . "<br>" .
	"<b>Gewünschtes PSAgA-Set:</b> " . $_POST["setSelect"] . "<br>" .
	"<b>Mietzeitraum:</b> " . $_POST["startDate"] . " - " . $_POST["endDate"] . "<br>" .
	"<b>Versandart:</b> " . $_POST["shipping"] . "<br>" .
	"<br>" .
	"<b>Individuelle Nachricht:</b> <br>" . $_POST["msg_body"] . "<br>";

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
	$mail->Subject = 'Mietanfrage von ' . $_POST["firm"];
    $mail->Body    =  $msg;
	
    $mail->AltBody =  strip_tags($msg); //No html
	//echo $msg;
	
	
    //Recipients
    $mail->setFrom('info@loechel-industriebedarf.de', 'Löchel Industriebedarf - Info');
    $mail->addAddress($_POST["email"], $_POST["full_name"]);     			//Add a recipient - User who filled out form
    $mail->addAddress('maik@loechel-industriebedarf.de');    				//Add a recipient - Our mail address
    $mail->addReplyTo($_POST["email"], $_POST["full_name"]);
	
    $mail->send();
    echo 'Vielen Dank für Ihre Nachricht. Sie wurde erfolgreich versandt. Wir melden uns zeitnah bei Ihnen!<br>';
} catch (Exception $e) {
    echo "FEHLER: Die Nachricht konnte nicht verschickt werden. Bitte versuchen Sie es in ein paar Minuten erneut. Sollte der Fehler dauerhaft auftreten, senden Sie uns bitte eine Mail mit dem folgenden Fehlercode:<br>{$mail->ErrorInfo}<br>{$e->getMessage()}";
}