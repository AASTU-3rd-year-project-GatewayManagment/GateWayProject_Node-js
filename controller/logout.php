
<?php
include '../controller/session.php';
include '../model/database.php';
echo "hello world";
print_r($_POST);
if(isset($_POST['submit'])){
	if(isset($_SESSION['ID'])){
		session_unset();
		session_destroy();
		echo "session variables are unset";
		
		header("Location: ../index.php");
	}else{
		echo "No one logged in";
	}
	}

?>