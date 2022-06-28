<?php
include '../model/database.php';

if(isset($_POST['user_id'])){
	$id =  strtolower( $_POST['user_id']);
	$status = $_POST['size'];
	$device = $_POST['withDevice'];

		$query = "SELECT * FROM user_log where ID = '$id' ORDER BY EID desc";
		// to get the first row;
		$result = mysqli_query($connection,$query); 
		$firstRow;
		while(($firstRow = mysqli_fetch_assoc($result)) != false){
			
			break;
		}
		// if there is a device with the user
		if($device){
			$query = "SELECT * FROM user_device_log where serialNumber = '$device' ORDER BY counter desc";
			$result = mysqli_query($connection,$query);
			
			
			if($result){
				// if there already is a log registered with that device and user
				if(mysqli_num_rows($result)>0){
					$firstlog;
					while(($firstlog = mysqli_fetch_assoc($result)) != false){
						break;
					}
					if($status == 'out'){
						// check if the last entry of this device is by the user
						if($firstlog['ID'] == $id){
							$query = "INSERT INTO user_device_log 
							values('','{$firstlog['ID']}','{$firstlog['serialNumber']}','{$firstlog['entryDate']}',now()) ";
							try{
								mysqli_query($connection,$query);
								$query = "INSERT INTO user_log values('$id','{$firstRow['lastEntry']}',now(),'')";
								if(mysqli_query($connection,$query)){
									
									echo "<div class='alert alert-success' role='alert'>User Exited Sucessfully</div>_good";
									
								}
							}catch(Exception $e){
								echo "<div class='alert alert-danger' role='alert'>Error inserting into user and device log</div>_bad";
							
							}
						}else{
							// not allowed
							echo "<div class='alert alert-danger' role='alert'>User Is Not Allowed To leave With The Device</div>_bad";

						}
					}
					if($status == 'in'){
						// if device not already in
			     			if(isOut($firstlog['entryDate'],$firstlog['exitDate'])){

							$query = "INSERT INTO user_log values('$id',now(),'{$firstRow['lastExit']}','') ";
							$result = mysqli_query($connection,$query);
							
							$query = "INSERT INTO user_device_log values('','{$firstlog['ID']}','{$firstlog['serialNumber']}',now(),'{$firstlog['exitDate']}')";

							$result = mysqli_query($connection,$query);
							if($result){
								echo "<div class='alert alert-success' role='alert'>User Entered Sucessfully</div>_good";
							}
						}else{
							echo "<div class='alert alert-danger' role='alert'>Device Already Inside</div>_bad";
							
						}
					}

				
				// if the last log of that serial number is this user let him out


				}
			}
		}else{

			if($status == "in"){
				$query = "INSERT INTO user_log values('$id',now(),'{$firstRow['lastExit']}','')";
			} else if($status == "out"){
				$query = "INSERT INTO user_log values('$id','{$firstRow['lastEntry']}',now(),'')";
			}
			try{
				$result = mysqli_query($connection,$query); 
				$str = "";
				if($status == "in"){
					$str = "Entered";
				}else{
					$str = "Exited";
				}
				echo "<div class='alert alert-success' role='alert'>User $str Sucessfully</div>_good";

			}catch(Exception $e){
				die("Error");
			}
		}
}




	function isOut($entryDate ,$exitDate){
		if($entryDate > $exitDate){
			return false;
		}else{
			return true;
		}
	}

?>