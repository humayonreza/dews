<?php
	// header('Content-type: application/json');
	// header("Access-Control-Allow-Origin: *");
	// header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
	
	include('../connect/connect.php');
	$output = array();  
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$deployId = $request->deployId;
	$secElementId = $request->sectorName;
	$lat = $request->opLat;
	$lng = $request->opLng;	
	$lArc = $request->opLeftArc;
	$rArc = $request->opRightArc;
	

	// $d = date("Y-m-d");
	// $DeploymentDate = date("Y-m-d", strtotime($d. ' + 0 days'));
	

	$sql="select max(Ser) from sectorelmdeployment";
	$sql = mysqli_query($connect,$sql) or die(mysqli_error());
	while($row = mysqli_fetch_array($sql))
	{
		// $maxDeploymentId=$row['0'];
		// if ($row['0']==0) { $DeploymentId = $row['0'] + 1; } 
		// else { $DeploymentId = $row['0'] + 1; }

		$Ser = $row['0'] == 0 ?  $row['0'] + 1 : $row['0'] + 1;
		// $DeploymentId = $row['1'] == 0 ?  $row['1'] + 1 : $row['1'] + 1;
	}

	// Ser,DeploymentId,secElementId,lat,lng,leftArc,RightArc
	$query = "INSERT INTO sectorelmdeployment (Ser,DeploymentId,secElementId,lat,lng,leftArc,RightArc) VALUES (
	$Ser,
	$deployId,
	'$secElementId',
	$lat,
	$lng, 
	'$lArc',
	'$rArc'
	)";  

	if(mysqli_query($connect, $query))  
	{  
	    $response = $secElementId;
	    // $response = $DeploymentId;
	    echo json_encode($response);  
	}  
	else  
	{  
	    $response = 401;
	    echo json_encode($response); 
	}  

?>