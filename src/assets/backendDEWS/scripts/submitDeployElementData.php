<?php
	// header('Content-type: application/json');
	// header("Access-Control-Allow-Origin: *");
	// header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
	
	include('../connect/connect.php');
	$output = array();  
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$lat = $request->uLat;
	$lng = $request->uLng;
	$ElementId = $request->unitId;
	$d = date("Y-m-d");
	$DeploymentDate = date("Y-m-d", strtotime($d. ' + 0 days'));
	// $output = $uLat . " - " .$uLng;
	$isActive =1;
	
	// $response = $d;
 //    echo json_encode($response);  

	$sql="select max(Ser),max(DeploymentId) from deployment";
	$sql = mysqli_query($connect,$sql) or die(mysqli_error());
	while($row = mysqli_fetch_array($sql))
	{
		// $maxDeploymentId=$row['0'];
		// if ($row['0']==0) { $DeploymentId = $row['0'] + 1; } 
		// else { $DeploymentId = $row['0'] + 1; }

		$Ser = $row['0'] == 0 ?  $row['0'] + 1 : $row['0'] + 1;
		$DeploymentId = $row['1'] == 0 ?  $row['1'] + 1 : $row['1'] + 1;
	}


	// Ser	DeploymentId	DeploymentDate	ElementId	lat	lng	isActive
	$query = "INSERT INTO deployment (Ser,DeploymentId,DeploymentDate,ElementId,lat,lng,isActive) VALUES (
	$Ser,
	$DeploymentId,
	'$DeploymentDate',
	$ElementId,
	$lat,
	$lng, 
	$isActive
	)"; 
	if(mysqli_query($connect, $query))  
	{  
	    // $response = "Data Inserted for Deployment Table";
	    $response = $DeploymentId;
	    echo json_encode($response);  
	}  
	else  
	{  
	    $response = $ElementId . " " . $DeploymentId . " " . $Ser;
	    echo json_encode($response); 
	}  

	$sql="UPDATE deployment SET isActive = 0 WHERE  ElementId = $ElementId And DeploymentId < $DeploymentId";
	$sql = mysqli_query($connect,$sql) or die(mysqli_error());

 
?>