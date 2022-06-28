<?php
include '../model/database.php';
use PHPMailer\PHPMailer\PHPMailer; 
use PHPMailer\PHPMailer\Exception; 
 
require 'PHPMailer/src/Exception.php'; 
require 'PHPMailer/src/PHPMailer.php'; 
require 'PHPMailer/src/SMTP.php'; 



if(isset($_POST['email'])){
	
$email = $_POST['email'];
$query = "SELECT * FROM admin WHERE email = '$email'";
$result = mysqli_query($connection,$query);
$row = mysqli_fetch_array($result);
$firstName;
$lastName;

	if($row){
		$id = $row['ID'];
		$query = "SELECT * FROM user WHERE ID = '$id'";
		$result = mysqli_query($connection,$query);
		while($row1 = mysqli_fetch_assoc($result)){
			$firstName = $row1['firstName'];
			$lastName = $row1['lastName'];
			break;
		}

		$mail = new PHPMailer; 
		
		$mail->isSMTP();                      // Set mailer to use SMTP 
		$mail->Host = 'smtp.gmail.com';       // Specify main and backup SMTP servers 
		$mail->SMTPAuth = true;               // Enable SMTP authentication 
		$mail->Username = 'naoltamrat36@gmail.com';   // SMTP username 
		$mail->Password = 'N@ol168641';   // SMTP password 
		$mail->SMTPSecure = 'tls';            // Enable TLS encryption, `ssl` also accepted 
		$mail->Port = 587;                    // TCP port to connect to 
		
		// Sender info 
		$mail->setFrom('sender@AASTUGMS.com', 'GMS Administrator'); 
		$mail->addReplyTo('reply@AASTUGMS.com', 'GMS Administrator'); 
		
		// Add a recipient 
		$mail->addAddress("$email"); 
		
		//$mail->addCC('cc@example.com'); 
		//$mail->addBCC('bcc@example.com'); 
		
		// Set email format to HTML 
		$mail->isHTML(true); 
		
		// Mail subject 
		$mail->Subject = 'Password Reset'; 
		
		// Mail body content 
		$bodyContent = '<h1>Hi'.' '. ucfirst($firstName).' '.ucfirst($lastName).' '.'</h1>'; 
		$bodyContent .= '<p>Your Password has been sent to you. signin with the your password and change your password to secure your account.<b>GMS.</b></p>'; 
		$bodyContent .= '<p>User Name:<u>'.' '.$row['userName'].'</u></p>';
		$bodyContent .= '<p>Password:<u>'.' '.$row['password'].'</u></p>';


		$mail->Body    = $bodyContent; 
		
		// Send email 
		if(!$mail->send()) { 
			echo "<div class='alert alert-danger' role='alert'>Message could not be sent. Mailer Error: '.$mail->ErrorInfo;</div>_bad";
							 
		} else { 
			echo "<div class='alert alert-success' role='alert'>Message has been send sucessfully</div>_good";

		} 	
	}
}


?>