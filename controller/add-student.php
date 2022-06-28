<?php
include '../model/database.php';
if(isset($_POST['submit'])){
	
		
		$id = $_POST['user-id'];
		$firstName = $_POST['user-firstName'];
		$lastName = $_POST['user-lastName'];

		$userType = $_POST['user-type'];
		$userLevel = $_POST['user-level'];
		$userGender = $_POST['user-gender'];
		$imgUrl="profile.png";
		$upload_path = '';

		if((strlen($firstName) != strlen(filter_var($firstName,FILTER_SANITIZE_STRING)))
		|| (strlen($lastName) != strlen(filter_var($lastName,FILTER_SANITIZE_STRING)))){
			echo "<div class='error' id='show-submit-status'>
							
												<p>Invalid Characters</p>
	
												</div>";
		}else{
	
				if(isset($_FILES['imgFile'])){
					$img_name = ($_FILES['imgFile']['name'])[0];
					$img_size = ($_FILES['imgFile']['size'])[0];
					$tmp_name = ($_FILES['imgFile']['tmp_name'])[0];
					$error = ($_FILES['imgFile']['error'])[0];
					$chigr = "";

					if($error === 0){
						if($img_size > 10000000){
						$chigr = "File is to big";
						echo "<div class='error' id='show-submit-status'>
								
								<p>$chigr</p>
			
								</div>";
						}else{
					
							$allowed_ext = array('jpg','jpeg','png');
							$img_ext =strtolower(pathinfo($img_name,PATHINFO_EXTENSION));

							if(in_array($img_ext,$allowed_ext)){
								$new_img_name = uniqid("IMG-",true).".".$img_ext;
								$upload_path = "../view/images/upload/".$new_img_name;
								$imgUrl = $new_img_name;
								//check for duplicate Entry
								$query = "SELECT ID FROM user
								WHERE ID = '$id'
								";
								if($result = mysqli_query($connection,$query)){
									if(mysqli_num_rows($result)== 0){
				
										$query = "INSERT
										INTO user 
										VALUES('$id','$firstName','$lastName','$userGender','$userLevel','$userType','$imgUrl','$id')
										";
										try{
											$result = mysqli_query($connection,$query);
											if($result){
												$query = "INSERT
												INTO user_log
												VALUE('$id','','','');
												";
												$result = mysqli_query($connection,$query);
												if($result){
													move_uploaded_file($tmp_name,$upload_path);
													echo	
													"<div class='good' id='show-submit-status'>
													<p>User Registered Succefully</p>
													</div>
													";
												}else{
													die("kdfkdf");
													echo "<div class='error' id='show-submit-status'>
									
														<p>Error adding to userlog</p>
			
														</div>";
												}
											}
										}catch(Throwable $t){
											echo $t->getMessage();
											
										}
									}else{
										echo "<div class='error' id='show-submit-status'>
									
										<p>User Already Registered</p>
					
										</div>";

									}

								}else{
									die("Count Access user table");		
								
								}


							}else{
								$chigr = "File Type Is Unsupported";
								echo "<div class='error' id='show-submit-status'>
									
									<p>$chigr</p>
				
									</div>";
							}
							
						}
					
					}else{
						echo "<div class='error' id='show-submit-status'>
								
						<p>Corrupted File</p>

						</div>";
					}


				}else{
					print_r('amhere');
					// check if the user is already registered
						$query = "SELECT ID FROM user
						WHERE ID = '$id'
						";
						if($result = mysqli_query($connection,$query)){
							if(mysqli_num_rows($result)== 0){

								$query = "INSERT
								INTO user
								VALUE('$id','$firstName','$lastName','$userGender','$userLevel','$userType','$imgUrl','$id')
								";
								$result = mysqli_query($connection,$query);
								if($result){
									
									$query = "INSERT
									INTO user_log
									VALUE('$id','','','');
									";
									$result = mysqli_query($connection,$query);
									if($result){
										echo	
										"<div class='good' id='show-submit-status'>
										<p>User Registered Succefully</p>
										</div>
										";
									}else{
										echo "<div class='error' id='show-submit-status'>
									
								<p>Error adding to userlog</p>
			
								</div>";
									}
								}
							}else{

								echo "<div class='error' id='show-submit-status'>
									
								<p>User Already Registered</p>
			
								</div>";

							}
						}else{
							echo "<div class='error' id='show-submit-status'>
									
										<p>Error Occured</p>
					
										</div>"; 
						}

				}
			}
	}else{
		echo "<div class='error' id='show-submit-status'>
						
		<p>Cound't Access The Posted Data</p>

		</div>";	
	}



	


?>