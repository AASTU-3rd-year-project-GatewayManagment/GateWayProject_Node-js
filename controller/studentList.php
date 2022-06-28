<?php
include '../controller/session.php';
include '../model/database.php';

if(isset($_GET['q'])){
	$data = $_GET['q'];
	$check = explode('_',$data);
	// print_r($data);
	
	 
	// echo $id." ".$isbarCode;
	if($check[1] == 'false'){
	
		$id = $check[0];
		$query = "SELECT * FROM user where ID like '$id%'";
		$result = mysqli_query($connection,$query);
		$numOfRow = mysqli_num_rows($result);
		$text = '';
		if($numOfRow>0){
			
			while($row = mysqli_fetch_assoc($result)){
				$text.="
				<form action='./viewUser.php'>
					<input name='id' class='hidden-input' value='{$row['ID']}'>
					<input type='submit' class='search-entries' value='{$row['ID']}'>
				</form>
				";
			}
			echo $text;

		}
	}elseif($check[1] == 'true'){
		
		$barcode =  strtoupper($check[0]);

		$query = "SELECT ID FROM user where barCode = '$barcode'";
		$result = mysqli_query($connection,$query);
		$stdid = '';
		if(mysqli_num_rows($result)>0){
			while($row = mysqli_fetch_assoc($result)){
				$stdid = $row['ID'];
				break;
			}
			header("Location: ../view/pages/view-profile.php?id=$stdid");
			

		}else{
			echo $check[1];
		}
	}
}



?>