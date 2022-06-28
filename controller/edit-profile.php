<?php
include '../model/database.php';

if(isset($_POST['edit'])){
	$id = $_POST['stdid'];
	header("Location: ../view/pages/edit-profile.php?id=$id");
}


if(isset($_POST['id'])){
	$id = $_POST['id'];
	$firstName = $_POST['firstName'];
	$lastName = $_POST['lastName'];
	$gender = $_POST['gender'];
	$level = $_POST['level'];
	$type = $_POST['type'];
	$imgUrl = 'profile.png';

	if((strlen($firstName) != strlen(filter_var($firstName,FILTER_SANITIZE_STRING)))
		|| (strlen($lastName) != strlen(filter_var($lastName,FILTER_SANITIZE_STRING)))){
			$chigr = "Invalid Characters";
			echo "<div class='alert alert-danger' role='alert'>$chigr</div>_bad";
		}else{


			if(isset($_FILES['user-img'])){
				$img_name = $_FILES['user-img']['name'];
				$img_size = $_FILES['user-img']['size'];
				$tmp_name = $_FILES['user-img']['tmp_name'];
				$error = $_FILES['user-img']['error'];
				$chigr = "";

				if($error === 0){
					if($img_size > 10000000){
					$chigr = "File is to big";
					echo "<div class='alert alert-danger' role='alert'>$chigr</div>_bad";
					}else{
				
						$allowed_ext = array('jpg','jpeg','png');
						$img_ext =strtolower(pathinfo($img_name,PATHINFO_EXTENSION));

						if(in_array($img_ext,$allowed_ext)){
							$new_img_name = uniqid("IMG-",true).".".$img_ext;
							$upload_path = "../view/images/upload/".$new_img_name;
							$imgUrl = $new_img_name;

								
							$query = "UPDATE user
							SET firstName = '$firstName',
							lastName = '$lastName',
							gender = '$gender',
							user_level = '$level',
							user_type = '$type',
							imgUrl = '$imgUrl'
							WHERE ID = '$id'
							";
							try{
								$result = mysqli_query($connection,$query);
								if($result){
									move_uploaded_file($tmp_name,$upload_path);
									$message = "Updated Successfully";
									echo "<div class='alert alert-success' role='alert'>$message</div>_good";
									
								}else{
									echo "not added";
								}
							}catch(Throwable $t){
								die('error');
								echo $t->getMessage();
								
							}
						}else{
							$chigr = "This type of file is not allowed";
							echo "<div class='alert alert-danger' role='alert'>$chigr</div>_bad";
						}
						
						
					}
				}else{
					$query = "UPDATE user
					SET firstName = '$firstName',
					lastName = '$lastName',
					gender = '$gender',
					user_level = '$level',
					user_type = '$type'
					WHERE ID = '$id'
					";
					try{
					$result = mysqli_query($connection,$query);
					if($result){
						// move_uploaded_file($tmp_name,$upload_path);
						$message = "Updated Successfully";
						echo "<div class='alert alert-success' role='alert'>$message</div>_good";
						
					}else{
						echo "not added";
					}
					}catch(Throwable $t){
						die("error".mysqli_error($connection));
						echo $t->getMessage();
						
					}
				}


			}else{
				$query = "UPDATE user
					SET firstName = '$firstName',
					lastName = '$lastName',
					gender = '$gender',
					user_level = '$level',
					user_type = '$type',
					WHERE ID = '$id'
					";
					try{
					$result = mysqli_query($connection,$query);
					if($result){
						// move_uploaded_file($tmp_name,$upload_path);
						$message = "Updated Successfully";
						echo "<div class='alert alert-success' role='alert'>$message</div>_good";
						
					}else{
						echo "not added";
					}
					}catch(Throwable $t){
						echo $t->getMessage();
						
					}
			}
		}
}	


?>