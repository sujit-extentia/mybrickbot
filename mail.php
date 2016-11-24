<?php
$subject = 'Contact Information';
$name = (isset($_POST['name']) )? $_POST['name']: '';
$email = (isset($_POST['email']) )? $_POST['email']: '';
$comments = (isset($_POST['comment']) )? $_POST['comment']: '';

// message
$message = "	
		<html>
		<head>
		  <title>Contact US</title>
		</head>
		<body> 
		<table border='0' cellspacing='0' cellpadding='0' width='800' align='left' >
			<tr>
				<td width='800'>
				<p><span style='font-family:verdana; font-size:13px'>&nbsp; Contact details of the sender.</span></p>
				
				<table style='font:normal 12px tahoma, Arial;' border='0' cellspacing='0' cellpadding='0' width='100%' align='left' >
					<tbody>
						<tr>
							<td width='15%' style='padding:4px; font-weight:bold; height:20px'> Name:</td>
							<td width='85%' style='padding:4px;'>".trim($name)."</td>
						</tr>
						<tr>
							<td width='15%' style='padding:4px; font-weight:bold; height:20px'> Email:</td>
							<td style='padding:4px;'>".trim($email)."</td>
						</tr>										
						<tr>
							<td width='15%' style='padding:4px; font-weight:bold; height:20px'> Comments:</td>
							<td style='padding:4px;'>".trim($comments)."</td>
						</tr>
						<!--tr>
							<td width='15%' style='padding:4px; font-weight:bold; height:20px'> Email Sent From:</td>
							<td style='padding:4px;'>https://www.mybrickbot.com/</td>
						</tr-->
					</tbody>
				</table>
				</td>
			</tr>
		</table>
		</body>
		</html>";

$mail_result = null;

$smtp_host = 'mail.extentia.com';
$smtp_user = 'webauth@extentia.com';
$smtp_password = '!^EhP@authsite291';

require_once 'sendmail/class.phpmailer.php';

if(!empty($email)) {
	
	$mail = new PHPMailer();
	$mail->IsSMTP(); // set mailer to use SMTP
	$mail->Host = $smtp_host; // specify main and backup server
	$mail->SMTPAuth = true; // turn on SMTP authentication
	$mail->Username = $smtp_user; // SMTP username
	$mail->Password = $smtp_password;// SMTP password
	
	
	$mail->From = $email; //Email From.
	$mail->FromName = 'Contact';
	//$mail->AddAddress('inquiries@ixtentia.com'); // Email to
	$mail->AddAddress('chandani.extentia@gmail.com'); // Email to	
	    
	$mail->IsHTML(true);
	$mail->Subject = $subject;
	$mail->Body = $message;	
	$ok = $mail->Send();
	
	if($ok) {
		$mail_result = "success";		
	} else {
		$mail_result = "error";
	}
} else {
	$mail_result = "error";	
}

echo $mail_result;
exit;

?> 