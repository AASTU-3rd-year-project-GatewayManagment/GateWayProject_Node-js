<?php 
include '../model/database.php';
if(isset($_POST['stdID'])){
$id = strtolower($_POST['stdID']);
$serialNumber = strtolower($_POST['serialNumber']);
$password = $_POST['delete-admin-password'];

$query = "SELECT * FROM admin where password ='$password'";
try{
	$result =  mysqli_query($connection,$query);
	
}catch(Exception $e){
	die($result);
}
// if admin pass is right
if(mysqli_num_rows($result)==1){
	$query = "DELETE  FROM user_device_log
	WHERE ID = '$id' and serialNumber = '$serialNumber'";
   try{
	   $result = mysqli_query($connection,$query);
	   echo "  <div class='alert alert-success' role='alert'>Device Deleted Succesfully</div>_good";
	   }catch(Exception $e){
		   echo $e;	
	   }  
}else{
	echo "<div class='alert alert-danger' role='alert'>password Incorrect</div>_bad";
}




}

?>