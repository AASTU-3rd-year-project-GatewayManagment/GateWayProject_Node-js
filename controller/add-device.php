<?php
include '../model/database.php';
if(isset($_POST['id'])){
	$stdId = strtolower($_POST['id']);
	$deviceName = strtolower($_POST['deviceName']);
	$deviceSerial = strtolower($_POST['deviceSerial']);
// check if the device 
	// check if the device is registered before
	$query = "SELECT * FROM device WHERE serialNumber = '$deviceSerial'";
	$result = mysqli_query($connection,$query);

	if(mysqli_num_rows($result) == 0){
		$query = "INSERT INTO device value('$deviceName','$deviceSerial')";
		$result = mysqli_query($connection,$query);
		if($result){
			$query = "INSERT INTO user_device_log value('','$stdId','$deviceSerial','','')";
			if($result = mysqli_query($connection,$query)){
				echo "<div class='alert alert-success' role='alert'>Device Registered Succesfully</div>_good";
				
			}else{
				echo "<div class='alert alert-danger' role='alert'>Error Occured while Registering Device</div>_bad";
			}
		}
	}else{
		$query = "SELECT * FROM user_device_log WHERE serialNumber = '$deviceSerial' and ID = '$stdId'";
		try{
			$result = mysqli_query($connection,$query);
		}catch(Exception $e){
			echo $e;
		}

		if(mysqli_num_rows($result) == 0){
			$query = "INSERT INTO user_device_log value('','$stdId','$deviceSerial','','')";
			if($result = mysqli_query($connection,$query)){
				echo "<div class='alert alert-success' role='alert'>Shared Device Registered Sucessfully</div>_good";
			}
		}else{
			echo "<div class='alert alert-danger' role='alert'>Device Already Registered</div>_bad";
		}

	}

}

?>