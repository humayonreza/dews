<?php

// header('Content-type: application/json');
// header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers'); 

	$servername = "127.0.0.1";
	$username = "humayon_admin";
	$password = "admin@5232";
	// $dbname = "humayon_akashdut";  
	$dbname = "humayonr_dev_dews";
	// Create connection
	$connect = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($connect->connect_error) 
	{
		die("Connection failed: " . $connect->connect_error);
	} 

	// $servername = "127.0.0.1";
	// $username = "humayonr_aaws";
	// $password = "aaws@5232$4545";
	// $dbname = "humayonr_aaws";
	// $connect = new mysqli($servername, $username, $password, $dbname);
	// if ($connect->connect_error) 
	// {
	// 	die("Connection failed: " . $connect->connect_error);
	// } 
?>