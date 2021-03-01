<?php
	// header('Content-type: application/json');
	// header("Access-Control-Allow-Origin: *");
	// header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
	
	include('../connect/connect.php');
	$output = array();  
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	// Ser,date,acId,speed,height,origin,heading,lat,lng
	$d = date("Y-m-d");
	$attkDate = date("Y-m-d", strtotime($d. ' + 0 days'));
	$acId = $request->acId;
	$speed = $request->speed;	
	$height = $request->height;
	$origin = $request->origin;
	$heading = $request->heading;
	$lat = $request->lat;
	$lng = $request->lng;
	$numberAc = 4;
	$isVisible = $request->isVisible;

	$sql="SELECT Max(Ser) from flightdata";
	$sql = mysqli_query($connect,$sql) or die(mysqli_error());
	while($row = mysqli_fetch_array($sql))
	{
		$ser = ($row['0']==0) ? 1 : $row['0'] + 1;
	} 
	$query = "INSERT INTO flightdata (Ser,attkDate,acId,speed,height,origin,heading,lat,lng,numberAc,isVisible) VALUES
	($ser,'$attkDate',$acId, $speed, $height, $origin, $heading, $lat, $lng, $numberAc, $isVisible)"; 
	$resp = mysqli_query($connect, $query) ? 201 : 401;
	echo json_encode($resp);

	$sql="SELECT MAX(Ser) FROM flightdata WHERE acId = $acId";
	$sql = mysqli_query($connect,$sql) or die(mysqli_error());
	while($row = mysqli_fetch_array($sql)) { $indexSer=$row['0']; }		

	$sql="DELETE FROM flightdata WHERE Ser>0 AND Ser != $indexSer";
	$sql = mysqli_query($connect,$sql) or die(mysqli_error());
?>