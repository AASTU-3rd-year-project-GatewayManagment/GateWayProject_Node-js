<?php

include "../model/database.php";

// accepting json format
if(isset($_GET['q'])){
$dataJson=json_decode($_GET['q']);

// if the object is NULL
if(!$dataJson){
	// $query = "SELECT * FROM user where user_type = 'student' order by firstName ASC" ;
	echo "Reload";

}else{
	//  if the object has a value
	
	$type = $dataJson->type;
	$userType = $dataJson->userType;
	$value = $dataJson->value;
	$sortBy = $dataJson->sortBy;
	$sortType = $dataJson->sortType;
	$isAcc = $dataJson->isAcc;
	// check search type
	$condition =$value.'%';

		if(!$isAcc){
	
		$query = "SELECT * FROM user where lower($type) like '$condition' and user_type = '$userType' ORDER BY $sortBy $sortType";

			
			$result = mysqli_query($connection,$query);
			$content = '';
			while($std = mysqli_fetch_array($result,MYSQLI_ASSOC)){
				$content .= "
				<ul class='list-content'>
					<li><img src='../images/upload/{$std['imgUrl']}' alt='profile'></li>
					<li class='user-name'>
						{$std['firstName']} {$std['lastName']}
					</li>
					<li class='user-id '>
						{$std['ID']}
					</li>
					<li class='user-gender '>
						{$std['gender']}
					</li>
					<li class='user-level '>
						{$std['user_level']}
					</li>
					<li class='actions '>
															<img src='../images/sidemore.png ' alt='menu ' id='three-dots-'.{$std[ 'ID']} onmouseover='openmenu(this.id) '>
												<div class='menu-choice ' id='form-'.{$std[ 'ID']} onmouseleave='closemenu(this.id) '>
												<form class='choice1 ' action='../../controller/profile-option.php' method='post'>
													<input class='dot-menu-hidden' type='text' name='stdid' value={$std[ 'ID']} >
													<input type='submit' name='view' value='View profile'>
												</form>
												<form action='../../controller/profile-option.php' method='post' class='choice1 '>
													<input class='dot-menu-hidden' type='text' name='stdid' value={$std[ 'ID']} >
													<input type='submit' name='edit' value='Edit profile'>
												</form>
												<form action='../../controller/profile-option.php' method='post' class='choice1 '>
												<input class='dot-menu-hidden' type='text' name='stdid' value={$std[ 'ID']} >
												<input type='submit' name='delete+' value='Delete profile'>
											</form>


											</div>

											</li>
				</ul>
				
				";
			}

			echo $content;

		}else{
			$query = "SELECT 
			u.ID,
			u.imgUrl,
			u.firstName,
			u.lastName,
			e.userName,
			e.lastLogin
			FROM employee e
			INNER JOIN user u
			ON u.ID = e.ID
			where u.$type like '$condition' and  u.user_type = '$userType' ORDER BY $sortBy $sortType";

			
			$result = mysqli_query($connection,$query);
			$content = '';
			while($std = mysqli_fetch_array($result,MYSQLI_ASSOC)){
				
				$content .= "
				<ul class='list-content'>
					<li><img src='../images/upload/{$std['imgUrl']}' alt='profile'></li>
					<li class='user-name'>
						{$std['firstName']} {$std['lastName']}
					</li>
					<li class='user-id'>
						{$std['ID']}
					</li>
					<li class='userName'>
						{$std['userName']}
					</li>
					<li class='lastLogin'>
						{$std['lastLogin']}
					</li>
					<li class='actions '>
															<img src='../images/sidemore.png ' alt='menu ' id='three-dots-'.{$std[ 'ID']} onmouseover='openmenu(this.id) '>
												<div class='menu-choice ' id='form-'.{$std[ 'ID']} onmouseleave='closemenu(this.id) '>
												<form class='choice1 ' action='../../controller/profile-option.php' method='post'>
													<input class='dot-menu-hidden' type='text' name='stdid' value={$std[ 'ID']} >
													<input type='submit' name='view' value='View profile'>
												</form>
												<form action='../../controller/profile-option.php' method='post' class='choice1 '>
													<input class='dot-menu-hidden' type='text' name='stdid' value={$std[ 'ID']} >
													<input type='submit' name='edit' value='Edit profile'>
												</form>
												<form action='../../controller/profile-option.php' method='post' class='choice1 '>
												<input class='dot-menu-hidden' type='text' name='stdid' value={$std[ 'ID']} >
												<input type='submit' name='delete+' value='Delete profile'>
											</form>


											</div>

											</li>
				</ul>
				
				";
			}
			echo $content;
		}

	}
}
if(isset($_GET['empty'])){
	$userType = strtolower( $_GET['empty']);
	$query = "SELECT * FROM user where user_type = '$userType' ORDER BY firstName";
	if($result = mysqli_query($connection,$query)){
		$content = '';
		while($std = mysqli_fetch_array($result,MYSQLI_ASSOC)){
			$content .= "
			<ul class='list-content'>
			<li><img src='../images/upload/{$std['imgUrl']}' alt='profile'></li>
			<li class='user-name'>
				{$std['firstName']} {$std['lastName']}
			</li>
			<li class='user-id '>
				{$std['ID']}
			</li>
			<li class='user-gender '>
				{$std['gender']}
			</li>
			<li class='user-level '>
				{$std['user_level']}
			</li>
			<li class='actions '>
													<img src='../images/sidemore.png ' alt='menu ' id='three-dots-'.{$std[ 'ID']} onmouseover='openmenu(this.id) '>
											<div class='menu-choice ' id='form-'.{$std[ 'ID']} onmouseleave='closemenu(this.id) '>
												<form class='choice1 ' action='../../controller/profile-option.php' method='post'>
													<input class='dot-menu-hidden' type='text' name='stdid' value={$std[ 'ID']} >
													<input type='submit' name='view' value='View profile'>
												</form>
												<form action='../../controller/profile-option.php' method='post' class='choice1 '>
													<input class='dot-menu-hidden' type='text' name='stdid' value={$std[ 'ID']} >
													<input type='submit' name='edit' value='Edit profile'>
												</form>
												<form action='../../controller/profile-option.php' method='post' class='choice1 '>
												<input class='dot-menu-hidden' type='text' name='stdid' value={$std[ 'ID']} >
												<input type='submit' name='delete+' value='Delete profile'>
											</form>


											</div>

											</li>
		</ul>
			
			";
		}

		echo $content;
	}

}
if(isset($_GET['employees'])){
	$table = strtolower( $_GET['employees']);
	$query = "SELECT 
			u.ID,
			u.imgUrl,
			u.firstName,
			u.lastName,
			e.userName,
			e.lastLogin
			FROM employee e
			INNER JOIN user u
			ON u.ID = e.ID
			";
	if($result = mysqli_query($connection,$query)){
		$content = '';
		while($std = mysqli_fetch_array($result,MYSQLI_ASSOC)){
				
			$content .= "
			<ul class='list-content'>
				<li><img src='../images/upload/{$std['imgUrl']}' alt='profile'></li>
				<li class='user-name'>
					{$std['firstName']} {$std['lastName']}
				</li>
				<li class='user-id'>
					{$std['ID']}
				</li>
				<li class='userName'>
					{$std['userName']}
				</li>
				<li class='lastLogin'>
					{$std['lastLogin']}
				</li>
				<li class='actions '>
														<img src='../images/sidemore.png ' alt='menu ' id='three-dots-'.{$std[ 'ID']} onmouseover='openmenu(this.id) '>
											<div class='menu-choice ' id='form-'.{$std[ 'ID']} onmouseleave='closemenu(this.id) '>
											<form class='choice1 ' action='../../controller/profile-option.php' method='post'>
												<input class='dot-menu-hidden' type='text' name='stdid' value={$std[ 'ID']} >
												<input type='submit' name='view' value='View profile'>
											</form>
											<form action='../../controller/profile-option.php' method='post' class='choice1 '>
												<input class='dot-menu-hidden' type='text' name='stdid' value={$std[ 'ID']} >
												<input type='submit' name='edit' value='Edit profile'>
											</form>
											<form action='../../controller/profile-option.php' method='post' class='choice1 '>
											<input class='dot-menu-hidden' type='text' name='stdid' value={$std[ 'ID']} >
											<input type='submit' name='delete+' value='Delete profile'>
										</form>


										</div>

										</li>
			</ul>
			
			";
		}

		echo $content;
	}
}

?>
