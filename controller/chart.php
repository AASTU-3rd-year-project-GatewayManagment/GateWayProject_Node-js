<?php
include '../model/database.php';

if(isset($_GET['type'])){
	$type = $_GET['type'];

	$query = "SELECT  COUNT(*) AS NumofEntry, DATE_FORMAT($type,'%a') as Day  FROM user_log WHERE DATE_FORMAT($type,'%U') = DATE_FORMAT(now(),'%U') GROUP BY DATE_FORMAT($type,'%a') ORDER BY DATE_FORMAT($type,'%a') DESC";
	try{
		// echo $query;
		$result = mysqli_query($connection,$query);
	}catch(Exception $e){
		echo $e;
	}

	if($result){
		$data = array();
		
		while(($row = mysqli_fetch_assoc($result)) !=false){
			$newArr = array("{$row['Day']}" => $row['NumofEntry']);
			$data = array_merge($data,$newArr);
		}
		
		echo json_encode($data);
	}
}

if(isset($_GET['donut'])){
	$type = $_GET['donut'];

	$query = "SELECT  
	COUNT(*) AS NumofEntry,
	u.user_type as u_type
	FROM user_log ul 
	INNER JOIN user u
	ON ul.ID = u.ID
	WHERE DATE_FORMAT(ul.$type,'%U') = DATE_FORMAT(now(),'%U') GROUP BY u.user_type";
	try{
		$result = mysqli_query($connection,$query);
	}catch(Exception $e){
		// echo $e;
	}

	if($result){
		$data = array();
		
		while(($row = mysqli_fetch_assoc($result)) !=false){
			$newArr = array("{$row['u_type']}" => $row['NumofEntry']);
			$data = array_merge($data,$newArr);
		}
		
		echo json_encode($data);
	}
}
// print_r($_GET);

?>