<?php

use LDAP\Result;

include '../model/database.php';

if(isset($_POST['id'])){
$id = strtolower($_POST['id']);
$deviceName = strtolower($_POST['deviceName']);
$serialNumber = strtolower($_POST['deviceSerial']);
$originalSerial = strtolower($_POST['orginalSerial']);


$query = "SELECT * FROM device
 Where serialNumber = '$serialNumber'";
 
	if(mysqli_num_rows(mysqli_query($connection,$query)) == 0){

		
			$query = "UPDATE device
			set 
			serialNumber = '$serialNumber', 
			deviceName = '$deviceName' 
			where serialNumber='$originalSerial'";
			try{
				$result = mysqli_query($connection,$query);
				echo "<div class='alert alert-success' role='alert'>Device Updated Succesfully</div>_good";
			}catch(Exception $e){
				die($e);
			}

	}else{
		if($serialNumber != $originalSerial){
			echo "<div class='alert alert-danger' role='alert'>Device with the given serial number is already registered</div>_bad";
		}else{
			$query = "UPDATE device
			set 
			serialNumber = '$serialNumber', 
			deviceName = '$deviceName' 
			where serialNumber='$originalSerial'";
			try{
				$result = mysqli_query($connection,$query);
				echo "<div class='alert alert-success' role='alert'>Device Updated Succesfully</div>_good";
			}catch(Exception $e){
				die($e);
			}

		}
	}
}

?>