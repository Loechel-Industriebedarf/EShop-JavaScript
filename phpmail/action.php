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
    $mail->Host       = 'smtp.udag.de';                     	//Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'loechel-industriebedarfde-0048';       //SMTP username
    $mail->Password   = 'Ctu7Yf^c7Rd"+_J';                      //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
	$mail->CharSet = 'UTF-8';									//Fix for umlauts
	$mail->Encoding = PHPMailer::ENCODING_BASE64;				//Fix for umlauts

    //Recipients
    $mail->setFrom('retouren@loechel-industriebedarf.de', 'Löchel Industriebedarf - Retouren');
    $mail->addAddress($_POST["email"], $_POST["full_name"]);     			//Add a recipient - User who filled out form
    $mail->addAddress('retouren@loechel-industriebedarf.de');    			//Add a recipient - Our mail address
    $mail->addReplyTo($_POST["email"], $_POST["full_name"]);
	
    //Attachments	
	if(isset($_FILES['uploadedFiles'])){
		for($i = 0; $i < count($_FILES['uploadedFiles']['name']); $i++){
			 $tmpFilePath = $_FILES['uploadedFiles']['tmp_name'][$i];
			 //Make sure we have a file path
			  if ($tmpFilePath != ""){
				//Setup our new file path
				$newFilePath = "./uploads/" . $_FILES['uploadedFiles']['name'][$i];

				//Upload the file into the temp dir
				if(move_uploaded_file($tmpFilePath, $newFilePath)) {
					echo "<b>Anhang:</b> " . $_FILES['uploadedFiles']['name'][$i].'</br>'; 
					move_uploaded_file($_FILES['uploadedFiles']['name'][$i], "./uploads/".$_FILES['uploadedFiles']['name'][$i]);
					$mail->addAttachment($newFilePath);         //Add attachments
				}
			}
			 
			
		}
	}	
	
	$msg = 
	"<b>" . $_POST["customer"] . "</b><br>" .
	"<b>Firma:</b> " . $_POST["firm"] . "<br>" .
	"<b>Kontaktperson:</b> " . $_POST["full_name"] . "<br>" .
	"<b>Telefonnummer:</b> " . $_POST["phoneNum"] . "<br>" .
	"<b>E-Mail:</b> " . $_POST["email"] . "<br>" .
	"<b>Lieferscheinnummer / Auftragsnummer / Rechnungsnummer:</b> " . $_POST["uniqueNum"] . "<br>" .
	"<b>Artikelnummer & Menge:</b> " . $_POST["amount"] . " x " . $_POST["artNr"] . "<br>" .
	"<b>Retouren- / Reklamationsgrund:</b> " . $_POST["retReason"] . "<br>" .
	"<br>" .
	"<b>Fehlerbeschreibung:</b> <br>" . $_POST["msg_body"] . "<br>";

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
	if($_POST["firm"] != ""){
		$mail->Subject = 'Retourenanfrage von ' . $_POST["firm"];
	}
	else{
		$mail->Subject = 'Retourenanfrage von ' . $_POST["full_name"];
	}
    $mail->Body    =  $msg;
	
    $mail->AltBody =  strip_tags($msg); //No html
	
	echo "<br><b><u>Nachrichteninhalt</u>:</b><br>" . $msg . "<br><br>";

    $mail->send();
    echo 'Vielen Dank für Ihre Nachricht. Sie wurde erfolgreich versandt. Wir melden uns zeitnah bei Ihnen!<br>' .
	'Sie können dieses Fenster nun schließen.';
} catch (Exception $e) {
    echo "Die Nachricht konnte nicht verschickt werden. Bitte versuchen Sie es in ein paar Minuten erneut. Sollte der Fehler dauerhaft auftreten, senden Sie uns bitte eine Mail mit dem folgenden Failercode:<br>{$mail->ErrorInfo}";
}