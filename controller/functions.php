<?php
function findDuplicate($idArray){
	

$errorIndex[] = [];
$i = 0;
$j = 0;
$found = false;
if(count($idArray) > 0){

	while($i < count($idArray)){
		$duplicates = array() ;
		$j = 0;
		while($j < count($idArray)){
			
			if($idArray[$i] == $idArray[$j]){

				if(count($duplicates) == 0){
						
						if($i != $j){
						array_push($duplicates,$i);
						array_push($duplicates,$j);
						$found = true;

						}					
				}else{
					

					if($i != $j){
						array_push($duplicates,$j);
						$found = true;
					}
					
				}
			}
			$j = $j + 1	;
			
		}
		sort($duplicates);
		if(!in_array($duplicates,$errorIndex)){
			array_push($errorIndex,$duplicates);
		}
		$i = $i+1;

	}
}


$dup = array('err'=>$errorIndex,'found'=>$found);
return $dup;
}
?>