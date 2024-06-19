<?php
header('Content-Type: text/html; charset=UTF-8');

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
 
	
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_OFF;	                        //Enable verbose debug output; DEBUG_SERVER to turn on
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'SMTP-SERVER';	                     	//Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'USERNAME';       						//SMTP username
    $mail->Password   = 'PASSWORD';   		                   //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
	$mail->CharSet = 'UTF-8';									//Fix for umlauts
	$mail->Encoding = PHPMailer::ENCODING_BASE64;				//Fix for umlauts

    //Recipients
    $mail->setFrom('info@loechel-industriebedarf.de', 'Löchel Industriebedarf - Info');
    $mail->addAddress($_POST["email"], $_POST["full_name"]);     			//Add a recipient - User who filled out form
    $mail->addAddress('maik.riedlsperger@loechel-industriebedarf.de');    			//Add a recipient - Our mail address
    $mail->addReplyTo($_POST["email"], $_POST["full_name"]);
	
	$msg = 
	"<b>Firma:</b> " . $_POST["firm"] . "<br>" .
	"<b>Kontaktperson:</b> " . $_POST["full_name"] . "<br>" .
	"<b>E-Mail:</b> " . $_POST["email"] . "<br>" .
	"<b>Kundennummer:</b> " . $_POST["custnr"] . "<br>" .
	"<b>Gewünschtes PSAgA-Set:</b> " . $_POST["setSelect"] . "<br>" .
	"<b>Mietzeitraum (Start):</b> " . $_POST["startDate"] . "<br>" .
	"<b>Mietzeitraum (Ende):</b> " . $_POST["endDate"] . "<br>" .
	"<br>" .
	"<b>Individuelle Nachricht:</b> <br>" . $_POST["msg_body"] . "<br>";

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
	$mail->Subject = 'Mietanfrage von ' . $_POST["firm"];
    $mail->Body    =  $msg;
	
    $mail->AltBody =  strip_tags($msg); //No html
	
	echo "<br><b><u>Nachrichteninhalt</u>:</b><br>" . $msg . "<br><br>";

    $mail->send();
    echo 'Vielen Dank für Ihre Nachricht. Sie wurde erfolgreich versandt. Wir melden uns zeitnah bei Ihnen!<br>' .
	'Sie können dieses Fenster nun schließen.';
} catch (Exception $e) {
    echo "Die Nachricht konnte nicht verschickt werden. Bitte versuchen Sie es in ein paar Minuten erneut. Sollte der Fehler dauerhaft auftreten, senden Sie uns bitte eine Mail mit dem folgenden Failercode:<br>{$mail->ErrorInfo}";
}