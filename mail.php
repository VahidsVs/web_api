<?php

require_once "vendor/autoload.php"; 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);
try {
    $mail = new PHPMailer;
    //Enable SMTP debugging.
    $mail->SMTPDebug = 3;                           
    //Set PHPMailer to use SMTP.
    $mail->isSMTP();        
    //Set SMTP host name                      
    $mail->Host = "smtp.easyname.com";
    //Set this to true if SMTP host requires authentication to send email
    $mail->SMTPAuth = true;                      
    //Provide username and password
    $mail->Username = "admin@megatechapp.com";             
    $mail->Password = "#MegaTechMail#1";                       
    //If SMTP requires TLS encryption then set it
    $mail->SMTPSecure = "tls";                       
    //Set TCP port to connect to
    $mail->Port = 587;                    
    $mail->From = "admin@megatechapp.com";
    $mail->FromName = "MegaTechApp@autoreply.com";
    $mail->addAddress("svs.3001@gmail.com", "Recepient Name");
    $mail->isHTML(true);
    $mail->Subject = "Verification Mail";
    $mail->Body = "<i>Please click link below to confirm your regirstration</i>";
    $mail->AltBody = "This is the plain text version of the email content";
    if(!$mail->send())
    {
    echo "Mailer Error: " . $mail->ErrorInfo;
    }
    else
    {
    echo "Message has been sent successfully";
    }
} catch(Exception){}