<?php
include '../model/database.php';
if(isset($_POST['submit'])){
	$imgUrl="";

	if(isset($_FILES['user-img'])){
		$img_name = $_FILES['user-img']['name'];
		$img_size = $_FILES['user-img']['size'];
		$tmp_name = $_FILES['user-img']['tmp_name'];
		$error = $_FILES['user-img']['error'];
		$chigr = "";

		if($error === 0){
			if($img_size > 10000000){
			$chigr = "File is to big";
			header("Location: ../view/pages/admin-add-student.html?error = $chigr");
			}else{
		
			$allowed_ext = array('jpg','jpeg','png');
			$img_ext =strtolower(pathinfo($img_name,PATHINFO_EXTENSION));

			if(in_array($img_ext,$allowed_ext)){
				$new_img_name = uniqid("IMG-",true).".".$img_ext;
				$upload_path = "../view/images/upload/".$new_img_name;
				$imgUrl = $new_img_name;

			}else{
				$chigr = "This type of file is not allowed";
				// header("Location: ../view/pages/edit-profile.php?error = $chigr");
			}
			
			$query = "update imgUrl from user 
			VALUE('$imgUrl')
			";
			try{
			$result = mysqli_query($connection,$query);
			if($result){
				$message = "Added Successfully";
				header("Location:  ../view/pages/view-profile.php?error=".$message);
				move_uploaded_file($tmp_name,$upload_path);
			}else{
				echo "not added";
			}
			}catch(Throwable $t){
				echo $t->getMessage();
				
			}

				
			}
		}else{
			echo $error;
		}


	}
}

?>