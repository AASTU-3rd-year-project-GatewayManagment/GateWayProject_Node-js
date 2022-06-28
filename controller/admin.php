<?php
include '../controller/session.php';
include '../model/database.php';

if(isset($_POST['submit'])){
	$id = $_POST['id'];
	$username = $_POST['username'];
	$password = $_POST['password'];
	
	$query  = "SELECT EXISTS(SELECT * From user where ID=1)";
	$result = mysqli_query($connection,$query);
	while($row1 = mysqli_fetch_array($result,MYSQLI_ASSOC)){
		// echo "ID :{$row1['ID']} <br>".
		// "First Name :{$row1['firstName']}";
		// ;
		echo $row1;
	}
}
if(isset($_GET['q'])){
	$data = json_decode($_GET['q']);
	if($data){
		$id = $data -> ID;
		$userName = $data -> userName;
		$password = $data ->  password;
		$repassword = $data -> repassword;

	// check if the id Exists

	if((strlen($userName) != strlen(filter_var($userName,FILTER_SANITIZE_STRING)))
		|| (strlen($password) != strlen(filter_var($password,FILTER_SANITIZE_STRING)))
		|| (strlen($repassword) != strlen(filter_var($repassword,FILTER_SANITIZE_STRING)))){
			echo "<div class='error' id='show-submit-status'>
							
												<p>Invalid Characters</p>
	
												</div>";
	}else{

	
		$query = "Select ID from user where ID = '$id'";
		$result = mysqli_query($connection,$query);
		if($result){
			if(mysqli_num_rows($result) ==1	){
				//check if there already is an account with that id
				$query = "Select ID from employee where ID = '$id'";
				$result = mysqli_query($connection,$query);
				// if there is no account with that id create the account
				if(!(mysqli_num_rows($result) > 0)){
					// check if username is taken
					$query = "select userName from employee where userName = '$userName'";
					$result = mysqli_query($connection,$query);
					if($result){
						// if username is taken
						if(mysqli_num_rows($result)>0){
							echo "<div class='error' id='show-submit-status'>
							
							<p>User Name Already Taken!</p>

							</div>";
						}else{
							// if username isnot taken
							$password = md5($password);
							$query = "insert into employee values('$userName','$password','$id','')";
							$result = mysqli_query($connection,$query);
							if($result){
								// account Created
								echo "
								<div class='good' id='show-submit-status'>
								
								<p>Account Created Successfully</p>
			
								</div>
								";
							}

						}
					}

					

				}else{
					// if an account already exists
					echo "<div class='error' id='show-submit-status'>
							
							<p>Account Already Exists</p>

							</div>";
				}
			}else{
				// no user with the id specified
				echo "<div class='error' id='show-submit-status'>
							
				<p>No Such Id Exists!</p>

				</div>";

			}
		}


		}
	}
}
// delete user
if(isset($_POST['to-be-delete-id'])){
	$id = $_POST['to-be-delete-id'];
	$password = $_POST['delete-admin-password'];
	$adminID = $_SESSION['ID'];
	// check for admin pass
	$query = "SELECT * FROM admin where ID='$adminID' and password = '$password'";
	$result = mysqli_query($connection,$query);
	if(mysqli_num_rows($result) > 0){
		$query = "DELETE FROM user WHERE id='$id'";
		$result = mysqli_query($connection,$query);
		if($result){
			$message ="Deleted Sucessfully";
			echo "<div class='alert alert-success' role='alert'>$message</div>_good";
		}else{
			echo "error ocurred";
		}
	}else{
		$chigr = "Password Incorrect";
			echo "<div class='alert alert-danger' role='alert'>$chigr</div>_bad";
	}
}

?>