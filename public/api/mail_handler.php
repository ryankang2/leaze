<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require_once('email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');
foreach($_POST as $key=>$value){
    $_POST[$key] = htmlentities(addslashes($value));
}

$output = [];

$mail = new PHPMailer;
$mail->SMTPDebug = 3;           // Enable verbose debug output. Change to 0 to disable debugging output.

$mail->isSMTP();                // Set mailer to use SMTP.
$mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers.
$mail->SMTPAuth = true;         // Enable SMTP authentication


$mail->Username = EMAIL_USER;   // SMTP username
$mail->Password = EMAIL_PASS;   // SMTP password
$mail->SMTPSecure = 'tls';      // Enable TLS encryption, `ssl` also accepted, but TLS is a newer more-secure encryption
$mail->Port = 587;              // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->smtpConnect($options);
$mail->From = 'leazehousing@gmail.com';  // sender's email address (shows in "From" field)
$mail->FromName = 'Welcome to LeazeHousing!';   // sender's name (shows in "From" field)
$mail->addAddress($_POST['email'], 'First Recipient');  // Add a recipient
//$mail->addAddress('ellen@example.com');                        // Name is optional
$mail->addReplyTo($_POST["email"]);                          // Add a reply-to address
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$code = rand(1000, 9999);

$mail->Subject = "LEaze Housing Account Confirmation";
$mail->Body    = "
    Hey {$_POST["fname"]}, <br>
    Thanks for signing up for Leaze! With your Leaze account, you are able to: <br><br>
    -View student housing postings and chat with the leasers directly! <br><br>
    -Upload housing postings <br><br>
    Finally, here is your 4-digit verification code: $code.
    If you have any questions, send us an email to leazehousing@gmail.com and we will be 
    happy to help. <br> <br>

    Thank you!";
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
$output["code"] = $code;

print_r(json_encode($output));
?>
