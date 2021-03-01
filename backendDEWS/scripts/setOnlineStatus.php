<?php

	header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin,access-control-allow-methods, access-control-allow-headers'); 
	include('../connect/connect.php');
	$client = $_POST['client'];
	$sql="UPDATE isclientlivelist SET isLive = 1 WHERE clientId = $client";
	mysqli_query($connect,$sql) or die(mysqli_error());
	echo "Success...";
	mysqli_close($connect);

?>