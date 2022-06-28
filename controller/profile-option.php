<?php
include "../model/database.php";

// header("Location: ../view/pages/view-profile.html");
print_r($_POST);

$stdID = $_POST['stdid'];
if(isset($_POST['view'])){
	echo $_POST['stdid'] . "For View";
	$_COOKIE['id'] = $stdID;
	echo "here \n";
// fetch the users profile
	$query = "SELECT * FROM user WHERE ID='$stdID'";
	echo $query;
	$result = mysqli_query($connection,$query);
	$row = mysqli_fetch_assoc($result);
	
	header("Location: ../view/pages/viewUser.php?id=".$stdID);
}elseif(isset($_POST['edit'])){
	echo $_POST['stdid'] . "For Edit";
	$stdID = $_POST['stdid'];
	header("Location: ../view/pages/edit-profile.php?id=".$stdID);

}elseif(isset($_POST['delete'])){
	$query = "DELETE FROM user WHERE id='$stdID'";
	$result = mysqli_query($connection,$query);
	
	header("Location: ../view/pages/admin-student.php");
	
}




?>