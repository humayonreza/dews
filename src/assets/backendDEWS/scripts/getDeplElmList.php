<?php 
// header('Content-type: application/json');
// header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers'); 
 
include('../connect/connect.php');
 $data = json_decode(file_get_contents("php://input")); 
 $output = array();  
// Ser ElementId BaseId ElementName Info Type Origin OpRange isIndependent
 $query = "SELECT ElementId,ElementName,Type,Origin FROM elementinfo WHERE isIndependent =1 ";

 $result = mysqli_query($connect, $query);  
 if(mysqli_num_rows($result) > 0)  
 {  
	while($row = mysqli_fetch_assoc($result))  
	{  
	    $output[] = $row;  
	}  
	echo json_encode($output);  
 }  
 mysqli_close($connect);
?> 