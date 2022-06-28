<?php
include '../model/database.php';
include '../controller/functions.php';
// isset($_POST['submit']) && 

if(isset($_FILES['myFiles'])){
	// print_r($_FILES['myFiles']);
	$filetmps = $_FILES['myFiles']['tmp_name'];
	$fileN = $_FILES['myFiles']['name'];
	$fileE = $_FILES['myFiles']['error'];
	$file = $filetmps[0];
	$fileName = $fileN[0];
	$fileError = $fileE[0];
	
	
		if($fileError === 0){
			$allowed_ext = array('csv');
			$file_ext =strtolower(pathinfo($fileName,PATHINFO_EXTENSION));

			if(in_array($file_ext,$allowed_ext)){

				$file_open = fopen($file,'r');
				$file_check = fopen($file,'r');
				$count = 0;
				$idArray = array();
				$checkCount = 0;
			// check for duplicate entry
				while(($csv = fgetcsv($file_check,1000,',')) !== false){
					if($checkCount>0){
					
						array_push($idArray,$csv[0]);
					}
				// echo "inserting";
					$checkCount = $checkCount+1;
				}
			// print_r($idArray);
				$res = findDuplicate($idArray);

				if($res['found']){

					$dups = '';
					foreach($res['err'] as $row){
						if($row != array()){
							$dups .= "<li>ID {$idArray[$row[0]]} duplicate entries on ";
							foreach($row as $val){
								$dups .= "line ".($val+2).", ";
							
							$dups .= "</li> \r\n ";
							}
						}
					}


					echo "<div class='error' id='show-submit-status'>
							
						<h2>Duplicate ID Found!</h2>
						<ul class='duplicates_box'>
						$dups
						</ul>
						</div>";

				}else{
					// check if entry in the file is already registered
					$query = "SELECT ID FROM user";
					$alreadyReg = [];
					if($result = mysqli_query($connection,$query)){
						while(($row = mysqli_fetch_assoc($result)) != false){
							if(in_array($row['ID'],$idArray)){
								array_push($alreadyReg,$row['ID']);
							}
						}
					}else{
						echo "<div class='error' id='show-submit-status'>
						
						<p>Error Occured on line 76</p>
	
						</div>";
					}

					if(count($alreadyReg)>0){
						$str = '';
						foreach($alreadyReg as $val){
							$str .="<li> $val already registered.</li>";
						}	
						echo "<div class='error' id='show-submit-status'>
							
						<h2>Entry Already Registered </h2>
						<ul class='duplicates_box'>
						$str
						</ul>
						Try Again.
						</div>";

					}else{
							// insert into the databse
							$count = 0;
							while(($csv = fgetcsv($file_open,1000,',')) !== false){
								if($count != 0){

								
									$id = $csv[0];
									$firstName = $csv[1];
									$lastName = $csv[2];
									$gender = $csv[3];
									$level = $csv[4];
									$type = $csv[5];
									$imgUrl = $csv[6];
									$barCode = $csv[7];

									if((strlen($firstName) != strlen(filter_var($firstName,FILTER_SANITIZE_STRING)))
									|| (strlen($lastName) != strlen(filter_var($lastName,FILTER_SANITIZE_STRING)))
									|| (strlen($gender) != strlen(filter_var($gender,FILTER_SANITIZE_STRING)))
									|| (strlen($level) != strlen(filter_var($level,FILTER_SANITIZE_STRING)))
									|| (strlen($type) != strlen(filter_var($type,FILTER_SANITIZE_STRING)))
									){
													echo "<div class='error' id='show-submit-status'>
								
													<p>Invalid Characters</p>
		
													</div>";
													break;
									}else{
											
										$query = "INSERT INTO user values('$id','$firstName','$lastName',
										'$gender',
										'$level',
										'$type',
										'$imgUrl',
										'$barCode')";
						
										if($result = mysqli_query($connection,$query)){
											$query = "INSERT INTO user_log(ID,EID) values('$id','')";
					
											if($result = mysqli_query($connection,$query)){
														
												
											}else{
												die("Error Ocurred while inserting to user_userLog");
											}
																					
										}
									}
								}
								$count = $count + 1;
							}
							echo "							<div class='good' id='show-submit-status'>
							<p>Import Successfull.</p>
					
							</div>";

					}

				}

			}else{

				echo "<div class='error' id='show-submit-status'>
						
					<p>Only csv format is supported.</p>

					</div>";
			}
		}
}
?>
