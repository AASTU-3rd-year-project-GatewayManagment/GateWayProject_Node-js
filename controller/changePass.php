<?php
include '../controller/session.php';
include '../model/database.php';

if(isset($_GET['q'])){
$passJson=json_decode($_GET['q']);

$oldPass = $passJson->old;
$newPass = $passJson->new;
$confirmP = $passJson->confirmP;

if((strlen($oldPass) != strlen(filter_var($oldPass,FILTER_SANITIZE_STRING)))
|| (strlen($newPass) != strlen(filter_var($newPass,FILTER_SANITIZE_STRING)))
|| (strlen($confirmP) != strlen(filter_var($confirmP,FILTER_SANITIZE_STRING)))){
	echo "<div class='error' id='show-submit-status'>
					
										<p>Invalid Characters</p>

										</div>";
}else{
		if($newPass == $confirmP){
			$query = "SELECT password FROM admin where id = '{$_SESSION['ID']}'";
			$result = mysqli_query($connection,$query);
			if($result){

				while($row1 = mysqli_fetch_assoc($result)){
					if($row1['password'] == md5($oldPass)){
						$newPass = md5($newPass);
						$query = "UPDATE admin
						SET password = '$newPass'
						WHERE ID = '{$_SESSION['ID']}';
						";
						
						if( mysqli_query($connection,$query) ){
							echo "
							<div class='good' id='show-submit-status'>
							
							<p>Password Changed Successfully</p>

							</div>
							
							";
						}else{
							echo "<div class='error' id='show-submit-status'>
							
							<p>Error Ocurred</p>

							</div>";
						}
					}else{
						echo "<div class='error' id='show-submit-status'>
							
						<p>You Entered An Incorrect Password</p>

						</div>";

					}
					break;
				}

			}else{
				echo "<div class='error-section error' id='show-submit-status'>
							
				<p>Admin Doesn't Exist</p>

				</div>";

			}
			
		}
	}
		
}if(isset($_GET['email'])){
	$passJson=json_decode($_GET['email']);

$newEmail = $passJson->email;
$password = $passJson->password;

if((strlen($newEmail) != strlen(filter_var($newEmail,FILTER_SANITIZE_STRING)))
		|| (strlen($password) != strlen(filter_var($password,FILTER_SANITIZE_STRING)))){
			echo "<div class='error' id='show-submit-status'>
							
												<p>Invalid Characters</p>
	
												</div>";
	}else{

// takingusers id from session
		$query = "SELECT password FROM admin where id = '{$_SESSION['ID']}'";
		$result = mysqli_query($connection,$query);
			
		while($row1 = mysqli_fetch_assoc($result)){
			if($row1['password'] == md5($password)){
				
				$query = "UPDATE admin
				SET email = '$newEmail'
				WHERE ID = '{$_SESSION['ID']}';
				";
				
				if( mysqli_query($connection,$query) ){
					echo "
					<div class='good' id='show-submit-status'>
					
					<p>Email Changed Successfully</p>

					</div>
					
					";
				}else{
					echo "<div class='error' id='show-submit-status'>
					
					<p>Error Ocurred</p>

					</div>";
				}
			}else{
				echo "<div class='error' id='show-submit-status'>
					
				<p>Password Incorrect</p>

				</div>";

			}
		}
	}
}
if(isset($_GET['userPass'])){
	$passJson=json_decode($_GET['userPass']);

	$newpass = $passJson->newp;
	$confirmP = $passJson->confp;
	$adminP = $passJson->adminP;
	$userId = $passJson->id;

	if((strlen($newpass) != strlen(filter_var($newpass,FILTER_SANITIZE_STRING)))
		|| (strlen($confirmP) != strlen(filter_var($confirmP,FILTER_SANITIZE_STRING)))
		|| (strlen($adminP) != strlen(filter_var($adminP,FILTER_SANITIZE_STRING)))){
			echo "<div class='error' id='show-submit-status'>
							
												<p>Invalid Characters</p>
	
												</div>";
	}else{

			$query = "SELECT password FROM admin where id = '{$_SESSION['ID']}'";
			$result = mysqli_query($connection,$query);
				
			while($row1 = mysqli_fetch_assoc($result)){
				if($row1['password'] == md5($adminP)){
					$newPass = md5($newPass);
					$query = "UPDATE employee
					SET password = '$newpass'
					WHERE ID = '$userId';
					";
					
					if( mysqli_query($connection,$query) ){
						echo "
						<div class='good' id='show-submit-status'>
						
						<p>Password Changed Successfully</p>
		
						</div>
						
						";
					}else{
						echo "<div class='error' id='show-submit-status'>
						
						<p>Error Ocurred</p>
		
						</div>";
					}
				}else{
					echo "<div class='error' id='show-submit-status'>
						
					<p>Password Incorrect</p>
		
					</div>";
		
				}
			}
	}

}if(isset($_GET['userName'])){

	$passJson=json_decode($_GET['userName']);

	$userId = $passJson->id;
	$newUserName = $passJson->newUserName;
	$adminP = $passJson->adminP;

	if((strlen($newUserName) != strlen(filter_var($newUserName,FILTER_SANITIZE_STRING)))
		|| (strlen($adminP) != strlen(filter_var($adminP,FILTER_SANITIZE_STRING)))
		){
			echo "<div class='error' id='show-submit-status'>
							
												<p>Invalid Characters</p>
	
												</div>";
	}else{

		$query = "SELECT password FROM admin where id = '{$_SESSION['ID']}'";
		$result = mysqli_query($connection,$query);
			
		while($row1 = mysqli_fetch_assoc($result)){
			if($row1['password'] == md5($adminP)){
				
				$query = "UPDATE employee
				SET userName = '$newUserName'
				WHERE ID = '$userId';
				";
				
				if( mysqli_query($connection,$query) ){
					echo "
					<div class='good' id='show-submit-status'>
					
					<p>User Name Changed Successfully</p>
	
					</div>
					
					";
				}else{
					echo "<div class='error' id='show-submit-status'>
					
					<p>Error Ocurred</p>
	
					</div>";
				}
			}else{
				echo "<div class='error' id='show-submit-status'>
					
				<p>Password Incorrect</p>
	
				</div>";
	
			}
		}
	}
}if(isset($_GET['deleteAcc'])){

	$passJson=json_decode($_GET['deleteAcc']);

	$userId = $passJson->id;
	$adminP = $passJson->adminP;

	if((strlen($adminP) != strlen(filter_var($adminP,FILTER_SANITIZE_STRING)))){
		echo "<div class='error' id='show-submit-status'>
						
											<p>Invalid Characters</p>

											</div>";
}else{
		$query = "SELECT password FROM admin where id = '{$_SESSION['ID']}'";
		$result = mysqli_query($connection,$query);
			
		while($row1 = mysqli_fetch_assoc($result)){
			if($row1['password'] == md5($adminP)){
				
				$query = "DELETE FROM employee
				WHERE ID = '$userId';
				";
				
				if( mysqli_query($connection,$query) ){
					echo "
					<div class='good' id='show-submit-status'>
					
					<p>Account Deleted Successfully</p>
	
					</div>
					
					";
				}else{
					echo "<div class='error' id='show-submit-status'>
					
					<p>Error Ocurred</p>
	
					</div>";
				}
			}else{
				echo "<div class='error' id='show-submit-status'>
					
				<p>Password Incorrect</p>
	
				</div>";
	
			}
		}
	}

}
?>